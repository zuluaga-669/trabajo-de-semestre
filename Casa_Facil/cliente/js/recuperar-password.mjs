document.addEventListener('DOMContentLoaded', () => {
    const recoveryForm = document.getElementById('recoveryForm');
    const messageElement = document.getElementById('message');
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const sendCodeButton = document.getElementById('sendCode');

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    sendCodeButton.addEventListener('click', async () => {
        const email = document.getElementById('email').value;

        if (!email) {
            messageElement.textContent = 'Por favor, ingresa tu correo electrónico';
            return;
        }

        if (!isValidEmail(email)) {
            messageElement.textContent = 'Por favor, ingresa un correo electrónico válido';
            return;
        }

        try {
            // Aquí se hará el llamado al backend para enviar el código
            /*
            const response = await fetch('https://tubackend.com/api/enviar-codigo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            if (!response.ok) throw new Error('Error al enviar el código');
            */

            messageElement.textContent = 'Código enviado a tu correo electrónico';
            messageElement.classList.add('success');

            step1.style.display = 'none';
            step2.style.display = 'flex';
        } catch (error) {
            messageElement.textContent = 'Error al enviar el código';
            messageElement.classList.remove('success');
        }
    });

    recoveryForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const code = document.getElementById('code').value;
        const email = document.getElementById('email').value;

        if (!code) {
            messageElement.textContent = 'Por favor, ingresa el código de verificación';
            return;
        }

        try {
            // Aquí se hará el llamado al backend para verificar el código
            /*
            const response = await fetch('https://tubackend.com/api/verificar-codigo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, code }),
            });

            const data = await response.json();

            if (!response.ok || !data.success) throw new Error('Código inválido');
            */

            messageElement.textContent = 'Código verificado correctamente';
            messageElement.classList.add('success');

            setTimeout(() => {
                window.location.href = 'login.html';
            }, 2000);
        } catch (error) {
            messageElement.textContent = 'Código inválido';
            messageElement.classList.remove('success');
        }
    });
});
