document.addEventListener('DOMContentLoaded', () => {
    const recoveryForm = document.getElementById('recoveryForm');
    const messageElement = document.getElementById('message');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const sendCodeButton = document.getElementById('sendCode');

    // Manejar el envío del código
    sendCodeButton.addEventListener('click', async () => {
        const email = document.getElementById('email').value;

        if (!email) {
            messageElement.textContent = 'Por favor, ingresa tu correo electrónico';
            return;
        }

        try {
            // Aquí iría la llamada al backend para enviar el código
            messageElement.textContent = 'Código enviado a tu correo electrónico';
            messageElement.classList.add('success');

            // Mostrar el paso 2
            step1.style.display = 'none';
            step2.style.display = 'flex';
        } catch (error) {
            messageElement.textContent = 'Error al enviar el código';
            messageElement.classList.remove('success');
        }
    });

    // Manejar la verificación del código
    recoveryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const code = document.getElementById('code').value;

        if (!code) {
            messageElement.textContent = 'Por favor, ingresa el código de verificación';
            return;
        }

        try {
            // Aquí iría la llamada al backend para verificar el código
            messageElement.textContent = 'Código verificado correctamente';
            messageElement.classList.add('success');

            // Redirigir al login después de 2 segundos
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } catch (error) {
            messageElement.textContent = 'Código inválido';
            messageElement.classList.remove('success');
        }
    });
}); 