const formulario = document.getElementById("registroVivienda");
const tipoSelect = document.getElementById("tipoVivienda");
const otroTipoContainer = document.getElementById("otroTipoContainer");
const otroTipoInput = document.getElementById("otroTipo");
const imagenesInput = document.getElementById("imagenes");
const preview = document.getElementById("previewImagenes");

let imagenesSeleccionadas = [];

tipoSelect.addEventListener("change", () => {
    if (tipoSelect.value === "Otro") {
        otroTipoContainer.classList.remove("d-none");
        otroTipoInput.required = true;
    } else {
        otroTipoContainer.classList.add("d-none");
        otroTipoInput.required = false;
        otroTipoInput.value = '';
    }
});

imagenesInput.addEventListener("change", () => {
    const nuevosArchivos = Array.from(imagenesInput.files);
    imagenesSeleccionadas = imagenesSeleccionadas.concat(nuevosArchivos).slice(0, 8);
    actualizarVistaPrevia();
    imagenesInput.value = "";
});


document.getElementById('registroVivienda').addEventListener('submit', async (e) => {
    e.preventDefault();

    const urlParams = new URLSearchParams(window.location.search);
    const usuid = urlParams.get("usuid");
    const titulo= document.getElementById("titulo").value;
    const descripcion= document.getElementById("observaciones").value
    const precio= parseFloat(document.getElementById("precio").value);
    const ubicacion= document.getElementById("ubicacion").value;    
    const tipo= document.getElementById("tipoVivienda").value;  
    const habitaciones= parseInt(document.getElementById("cuartos").value);
    const banos= parseInt(document.getElementById("baños").value);
    const mascotas= document.getElementById("mascotas").value
    const personasPermitidas= parseInt(document.getElementById("personas").value);
        
    try {
        const response = await fetch('/registroCasas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({usuid,descripcion,precio,ubicacion,tipo,habitaciones,banos,mascotas,personasPermitidas})
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.mensaje);
            return;
        }

        const data = await response.json();
        if(data){
            alert('casa registrada con exito');
        }else{
          console.log('error al registrar la vivienda')
        }

    } catch (error) {
        console.error('Error al hacer login:', error);
        alert('Error en el servidor');
    }
});
