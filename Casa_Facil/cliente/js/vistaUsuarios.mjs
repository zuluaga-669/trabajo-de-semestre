// Función para cerrar sesión
function cerrarSesion() {
    // Limpiar datos del usuario
    localStorage.removeItem('usuarioActual');
    // Redirigir al login
    window.location.href = 'login.html';
}

// Función para cargar las propiedades del usuario
async function cargarPropiedades() {
    const usuario = JSON.parse(localStorage.getItem('usuarioActual'));
    if (!usuario) return;

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

// Función para verificar si el usuario está autenticado
function verificarAutenticacion() {
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (!usuarioActual) {
        window.location.href = 'login.html';
        return false;
    }
    return JSON.parse(usuarioActual);
}

// Inicializar la página
window.onload = function () {
    // Verificar autenticación
    const usuario = verificarAutenticacion();
    if (!usuario) return;

    // Cargar datos del usuario desde localStorage
    document.getElementById('nombre-usuario').textContent = usuario.nombre;
    document.getElementById('telefono-usuario').textContent = usuario.telefono;
    document.getElementById('correo-usuario').textContent = usuario.correo;

    // Cargar las propiedades
    cargarPropiedades();
};

// Exponer funciones necesarias globalmente
window.cerrarSesion = cerrarSesion;
window.editarPropiedad = function (id) {
    window.location.href = `registroCasas.html?id=${id}`;
};
window.eliminarPropiedad = function (id) {
    if (confirm('¿Estás seguro de que deseas eliminar esta propiedad?')) {
        // Por ahora solo recargamos las propiedades
        cargarPropiedades();
    }
};