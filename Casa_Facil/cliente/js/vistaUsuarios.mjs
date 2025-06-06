

async function cargarinfoUsuario() {
    const params = new URLSearchParams(window.location.search);
    const usuid = params.get('usuid');

    const nombre = document.getElementById('nombre-usuario');
    const celular = document.getElementById('telefono-usuario');
    const correo = document.getElementById('correo-usuario');
    const container = document.getElementById('propiedades-container');

    try {
        const response = await fetch('/vistaUsuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuid })
        });

        if (!response.ok) {
            const error = await response.json();
            console.log(error);
            return;
        }

        const data = await response.json();
        console.log(data);

        nombre.innerHTML = data.usuario.nombre;
        celular.innerHTML = data.usuario.celular;
        correo.innerHTML = data.usuario.correo;

        container.innerHTML = ''; // Limpiar contenedor

        // Estructura base de grid
        const grid = document.createElement('div');
        grid.className = 'container';
        grid.innerHTML = `
            <div class="properties-grid">
                <div class="row" id="propiedades-row"></div>
            </div>
        `;
        container.appendChild(grid);

        const row = grid.querySelector('#propiedades-row');

        data.propiedades.forEach(propiedad => {
            const imagenes = JSON.parse(propiedad.imagenes || "[]");
            const imagenSrc = imagenes.length > 0 ? `/uploads/${imagenes[0]}` : '../img/default-house.jpg';

            const card = document.createElement('div');
            card.className = 'four columns';
            card.innerHTML = `
                <div class="property-card">
                    <img src="${imagenSrc}" alt="${propiedad.titulo}">
                    <div class="property-info">
                        <h5>${propiedad.titulo}</h5>
                        <p><i class="fas fa-map-marker-alt"></i> <span class="property-location">${propiedad.direccion}</span></p>
                        <p><i class="fas fa-bed"></i> <span class="property-rooms">${propiedad.ncuartos} habitaciones</span></p>
                        <p><i class="fas fa-bath"></i> <span class="property-bathrooms">${propiedad.nbanos} baños</span></p>
                        <p class="price">$<span class="property-price">${propiedad.precio}</span></p>
                         <p class="price">$<span class="property-price">${propiedad.observaciones}</span></p>
                        </br>
                    </div>
                </div>
            `;
            row.appendChild(card);
        });

    } catch (error) {
        console.error('Error', error);
    }
}

const uploadBtn = document.getElementById('uploadBtn');
const params = new URLSearchParams(window.location.search);
const usuid = params.get('usuid');

uploadBtn.addEventListener('click', () => {
    if (usuid) {
        window.location.href = `http://localhost:3000/registroCasas.html?usuid=${encodeURIComponent(usuid)}`;
    } else {
        alert('No se encontró el ID de usuario en la URL actual.');
    }
});

cargarinfoUsuario();

