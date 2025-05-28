/**
 * Dashboard - Casa Fácil
 * Este archivo maneja toda la lógica del dashboard administrativo de Casa Fácil.
 * Incluye funcionalidades CRUD para planes, usuarios y propiedades.
 * 
 * @author Casa Fácil
 * @version 1.0.0
 */

// Configuración de la conexión a la base de datos
const API_URL = 'http://localhost:3000/api';

/**
 * Muestra una alerta temporal en la interfaz
 * @param {string} message - El mensaje a mostrar
 * @param {string} type - El tipo de alerta (success, danger, warning, info)
 */
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

/**
 * Funciones para la gestión de Planes
 */
const loadPlans = async () => {
    try {
        const response = await fetch(`${API_URL}/planes`);
        const planes = await response.json();
        const tbody = document.getElementById('plansTableBody');
        tbody.innerHTML = '';

        planes.forEach(plan => {
            tbody.innerHTML += `
                <tr>
                    <td>${plan.plan_id}</td>
                    <td>${plan.nombre}</td>
                    <td>$${plan.precio}</td>
                    <td>${plan.estado}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editPlan(${plan.plan_id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deletePlan(${plan.plan_id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        showAlert('Error al cargar los planes', 'danger');
    }
};

/**
 * Agrega un nuevo plan al sistema
 * @param {Event} event - El evento del formulario
 */
const addPlan = async (event) => {
    event.preventDefault();
    const formData = {
        nombre: document.getElementById('addPlanName').value,
        precio: document.getElementById('addPlanValue').value,
        estado: 'activo'
    };

    try {
        const response = await fetch(`${API_URL}/planes`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showAlert('Plan agregado exitosamente');
            bootstrap.Modal.getInstance(document.getElementById('addPlanModal')).hide();
            loadPlans();
        } else {
            throw new Error('Error al agregar el plan');
        }
    } catch (error) {
        showAlert(error.message, 'danger');
    }
};

/**
 * Funciones para la gestión de Usuarios
 */
const loadUsers = async () => {
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        const usuarios = await response.json();
        const tbody = document.getElementById('userTableBody');
        tbody.innerHTML = '';

        usuarios.forEach(usuario => {
            tbody.innerHTML += `
                <tr>
                    <td>${usuario.usuario_id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellidos}</td>
                    <td>${usuario.tipo_documento}</td>
                    <td>${usuario.numero_documento}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.celular}</td>
                    <td>${usuario.departamento}</td>
                    <td>${usuario.municipio}</td>
                    <td>${usuario.estado}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editUser(${usuario.usuario_id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteUser(${usuario.usuario_id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        showAlert('Error al cargar los usuarios', 'danger');
    }
};

/**
 * Agrega un nuevo usuario al sistema
 * @param {Event} event - El evento del formulario
 */
const addUser = async (event) => {
    event.preventDefault();
    const formData = {
        nombre: document.getElementById('addUserName').value,
        apellidos: document.getElementById('addUserLastname').value,
        tipo_documento: document.getElementById('addUserDocType').value,
        numero_documento: document.getElementById('addUserDocNumber').value,
        correo: document.getElementById('addUserEmail').value,
        celular: document.getElementById('addUserPhone').value,
        direccion: document.getElementById('addUserAddress').value,
        departamento: document.getElementById('addUserDepartment').value,
        municipio: document.getElementById('addUserCity').value,
        tipo_persona: document.getElementById('addUserType').value,
        contrasena: document.getElementById('addUserPassword').value
    };

    try {
        const response = await fetch(`${API_URL}/usuarios`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showAlert('Usuario agregado exitosamente');
            bootstrap.Modal.getInstance(document.getElementById('addUserModal')).hide();
            loadUsers();
        } else {
            throw new Error('Error al agregar el usuario');
        }
    } catch (error) {
        showAlert(error.message, 'danger');
    }
};

/**
 * Funciones para la gestión de Propiedades
 */
const loadProperties = async () => {
    try {
        const response = await fetch(`${API_URL}/propiedades`);
        const propiedades = await response.json();
        const tbody = document.getElementById('propertiesTableBody');
        tbody.innerHTML = '';

        propiedades.forEach(propiedad => {
            tbody.innerHTML += `
                <tr>
                    <td>${propiedad.casa_id}</td>
                    <td>${propiedad.usuario_nombre}</td>
                    <td>${propiedad.plan_nombre}</td>
                    <td>${propiedad.tipo_vivienda}</td>
                    <td>${propiedad.numero_banos}</td>
                    <td>${propiedad.numero_cuartos}</td>
                    <td>${propiedad.mascotas ? 'Sí' : 'No'}</td>
                    <td>${propiedad.ubicacion}</td>
                    <td>${propiedad.cantidad_personas}</td>
                    <td>
                        <button class="btn btn-sm btn-primary" onclick="editProperty(${propiedad.casa_id})">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-danger" onclick="deleteProperty(${propiedad.casa_id})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </td>
                </tr>
            `;
        });
    } catch (error) {
        showAlert('Error al cargar las propiedades', 'danger');
    }
};

/**
 * Agrega una nueva propiedad al sistema
 * @param {Event} event - El evento del formulario
 */
const addProperty = async (event) => {
    event.preventDefault();
    const formData = {
        usuario_id: document.getElementById('propertyUser').value,
        plan_id: document.getElementById('propertyPlan').value,
        tipo_vivienda: document.getElementById('propertyType').value,
        numero_banos: document.getElementById('propertyBathrooms').value,
        numero_cuartos: document.getElementById('propertyRooms').value,
        mascotas: document.getElementById('propertyPets').checked,
        ubicacion: document.getElementById('propertyLocation').value,
        observaciones: document.getElementById('propertyObservations').value,
        cantidad_personas: document.getElementById('propertyPeople').value
    };

    try {
        const response = await fetch(`${API_URL}/propiedades`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            showAlert('Propiedad agregada exitosamente');
            bootstrap.Modal.getInstance(document.getElementById('addPropertyModal')).hide();
            loadProperties();
        } else {
            throw new Error('Error al agregar la propiedad');
        }
    } catch (error) {
        showAlert(error.message, 'danger');
    }
};

/**
 * Inicialización de la aplicación
 * Se ejecuta cuando el DOM está completamente cargado
 */
document.addEventListener('DOMContentLoaded', () => {
    // Cargar datos iniciales
    loadPlans();
    loadUsers();
    loadProperties();

    // Event listeners para formularios
    document.getElementById('addPlanForm').addEventListener('submit', addPlan);
    document.getElementById('addUserForm').addEventListener('submit', addUser);
    document.getElementById('addPropertyForm').addEventListener('submit', addProperty);

    // Navegación
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });
            document.getElementById(targetId).style.display = 'block';
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
        });
    });
});