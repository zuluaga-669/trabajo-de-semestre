// Función para cargar las propiedades del usuario
async function cargarPropiedades() {
    try {
        // Por ahora, usaremos datos de ejemplo hasta que el backend esté listo
        const propiedades = [
            {
                id: 1,
                imagen_url: '../img/casa-ejemplo1.jpg',
                titulo: 'Casa Moderna en el Centro',
                precio: '250000',
                ubicacion: 'Centro de la Ciudad',
                tipo: 'Venta',
                habitaciones: 3,
                banos: 2
            },
            {
                id: 2,
                imagen_url: '../img/casa-ejemplo2.jpg',
                titulo: 'Apartamento con Vista al Mar',
                precio: '1500',
                ubicacion: 'Zona Costera',
                tipo: 'Alquiler',
                habitaciones: 2,
                banos: 1
            }
        ];

        const container = document.getElementById('propiedades-container');

        if (container) {
            container.innerHTML = ''; // Limpiar el contenedor

            if (propiedades.length === 0) {
                container.innerHTML = '<p class="no-properties">No tienes propiedades registradas</p>';
                return;
            }

            propiedades.forEach(propiedad => {
                const propertyCard = `
                    <div class="property-card">
                        <img src="${propiedad.imagen_url || '../img/default-house.jpg'}" 
                             alt="${propiedad.titulo}" 
                             class="property-image">
                        <div class="property-info">
                            <div>
                                <h3 class="property-title">${propiedad.titulo}</h3>
                                <span class="property-type">${propiedad.tipo}</span>
                            </div>
                            <div class="property-details">
                                <span class="property-price">$${propiedad.precio}</span>
                                <span class="property-location">
                                    <i class="fas fa-map-marker-alt"></i>
                                    ${propiedad.ubicacion}
                                </span>
                                <div class="property-features">
                                    <span><i class="fas fa-bed"></i> ${propiedad.habitaciones} hab.</span>
                                    <span><i class="fas fa-bath"></i> ${propiedad.banos} baños</span>
                                </div>
                            </div>
                            <div class="property-actions">
                                <button onclick="editarPropiedad(${propiedad.id})" class="edit-btn">
                                    <i class="fas fa-edit"></i> Editar
                                </button>
                                <button onclick="eliminarPropiedad(${propiedad.id})" class="delete-btn">
                                    <i class="fas fa-trash"></i> Eliminar
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                container.innerHTML += propertyCard;
            });
        }
    } catch (error) {
        console.error('Error:', error);
        const container = document.getElementById('propiedades-container');
        if (container) {
            container.innerHTML = '<p class="error-message">Error al cargar las propiedades</p>';
        }
    }
}
function inicio(){

    cargarPropiedades();

    cargarinfoUsuario();
}


window.editarPropiedad = function (id) {
    window.location.href = `registroCasas.html?id=${id}`;
};
window.eliminarPropiedad = function (id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) {
        cargarPropiedades();
    }
};

async function  cargarinfoUsuario() {
    const params = new URLSearchParams(window.location.search);

    const usuid = params.get('usuid');

    const nombre = document.getElementById('nombre-usuario');
    const celular = document.getElementById('telefono-usuario');
    const correo = document.getElementById('correo-usuario');

    try {
        const response = await fetch('/vistaUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ usuid })
        });

        if (!response.ok) {
            const error = await response.json();
            console.log(error)
            return;
        }

            const  data = await response.json();
            console.log(data)

            nombre.innerHTML=data.nombre;
            celular.innerHTML=data.celular;
            correo.innerHTML=data.correo;


    } catch (error) {
        console.error('Error', error);
    }

}

inicio();