// URL base de la API
const API_URL = 'http://localhost:3000/api';

// Función para formatear el precio
function formatPrice(price) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);
}

// Función para cargar las propiedades
async function loadProperties() {
    try {
        const response = await fetch(`${API_URL}/properties`);
        const properties = await response.json();

        // Obtener el contenedor del grid
        const gridContainer = document.querySelector('.properties-grid');

        // Limpiar el contenedor
        gridContainer.innerHTML = '';

        // Crear las filas
        const rows = [];
        for (let i = 0; i < 2; i++) {
            const row = document.createElement('div');
            row.className = 'row';
            rows.push(row);
            gridContainer.appendChild(row);
        }

        // Llenar las propiedades
        properties.forEach((property, index) => {
            const column = document.createElement('div');
            column.className = 'four columns';

            column.innerHTML = `
                <div class="property-card">
                    <div class="property-type">${property.tipo_vivienda}</div>
                    <img src="${property.imagen || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3'}" 
                         alt="${property.tipo_vivienda}"
                         loading="lazy">
                    <div class="property-info">
                        <h5>${property.tipo_vivienda}</h5>
                        <p><i class="fas fa-map-marker-alt"></i> <span class="property-location">${property.ubicacion}</span></p>
                        <p><i class="fas fa-bed"></i> <span class="property-rooms">${property.numero_cuartos} Habitaciones</span></p>
                        <p><i class="fas fa-bath"></i> <span class="property-bathrooms">${property.numero_banos} Baños</span></p>
                        <p class="price">${formatPrice(property.precio)}</p>
                        <button class="button button-primary" onclick="viewPropertyDetails(${property.id})">
                            <i class="fas fa-info-circle"></i> Ver Detalles
                        </button>
                    </div>
                </div>
            `;

            // Agregar a la fila correspondiente
            const rowIndex = Math.floor(index / 3);
            rows[rowIndex].appendChild(column);
        });
    } catch (error) {
        console.error('Error al cargar las propiedades:', error);
        showAlert('Error al cargar las propiedades', 'error');
    }
}

// Función para mostrar alertas
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = `
        <i class="fas ${type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}"></i>
        ${message}
    `;

    document.body.appendChild(alertDiv);

    setTimeout(() => {
        alertDiv.remove();
    }, 3000);
}

// Función para ver detalles de una propiedad
function viewPropertyDetails(propertyId) {
    window.location.href = `/html/property-details.html?id=${propertyId}`;
}

// Cargar propiedades cuando el documento esté listo
document.addEventListener('DOMContentLoaded', loadProperties); 