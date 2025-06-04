document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('message');

    // Lista de usuarios válidos
    const usuariosValidos = [
        { id: 1, username: 'juan@example.com', password: '123456', nombre: 'Juan Pérez', telefono: '+56 912345678', correo: 'juan@example.com' },
        { id: 2, username: 'maria@example.com', password: 'abc123', nombre: 'María González', telefono: '+56 987654321', correo: 'maria@example.com' },
        { id: 3, username: 'admin@casafacil.com', password: 'admin123', nombre: 'Administrador', telefono: '+56 955555555', correo: 'admin@casafacil.com' }
    ];

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value.toLowerCase();
        const password = document.getElementById('password').value;

        // Buscar el usuario en la lista de usuarios válidos
        const usuarioEncontrado = usuariosValidos.find(
            user => user.username === username && user.password === password
        );

        if (usuarioEncontrado) {
            // Guardar los datos del usuario en localStorage
            localStorage.setItem('usuarioActual', JSON.stringify({
                id: usuarioEncontrado.id,
                nombre: usuarioEncontrado.nombre,
                telefono: usuarioEncontrado.telefono,
                correo: usuarioEncontrado.correo
            }));

            messageElement.textContent = 'Inicio de sesión exitoso';
            messageElement.style.color = 'green';

            // Redirigir a la vista de usuario después de un breve delay
            setTimeout(() => {
                window.location.href = 'vistaUsuario.html';
            }, 1000);
        } else {
            messageElement.textContent = 'Usuario o contraseña incorrectos';
            messageElement.style.color = 'red';
            // Limpiar el campo de contraseña
            document.getElementById('password').value = '';
        }
    });

    // Verificar si ya hay una sesión activa al cargar la página
    const usuarioActual = localStorage.getItem('usuarioActual');
    if (usuarioActual) {
        // Si ya hay una sesión activa, redirigir a la vista de usuario
        window.location.href = 'vistaUsuario.html';
    }

    // Manejar el botón de salir
    const btnSalir = document.querySelector('.btn-salir');
    if (btnSalir) {
        btnSalir.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'home.html';
        });
    }
});
var objt = {
    usuario: 'Juan',
    contraseña: '123456'
};

console.log(objeto);
