// Función para manejar el evento de "Aceptar"
function enviarLicitacion() {
    const producto = document.getElementById('producto').value;
    const precio = document.getElementById('precio').value;
    const idLicitador = document.getElementById('idLicitador').value;

    // Verificar si todos los campos están llenos
    if (!producto || !precio || !idLicitador) {
        alert("Debes completar al menos un dato en la tabla.");
    } else {
        alert(`Licitación enviada con éxito. Producto: ${producto}, Precio: ${precio}, ID de Licitador: ${idLicitador}`);
        // Redirigir al usuario al inicio o cualquier otra acción
        window.location.href = "../index.html"; // Redirige al inicio
    }
}

// Función para mostrar un mensaje de confirmación al hacer clic en "Salir"
function mostrarConfirmacion() {
    const confirmacion = confirm("¿Estás seguro de que quieres salir?");
    if (confirmacion) {
        window.location.href = "../index.html"; // Redirige al inicio
    }
}
