const formulario = document.getElementById("registroVivienda");
const tipoSelect = document.getElementById("tipoVivienda");
const otroTipoContainer = document.getElementById("otroTipoContainer");
const otroTipoInput = document.getElementById("otroTipo");
const imagenesInput = document.getElementById("imagenes");
const preview = document.getElementById("previewImagenes");

let imagenesSeleccionadas = [];

// Verificar autenticación al cargar la página
window.onload = function () {
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (!usuarioActual) {
        window.location.href = 'login.html';
        return;
    }
};

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

function actualizarVistaPrevia() {
    preview.innerHTML = "";
    imagenesSeleccionadas.forEach((archivo, index) => {
        const reader = new FileReader();
        reader.onload = e => {
            const contenedor = document.createElement("div");
            contenedor.classList.add("preview-container");

            const img = document.createElement("img");
            img.src = e.target.result;

            const botonX = document.createElement("button");
            botonX.textContent = "×";
            botonX.classList.add("remove-btn");
            botonX.onclick = () => {
                imagenesSeleccionadas.splice(index, 1);
                actualizarVistaPrevia();
            };

            contenedor.appendChild(img);
            contenedor.appendChild(botonX);
            preview.appendChild(contenedor);
        };
        reader.readAsDataURL(archivo);
    });
}

formulario.addEventListener("submit", async function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (!formulario.checkValidity()) {
        formulario.classList.add('was-validated');
        return;
    }

    let tipo = tipoSelect.value;
    if (tipo === "Otro") {
        tipo = otroTipoInput.value.trim() || "Otro";
    }

    // Obtener el usuario actual del localStorage
    const usuarioActual = JSON.parse(localStorage.getItem('usuarioActual'));
    if (!usuarioActual) {
        alert('Debe iniciar sesión para registrar una propiedad');
        window.location.href = 'login.html';
        return;
    }

    // Preparar los datos para enviar al servidor
    const formData = new FormData();
    imagenesSeleccionadas.forEach((imagen, index) => {
        formData.append('imagenes', imagen);
    });

    const datos = {
        titulo: document.getElementById("titulo").value,
        descripcion: document.getElementById("observaciones").value,
        precio: parseFloat(document.getElementById("precio").value),
        ubicacion: document.getElementById("ubicacion").value,
        tipo: tipo,
        habitaciones: parseInt(document.getElementById("cuartos").value),
        banos: parseInt(document.getElementById("baños").value),
        usuario_id: usuarioActual.id,
        mascotas: document.getElementById("mascotas").value === "Sí",
        personasPermitidas: parseInt(document.getElementById("personas").value)
    };

    try {
        // Primero subir las imágenes
        const responseImagenes = await fetch('/api/upload-images', {
            method: 'POST',
            body: formData
        });
        const imagenesData = await responseImagenes.json();

        // Agregar las URLs de las imágenes a los datos
        datos.imagen_url = imagenesData.urls.join(',');

        // Luego crear la propiedad
        const response = await fetch('/api/casas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        });

        if (response.ok) {
            alert('Propiedad registrada exitosamente');
            window.location.href = 'vistaUsuario.html';
        } else {
            const error = await response.json();
            alert('Error al registrar la propiedad: ' + error.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Error al registrar la propiedad');
    }
});

formulario.addEventListener("reset", () => {
    imagenesSeleccionadas = [];
    preview.innerHTML = "";
    document.getElementById("resultado").style.display = "none";
    formulario.classList.remove('was-validated');
});