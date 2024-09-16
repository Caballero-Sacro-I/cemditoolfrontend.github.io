//login.js - frontend
document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const token = localStorage.getItem('token');

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            //'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
        // Almacenar el token en localStorage o sessionStorage
        localStorage.setItem('token', data.token);
        alert(data.token);

        window.location.href = 'report.html'; // Redirige a la página del reporte si el login es exitoso
    } else if (response.status !== 200) {
        window.location.href = 'index.html'; // Redirige a la página de inicio de sesión si las credenciales son incorrectas
        
        alert(data.message); // Muestra una alerta si las credenciales son incorrectas
        document.getElementById('message').innerText = data.message;
    }

});

document.getElementById('togglePassword').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);

    // Cambia el texto del botón según el estado
    this.textContent = type === 'password' ? 'Show' : 'Hide';
});