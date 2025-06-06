async function cargarPropiedades() {
    const row = document.querySelector('.properties-grid .row');
    row.innerHTML = ''; // Limpiar contenedor

    try {
        const response = await fetch('/index');

        if (!response.ok) {
            const error = await response.json();
            console.log(error);
            return;
        }

        const data = await response.json();
        console.log(data);

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
                        <p>${propiedad.observaciones || ''}</p>
                        <button class="button" onclick="verDetalles(${propiedad.id})">Ver Detalles</button>
                    </div>
                </div>
            `;
            row.appendChild(card);
        });

    } catch (error) {
        console.error('Error al cargar propiedades:', error);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    cargarPropiedades();
});
