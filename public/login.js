document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('https://cemditools-backend-cold-lake-6201.fly.dev/api/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (response.status === 200) {
        window.location.href = '/public/report.html'; // Redirige a la página inicial si el login es exitoso
    } else {
        alert(data.message); // Muestra una alerta si las credenciales son incorrectas
        document.getElementById('message').innerText = data.message;
    }
});
