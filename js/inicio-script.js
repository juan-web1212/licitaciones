document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Evitar que el formulario recargue la página

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Simular una validación (en un entorno real, la validación se hace en el servidor)
    if (username === "admin" && password === "admin123") {
        alert("Inicio de sesión exitoso.");
        window.location.href = "dashboard.html"; // Redirigir al "dashboard"
    } else {
        alert("Usuario o contraseña incorrectos.");
    }
});
