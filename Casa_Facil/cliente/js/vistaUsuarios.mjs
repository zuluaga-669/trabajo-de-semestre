<script src="https://kit.fontawesome.com/your-font-awesome-kit.js"></script>

// Función para cerrar sesión
function cerrarSesion() {
    // Limpiar datos del usuario
    localStorage.removeItem('usuarioActual');
    // Redirigir al login
    window.location.href = 'login.html';
}

// Función para cargar las propiedades
function cargarPropiedades() {
    const propiedades = [
        {
            imagen: '../img/casa-ejemplo1.jpg',
            titulo: 'Casa Moderna en el Centro',
            precio: '$250,000',
            ubicacion: 'Centro de la Ciudad',
            tipo: 'Venta'
        },
        {
            imagen: '../img/casa-ejemplo2.jpg',
            titulo: 'Apartamento con Vista al Mar',
            precio: '$1,500/mes',
            ubicacion: 'Zona Costera',
            tipo: 'Alquiler'
        },
        {
            imagen: '../img/casa-ejemplo3.jpg',
            titulo: 'Casa Familiar con Jardín',
            precio: '$180,000',
            ubicacion: 'Zona Residencial',
            tipo: 'Venta'
        }
    ];

    const container = document.getElementById('propiedades-container');
    if (container) {
        container.innerHTML = ''; // Limpiar el contenedor antes de agregar nuevas propiedades

        propiedades.forEach(propiedad => {
            const propertyCard = `
                <div class="property-card">
                    <img src="${propiedad.imagen}" alt="${propiedad.titulo}" class="property-image">
                    <div class="property-info">
                        <div>
                            <h3 class="property-title">${propiedad.titulo}</h3>
                            <span class="property-type">${propiedad.tipo}</span>
                        </div>
                        <div class="property-details">
                            <span class="property-price">${propiedad.precio}</span>
                            <span class="property-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${propiedad.ubicacion}
                            </span>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += propertyCard;
        });
    }
}

// Función para verificar si el usuario está autenticado
function verificarAutenticacion() {
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (!usuarioActual) {
        // Si no hay usuario autenticado, redirigir al login
        window.location.href = 'login.html';
        return false;
    }
    return JSON.parse(usuarioActual);
}

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