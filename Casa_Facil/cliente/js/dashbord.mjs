document.addEventListener('DOMContentLoaded', function () {
    const links = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    // Mostrar el Panel General al cargar la página
    document.getElementById('panel-general').style.display = 'block';

    // Cargar datos de usuarios desde localStorage
    const userTableBody = document.getElementById('userTableBody');
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];

    savedUsers.forEach(user => {
        // Contar el número de propiedades para cada usuario
        const userPropertiesCount = JSON.parse(localStorage.getItem('properties'))
            .filter(property => property.idu === user.id).length;

        const row = userTableBody.insertRow();
        row.innerHTML = `
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.type}</td>
            <td>${userPropertiesCount}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-btn">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm delete-btn">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
    });

    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            sections.forEach(section => {
                section.style.display = section.id === targetId ? 'block' : 'none';
            });
        });
    });

    // Lógica para eliminar un usuario
    function setupUserButtons() {
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', function () {
                const row = this.closest('tr');
                row.remove();
                saveUsers(); // Actualizar el almacenamiento local
            });
        });

        // Lógica para editar un usuario
        document.querySelectorAll('.edit-btn').forEach(button => {
            button.addEventListener('click', function () {
                const row = this.closest('tr');
                document.querySelectorAll('tr').forEach(r => r.classList.remove('editing')); // Desmarcar otras filas
                row.classList.add('editing'); // Marcar la fila como editando
                const userName = row.cells[1].textContent;
                const userEmail = row.cells[2].textContent;
                const userPhone = row.cells[3].textContent;
                const userType = row.cells[4].textContent;

                document.getElementById('editUserName').value = userName;
                document.getElementById('editUserEmail').value = userEmail;
                document.getElementById('editUserPhone').value = userPhone;
                document.getElementById('editUserType').value = userType;

                const editUserModal = new bootstrap.Modal(document.getElementById('editUserModal'));
                editUserModal.show();

                document.getElementById('editUserForm').onsubmit = function (e) {
                    e.preventDefault();
                    row.cells[1].textContent = document.getElementById('editUserName').value;
                    row.cells[2].textContent = document.getElementById('editUserEmail').value;
                    row.cells[3].textContent = document.getElementById('editUserPhone').value;
                    row.cells[4].textContent = document.getElementById('editUserType').value;
                    row.classList.remove('editing'); // Quitar la marca de editando
                    saveUsers(); // Guardar cambios
                    editUserModal.hide();
                };
            });
        });
    }

    // Llamar a setupUserButtons después de actualizar la tabla de usuarios
    function updateUserTable() {
        const userTableBody = document.getElementById('userTableBody');
        userTableBody.innerHTML = ''; // Limpiar la tabla existente
        const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const savedProperties = JSON.parse(localStorage.getItem('properties')) || [];

        savedUsers.forEach(user => {
            const userPropertiesCount = savedProperties.filter(property => property.idu === user.id).length;
            const row = userTableBody.insertRow();
            row.innerHTML = `
                <td>${user.id}</td>
                <td>${user.name}</td>
                <td>${user.email}</td>
                <td>${user.phone}</td>
                <td>${user.type}</td>
                <td>${userPropertiesCount}</td>
                <td>
                    <button class="btn btn-primary btn-sm edit-btn">
                        <i class="bi bi-pencil"></i>
                    </button>
                    <button class="btn btn-danger btn-sm delete-btn">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            `;
        });
        setupUserButtons(); // Configurar los botones de usuario
    }

    // Guardar cambios del modal
    document.getElementById('editUserForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const row = document.querySelector('tr.editing');
        if (row) {
            row.cells[1].textContent = document.getElementById('editUserName').value;
            row.cells[2].textContent = document.getElementById('editUserEmail').value;
            row.cells[3].textContent = document.getElementById('editUserPhone').value;
            row.cells[4].textContent = document.getElementById('editUserType').value;
            row.classList.remove('editing'); // Quitar la marca de editando
            saveUsers();
        }
        const editUserModal = bootstrap.Modal.getInstance(document.getElementById('editUserModal'));
        editUserModal.hide();
    });

    // Lógica para agregar un nuevo usuario
    document.getElementById('addUserForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const userTableBody = document.getElementById('userTableBody');
        const newRow = userTableBody.insertRow();
        newRow.innerHTML = `
            <td>${userTableBody.rows.length + 1}</td>
            <td>${document.getElementById('addUserName').value}</td>
            <td>${document.getElementById('addUserEmail').value}</td>
            <td>${document.getElementById('addUserPhone').value}</td>
            <td>${document.getElementById('addUserType').value}</td>
            <td>0</td>
            <td>
                <button class="btn btn-primary btn-sm edit-btn">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm delete-btn">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        saveUsers();
        const addUserModal = bootstrap.Modal.getInstance(document.getElementById('addUserModal'));
        addUserModal.hide();
        document.getElementById('addUserForm').reset();
    });

    // Función para guardar usuarios en localStorage
    function saveUsers() {
        const users = [];
        userTableBody.querySelectorAll('tr').forEach(row => {
            users.push({
                id: row.cells[0].textContent,
                name: row.cells[1].textContent,
                email: row.cells[2].textContent,
                phone: row.cells[3].textContent,
                type: row.cells[4].textContent,
                houses: row.cells[5].textContent
            });
        });
        localStorage.setItem('users', JSON.stringify(users));
        updateGeneralPanel(); // Actualizar el panel general
    }

    // Lógica para mostrar el modal de agregar plan
    document.getElementById('addPlanButton').addEventListener('click', function () {
        const addPlanModal = new bootstrap.Modal(document.getElementById('addPlanModal'));
        addPlanModal.show();
    });

    // Cargar datos de planes desde localStorage
    const plansTableBody = document.getElementById('plansTableBody');
    const savedPlans = JSON.parse(localStorage.getItem('plans')) || [];
    savedPlans.forEach(plan => {
        const row = plansTableBody.insertRow();
        row.innerHTML = `
            <td>${plan.id}</td>
            <td>${plan.name}</td>
            <td>${plan.value}</td>
            <td>${plan.date}</td>
            <td>${plan.status}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-plan-btn">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm delete-plan-btn">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        // Lógica para eliminar un plan
        row.querySelector('.delete-plan-btn').addEventListener('click', function () {
            row.remove();
            savePlans();
        });

        // Lógica para editar un plan
        row.querySelector('.edit-plan-btn').addEventListener('click', function () {
            const planName = row.cells[1].textContent;
            const planValue = row.cells[2].textContent;

            document.getElementById('editPlanName').value = planName;
            document.getElementById('editPlanValue').value = planValue;

            const editPlanModal = new bootstrap.Modal(document.getElementById('editPlanModal'));
            editPlanModal.show();

            document.getElementById('editPlanForm').onsubmit = function (e) {
                e.preventDefault();
                row.cells[1].textContent = document.getElementById('editPlanName').value;
                row.cells[2].textContent = document.getElementById('editPlanValue').value;
                editPlanModal.hide();
                savePlans();
            };
        });
    });

    // Función para guardar planes en localStorage
    function savePlans() {
        const plans = [];
        plansTableBody.querySelectorAll('tr').forEach(row => {
            plans.push({
                id: row.cells[0].textContent,
                name: row.cells[1].textContent,
                value: row.cells[2].textContent,
                date: row.cells[3].textContent,
                status: row.cells[4].textContent
            });
        });
        localStorage.setItem('plans', JSON.stringify(plans));
    }

    // Lógica para agregar un nuevo plan
    document.getElementById('addPlanForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const newRow = plansTableBody.insertRow();
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        newRow.innerHTML = `
            <td>${plansTableBody.rows.length + 1}</td>
            <td>${document.getElementById('addPlanName').value}</td>
            <td>${document.getElementById('addPlanValue').value}</td>
            <td>${formattedDate}</td>
            <td>Activo</td>
            <td>
                <button class="btn btn-primary btn-sm edit-plan-btn">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm delete-plan-btn">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        // Lógica para eliminar un plan
        newRow.querySelector('.delete-plan-btn').addEventListener('click', function () {
            newRow.remove();
            savePlans();
        });

        // Lógica para editar un plan
        newRow.querySelector('.edit-plan-btn').addEventListener('click', function () {
            const planName = newRow.cells[1].textContent;
            const planValue = newRow.cells[2].textContent;

            document.getElementById('editPlanName').value = planName;
            document.getElementById('editPlanValue').value = planValue;

            const editPlanModal = new bootstrap.Modal(document.getElementById('editPlanModal'));
            editPlanModal.show();

            document.getElementById('editPlanForm').onsubmit = function (e) {
                e.preventDefault();
                newRow.cells[1].textContent = document.getElementById('editPlanName').value;
                newRow.cells[2].textContent = document.getElementById('editPlanValue').value;
                editPlanModal.hide();
                savePlans();
            };
        });

        const addPlanModal = bootstrap.Modal.getInstance(document.getElementById('addPlanModal'));
        addPlanModal.hide();
        document.getElementById('addPlanForm').reset();
        savePlans();
    });

    // Lógica para mostrar el modal de agregar propiedad
    document.getElementById('addPropertyButton').addEventListener('click', function () {
        const userSelect = document.getElementById('propertyUser');
        const planSelect = document.getElementById('propertyPlan');

        // Limpiar opciones anteriores
        userSelect.innerHTML = '';
        planSelect.innerHTML = '';

        // Cargar usuarios en el select
        const users = JSON.parse(localStorage.getItem('users')) || [];
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            userSelect.appendChild(option);
        });

        // Cargar planes en el select
        const plans = JSON.parse(localStorage.getItem('plans')) || [];
        plans.forEach(plan => {
            const option = document.createElement('option');
            option.value = plan.name;
            option.textContent = plan.name;
            planSelect.appendChild(option);
        });

        const addPropertyModal = new bootstrap.Modal(document.getElementById('addPropertyModal'));
        addPropertyModal.show();
    });

    // Lógica para agregar una nueva propiedad
    document.getElementById('addPropertyForm').addEventListener('submit', function (e) {
        e.preventDefault();
        const propertiesTableBody = document.getElementById('propertiesTableBody');
        const newRow = propertiesTableBody.insertRow();
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString();
        const selectedUser = document.getElementById('propertyUser');
        const selectedPlan = document.getElementById('propertyPlan');
        const plans = JSON.parse(localStorage.getItem('plans')) || [];
        const selectedPlanValue = plans.find(plan => plan.name === selectedPlan.value).value;

        newRow.innerHTML = `
            <td>${propertiesTableBody.rows.length + 1}</td>
            <td>${selectedUser.value}</td>
            <td>${selectedUser.options[selectedUser.selectedIndex].text}</td>
            <td>${selectedPlan.value}</td>
            <td>${formattedDate}</td>
            <td>${selectedPlanValue}</td>
            <td>Activo</td>
            <td>${document.getElementById('propertyDescription').value}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-property-btn">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm delete-property-btn">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        // Lógica para eliminar una propiedad
        newRow.querySelector('.delete-property-btn').addEventListener('click', function () {
            newRow.remove();
            saveProperties();
        });

        // Lógica para editar una propiedad
        newRow.querySelector('.edit-property-btn').addEventListener('click', function () {
            const propertyPlan = newRow.cells[3].textContent;
            const propertyStatus = newRow.cells[6].textContent;
            const propertyDescription = newRow.cells[7].textContent;

            const planSelect = document.getElementById('editPropertyPlan');
            planSelect.innerHTML = '';
            const plans = JSON.parse(localStorage.getItem('plans')) || [];
            plans.forEach(plan => {
                const option = document.createElement('option');
                option.value = plan.name;
                option.textContent = plan.name;
                if (plan.name === propertyPlan) {
                    option.selected = true;
                }
                planSelect.appendChild(option);
            });

            document.getElementById('editPropertyStatus').value = propertyStatus;
            document.getElementById('editPropertyDescription').value = propertyDescription;

            const editPropertyModal = new bootstrap.Modal(document.getElementById('editPropertyModal'));
            editPropertyModal.show();

            document.getElementById('editPropertyForm').onsubmit = function (e) {
                e.preventDefault();
                newRow.cells[3].textContent = document.getElementById('editPropertyPlan').value;
                newRow.cells[6].textContent = document.getElementById('editPropertyStatus').value;
                newRow.cells[7].textContent = document.getElementById('editPropertyDescription').value;
                editPropertyModal.hide();
                saveProperties();
            };
        });

        const addPropertyModal = bootstrap.Modal.getInstance(document.getElementById('addPropertyModal'));
        addPropertyModal.hide();
        document.getElementById('addPropertyForm').reset();
        saveProperties();
    });

    // Función para guardar propiedades en localStorage
    function saveProperties() {
        const properties = [];
        propertiesTableBody.querySelectorAll('tr').forEach(row => {
            properties.push({
                idc: row.cells[0].textContent,
                idu: row.cells[1].textContent,
                user: row.cells[2].textContent,
                plan: row.cells[3].textContent,
                date: row.cells[4].textContent,
                value: row.cells[5].textContent,
                status: row.cells[6].textContent,
                description: row.cells[7].textContent
            });
        });
        localStorage.setItem('properties', JSON.stringify(properties));
        updateUserTable(); // Actualizar la tabla de usuarios
        updateGeneralPanel(); // Actualizar el panel general
    }

    // Cargar datos de propiedades desde localStorage
    const propertiesTableBody = document.getElementById('propertiesTableBody');
    const savedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    savedProperties.forEach(property => {
        const row = propertiesTableBody.insertRow();
        row.innerHTML = `
            <td>${property.idc}</td>
            <td>${property.idu}</td>
            <td>${property.user}</td>
            <td>${property.plan}</td>
            <td>${property.date}</td>
            <td>${property.value}</td>
            <td>${property.status}</td>
            <td>${property.description}</td>
            <td>
                <button class="btn btn-primary btn-sm edit-property-btn">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm delete-property-btn">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;

        // Lógica para eliminar una propiedad
        row.querySelector('.delete-property-btn').addEventListener('click', function () {
            row.remove();
            saveProperties();
        });

        // Lógica para editar una propiedad
        row.querySelector('.edit-property-btn').addEventListener('click', function () {
            const propertyPlan = row.cells[3].textContent;
            const propertyStatus = row.cells[6].textContent;
            const propertyDescription = row.cells[7].textContent;

            const planSelect = document.getElementById('editPropertyPlan');
            planSelect.innerHTML = '';
            const plans = JSON.parse(localStorage.getItem('plans')) || [];
            plans.forEach(plan => {
                const option = document.createElement('option');
                option.value = plan.name;
                option.textContent = plan.name;
                if (plan.name === propertyPlan) {
                    option.selected = true;
                }
                planSelect.appendChild(option);
            });

            document.getElementById('editPropertyStatus').value = propertyStatus;
            document.getElementById('editPropertyDescription').value = propertyDescription;

            const editPropertyModal = new bootstrap.Modal(document.getElementById('editPropertyModal'));
            editPropertyModal.show();

            document.getElementById('editPropertyForm').onsubmit = function (e) {
                e.preventDefault();
                row.cells[3].textContent = document.getElementById('editPropertyPlan').value;
                row.cells[6].textContent = document.getElementById('editPropertyStatus').value;
                row.cells[7].textContent = document.getElementById('editPropertyDescription').value;
                editPropertyModal.hide();
                saveProperties();
            };
        });
    });

    // Función para actualizar el panel general
    function updateGeneralPanel() {
        const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const savedProperties = JSON.parse(localStorage.getItem('properties')) || [];

        // Contar usuarios activos
        const activeUsersCount = savedUsers.filter(user => user.type === 'Activo').length;

        // Contar casas vendidas y en venta
        const soldHousesCount = savedProperties.filter(property => property.status === 'Vendido').length;
        const forSaleHousesCount = savedProperties.filter(property => property.status === 'Activo').length;

        // Actualizar el panel general
        document.getElementById('activeUsersCount').textContent = activeUsersCount;
        document.getElementById('soldHousesCount').textContent = soldHousesCount;
        document.getElementById('forSaleHousesCount').textContent = forSaleHousesCount;
    }

    // Llamar a updateGeneralPanel al cargar la página y después de cada operación relevante
    updateGeneralPanel();
});