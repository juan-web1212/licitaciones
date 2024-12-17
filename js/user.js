// Función para filtrar los licitadores
function filtrarLicitadores() {
    const filter = document.getElementById('licitadoresFilter').value.toLowerCase();
    const rows = document.getElementById('licitadoresTable').getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        const licitador = cells[0].textContent.toLowerCase();
        if (licitador.indexOf(filter) > -1) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// Función para filtrar los productos
function filtrarProductos() {
    const filter = document.getElementById('productosFilter').value.toLowerCase();
    const rows = document.getElementById('productosTable').getElementsByTagName('tr');
    
    for (let i = 1; i < rows.length; i++) {
        let cells = rows[i].getElementsByTagName('td');
        const producto = cells[0].textContent.toLowerCase();
        if (producto.indexOf(filter) > -1) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
}

// Función para confirmar al salir
function confirmarSalir() {
    const confirmation = confirm("¿Estás seguro de que quieres salir?");
    if (confirmation) {
        window.location.href = "../index.html"; // Redirige al inicio
    }
}
