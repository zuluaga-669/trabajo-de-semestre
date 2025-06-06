

const showAlert = (message, type = 'success') => {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.querySelector('.main-content').prepend(alertDiv);
    setTimeout(() => alertDiv.remove(), 5000);
};

const loadDashboardData = async () => {
    try {
        const response = await fetch('/dashboard');
        const data = await response.json();

        // Usuarios
        const usuarios = data.usuarios;
        const userTbody = document.getElementById('userTableBody');
        userTbody.innerHTML = '';
        usuarios.forEach(usuario => {
            userTbody.innerHTML += `
                <tr>
                    <td>${usuario.usuid}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellidos}</td>
                    <td>${usuario.tipo_documento}</td>
                    <td>${usuario.numero_documento}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.celular}</td>
                    <td>${usuario.departamento}</td>
                    <td>${usuario.municipio}</td>
                    <td>${usuario.estado}</td>
                </tr>
            `;
        });

        // Propiedades
        const propiedades = data.propiedades;
        const propertiesTbody = document.getElementById('propertiesTableBody');
        propertiesTbody.innerHTML = '';
        propiedades.forEach(propiedad => {
            propertiesTbody.innerHTML += `
                <tr>
                    <td>${propiedad.casaid}</td>
                    <td>${propiedad.usuid || ''}</td>
                    <td>${propiedad.tipovivienda}</td>
                    <td>${propiedad.nbanos}</td>
                    <td>${propiedad.ncuartos}</td>
                    <td>${propiedad.mascotas ? 'Sí' : 'No'}</td>
                    <td>${propiedad.direccion}</td>
                    <td>${propiedad.cantidadpersonas}</td>
                    <td>${propiedad.precio}</td>
                </tr>
            `;
        });

    } catch (error) {
        console.error('Error al cargar dashboard:', error);
        showAlert('Error al cargar datos del dashboard', 'danger');
    }
};


document.addEventListener('DOMContentLoaded', () => {
    const usuariosBtn = document.getElementById('propiedadesBtn');
    const usuariosSection = document.getElementById('usuarios');

    const propiedadesBtn = document.getElementById('usuariosBtn');
    const propiedadesSeccion = document.getElementById('propiedades');

    usuariosBtn.addEventListener('click', () => {
        if (usuariosSection.style.display === 'none') {
            usuariosSection.style.display = 'block';
        } else {
            usuariosSection.style.display = 'none';
        }
    });

    propiedadesBtn.addEventListener('click', () => {
        if (propiedadesSeccion.style.display === 'none') {
            propiedadesSeccion.style.display = 'block';
        } else {
            propiedadesSeccion.style.display = 'none';
        }
    });

});


loadDashboardData()



