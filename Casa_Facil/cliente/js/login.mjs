document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const messageElement = document.getElementById('message');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();

            if (response.ok) {
                messageElement.textContent = 'Inicio de sesión exitoso';
                messageElement.style.color = 'green';
                // Redirigir al dashboard después de un inicio de sesión exitoso
                setTimeout(() => {
                    window.location.href = 'dashbord.html';
                }, 1500);
            } else {
                messageElement.textContent = data.error || 'Error en el inicio de sesión';
                messageElement.style.color = 'red';
            }
        } catch (error) {
            messageElement.textContent = 'Error al conectar con el servidor';
            messageElement.style.color = 'red';
        }
    });

    // Manejar el botón de salir
    const btnSalir = document.querySelector('.btn-salir');
    btnSalir.addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'home.html';
    });
});
