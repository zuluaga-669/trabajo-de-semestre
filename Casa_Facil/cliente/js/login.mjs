document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const correo = document.getElementById('username').value;
    const pass = document.getElementById('password').value;

    try {
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, pass })
        });

        if (!response.ok) {
            const error = await response.json();
            alert(error.mensaje || 'Error en el inicio de sesión');
            return;
        }

        const data = await response.json();
        if(data.correo == 'correo@gmail.com'){
        window.location.href = '/dashbord.html';
        }else{
            window.location.href = `/vistaUsuario.html?usuid=${data.usuid}`;
        }

    } catch (error) {
        console.error('Error al hacer login:', error);
        alert('Error en el servidor');
    }
});
