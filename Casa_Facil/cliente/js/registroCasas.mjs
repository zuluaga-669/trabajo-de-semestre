const formulario = document.getElementById("registroVivienda");
const tipoSelect = document.getElementById("tipoVivienda");
const otroTipoContainer = document.getElementById("otroTipoContainer");
const otroTipoInput = document.getElementById("otroTipo");
const imagenesInput = document.getElementById("imagenes");
const preview = document.getElementById("previewImagenes");

let imagenesSeleccionadas = [];

// Mostrar u ocultar el campo "otro tipo"
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

// Manejo de selección de imágenes
imagenesInput.addEventListener("change", () => {
    const nuevosArchivos = Array.from(imagenesInput.files);

    nuevosArchivos.forEach((archivo) => {
        if (imagenesSeleccionadas.length < 8) {
            imagenesSeleccionadas.push(archivo);
        }
    });

    imagenesInput.value = "";
    mostrarVistaPrevia();
});

// Mostrar miniaturas con botón de eliminar
function mostrarVistaPrevia() {
    preview.innerHTML = "";

    imagenesSeleccionadas.forEach((imagen, index) => {
        const reader = new FileReader();

        reader.onload = () => {
            const div = document.createElement("div");
            div.classList.add("position-relative", "d-inline-block", "m-2");

            const img = document.createElement("img");
            img.src = reader.result;
            img.alt = `Imagen ${index + 1}`;
            img.style.width = "100px";
            img.style.height = "100px";
            img.style.objectFit = "cover";
            img.classList.add("rounded", "shadow-sm");

            const btnEliminar = document.createElement("button");
            btnEliminar.innerHTML = "❌";
            btnEliminar.type = "button";
            btnEliminar.classList.add("btn", "btn-sm", "btn-danger", "position-absolute", "top-0", "end-0");
            btnEliminar.style.transform = "translate(50%, -50%)";
            btnEliminar.title = "Eliminar imagen";

            btnEliminar.addEventListener("click", () => {
                imagenesSeleccionadas.splice(index, 1);
                mostrarVistaPrevia();
            });

            div.appendChild(img);
            div.appendChild(btnEliminar);
            preview.appendChild(div);
        };

        reader.readAsDataURL(imagen);
    });
}

// Manejo del formulario
formulario.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    const urlParams = new URLSearchParams(window.location.search);
    const usuid = urlParams.get("usuid");

    formData.append('usuid', usuid);
    formData.append('titulo', document.getElementById("titulo").value);
    formData.append('descripcion', document.getElementById("observaciones").value);
    formData.append('precio', document.getElementById("precio").value);
    formData.append('ubicacion', document.getElementById("ubicacion").value);

    // Aquí cambio para tomar el valor correcto de tipo
    let tipo = tipoSelect.value;
    if (tipo === "Otro") {
        tipo = otroTipoInput.value.trim();
    }
    formData.append('tipo', tipo);

    formData.append('habitaciones', document.getElementById("cuartos").value);
    formData.append('banos', document.getElementById("baños").value);
    formData.append('mascotas', document.getElementById("mascotas").value);
    formData.append('personasPermitidas', document.getElementById("personas").value);

    imagenesSeleccionadas.forEach((imagen) => {
        formData.append('imagenes', imagen);
    });

    try {
        const response = await fetch('/registroCasas', {
            method: 'POST',
            body: formData
        });


        const data = await response.json();

        if (data.imagenes && Array.isArray(data.imagenes)) {
            const contenedorImagenes = document.getElementById('previewImagenes');
            contenedorImagenes.innerHTML = '';

            data.imagenes.forEach(nombreImg => {
                const img = document.createElement('img');
                img.src = `/uploads/${nombreImg}`; // Esto debe funcionar ahora
                img.style.width = '100px';
                img.style.margin = '10px';
                contenedorImagenes.appendChild(img);
            });
        }

        if (!response.ok) {
            alert(data.message || 'Error al registrar la viviendña');
            return;
        }

        alert('Casa registrada con éxito');
        formulario.reset();
        imagenesSeleccionadas = [];
        mostrarVistaPrevia();

    } catch (error) {
        console.error('Error al enviar formulario:', error);
        alert('Error en el servidor');
    }
});


const uploadBtn = document.getElementById('vistaUsu');
const params = new URLSearchParams(window.location.search);
const usuid = params.get('usuid');

uploadBtn.addEventListener('click', () => {
    if (usuid) {
        window.location.href = `http://localhost:3000/vistaUsuario.html?usuid=${encodeURIComponent(usuid)}`;
    } else {
        alert('No se encontró el ID de usuario en la URL actual.');
    }
});
