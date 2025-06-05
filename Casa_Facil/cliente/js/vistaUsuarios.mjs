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

        // Mostrar datos del usuario
        nombre.innerHTML = data.usuario.nombre;
        celular.innerHTML = data.usuario.celular;
        correo.innerHTML = data.usuario.correo;

        // Mostrar propiedades del usuario
        container.innerHTML = ''; // Limpiar antes de agregar
        data.propiedades.forEach(propiedad => {
            const propertyCard = `
                <div class="property-card">
                    <img src="${propiedad.imagen_url || '../img/default-house.jpg'}" 
                         alt="${propiedad.titulo}" 
                         class="property-image">
                    <div class="property-info">
                        <div>
                            <h3 class="property-title">${propiedad.titulo}</h3>
                            <span class="property-type">${propiedad.tipovivienda}</span>
                        </div>
                        <div class="property-details">
                            <span class="property-price">$${propiedad.precio}</span>
                            <span class="property-location">
                                <i class="fas fa-map-marker-alt"></i>
                                ${propiedad.direccion}
                            </span>
                            <div class="property-features">
                                <span><i class="fas fa-bed"></i> ${propiedad.ncuartos} hab.</span>
                                <span><i class="fas fa-bath"></i> ${propiedad.nbanos} baños</span>
                                </br>
                                <span></i> ${propiedad.observaciones}</span>
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

    } catch (error) {
        console.error('Error', error);
    }
}

cargarinfoUsuario();