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

formulario.addEventListener("submit", function (event) {
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

    const datos = {
        tipoVivienda: tipo,
        baños: parseInt(document.getElementById("baños").value),
        cuartos: parseInt(document.getElementById("cuartos").value),
        mascotas: document.getElementById("mascotas").value === "Sí",
        ubicacion: document.getElementById("ubicacion").value,
        observaciones: document.getElementById("observaciones").value,
        personasPermitidas: parseInt(document.getElementById("personas").value),
        cantidadImagenes: imagenesSeleccionadas.length
    };

    document.getElementById("datosSalida").textContent = JSON.stringify(datos, null, 2);
    document.getElementById("resultado").style.display = "block";
    formulario.classList.remove('was-validated');
});

formulario.addEventListener("reset", () => {
    imagenesSeleccionadas = [];
    preview.innerHTML = "";
    document.getElementById("resultado").style.display = "none";
});