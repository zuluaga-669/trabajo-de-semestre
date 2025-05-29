// Función para verificar autenticación y actualizar la interfaz
function verificarAutenticacion() {
    const usuarioActual = localStorage.getItem('usuarioActual');
    const loginButton = document.getElementById('loginButton');

    if (usuarioActual && loginButton) {
        const usuario = JSON.parse(usuarioActual);
        loginButton.href = 'vistaUsuario.html';
        loginButton.innerHTML = `<i class="fas fa-user"></i> Mi Perfil`;
    } else if (loginButton) {
        loginButton.href = 'login.html';
        loginButton.innerHTML = `<i class="fas fa-user"></i> Iniciar Sesión`;
    }
}

// Función para cargar las propiedades destacadas
async function cargarPropiedades() {
    const container = document.getElementById('properties-container');
    if (!container) return;

    // Por ahora usaremos datos de ejemplo
    const propiedades = [
        {
            imagen: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3',
            titulo: 'Casa Moderna en el Centro',
            precio: '250,000',
            ubicacion: 'Centro de la Ciudad',
            habitaciones: 3,
            banos: 2
        },
        {
            imagen: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3',
            titulo: 'Apartamento con Vista',
            precio: '180,000',
            ubicacion: 'Zona Residencial',
            habitaciones: 2,
            banos: 1
        },
        {
            imagen: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3',
            titulo: 'Casa Familiar',
            precio: '320,000',
            ubicacion: 'Zona Norte',
            habitaciones: 4,
            banos: 3
        }
    ];

    container.innerHTML = '';
    propiedades.forEach(propiedad => {
        const propertyCard = `
            <div class="four columns">
                <div class="property-card">
                    <img src="${propiedad.imagen}" alt="${propiedad.titulo}">
                    <div class="property-info">
                        <h5>${propiedad.titulo}</h5>
                        <p><i class="fas fa-map-marker-alt"></i> <span class="property-location">${propiedad.ubicacion}</span></p>
                        <p><i class="fas fa-bed"></i> <span class="property-rooms">${propiedad.habitaciones} Habitaciones</span></p>
                        <p><i class="fas fa-bath"></i> <span class="property-bathrooms">${propiedad.banos} Baños</span></p>
                        <p class="price">$<span class="property-price">${propiedad.precio}</span></p>
                        <button class="button button-primary">Ver Detalles</button>
                    </div>
                </div>
            </div>
        `;
        container.innerHTML += propertyCard;
    });
}

// Inicializar la página
document.addEventListener('DOMContentLoaded', () => {
    verificarAutenticacion();
    cargarPropiedades();
});
