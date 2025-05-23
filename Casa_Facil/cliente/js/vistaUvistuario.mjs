<script src="https://kit.fontawesome.com/your-font-awesome-kit.js"></script>

// Función para cerrar sesión
function cerrarSesion() {
    // Aquí irá la lógica para cerrar sesión
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

window.onload = function () {
    // Cargar datos del usuario
    const userData = {
        nombre: "Nombre del Usuario",
        telefono: "+XX XXXXXXXXX",
        correo: "usuario@ejemplo.com"
    };

    document.getElementById('nombre-usuario').textContent = userData.nombre;
    document.getElementById('telefono-usuario').textContent = userData.telefono;
    document.getElementById('correo-usuario').textContent = userData.correo;

    // Cargar las propiedades
    cargarPropiedades();
};