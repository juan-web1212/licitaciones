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

// Función para verificar si se seleccionaron licitadores
function checkLicitadores() {
    const checkboxes = document.querySelectorAll('.acceptCheckbox:checked');
    const acceptButton = document.getElementById('aceptarBtn');
    if (checkboxes.length > 0) {
        acceptButton.style.display = 'inline-block';
    } else {
        acceptButton.style.display = 'none';
    }
}

// Función para mostrar el pop-up del centro de costo
function mostrarCentroCostoPopup() {
    const checkboxes = document.querySelectorAll('.acceptCheckbox:checked');
    if (checkboxes.length === 0) {
        alert("Por favor, selecciona al menos un licitador.");
        return;
    }
    document.getElementById('popupCentroCosto').style.display = 'flex';
}

// Función para cerrar el pop-up
function cerrarPopup() {
    document.getElementById('popupCentroCosto').style.display = 'none';
}

// Función para completar la compra
function finalizarCompra() {
    const centroCosto = document.getElementById('centroCostoInput').value;
    if (centroCosto === "") {
        alert("Por favor, ingresa un número de Centro de Costo.");
        return;
    }
    alert("Compra completada con éxito.");
    window.location.href = "../index.html"; // Redirige al index de usuario
}

// Función para ordenar las tablas
function ordenarTabla(tableId, colIndex) {
    const table = document.getElementById(tableId);
    const rows = Array.from(table.rows).slice(1); // Excluir la fila del encabezado
    const isAscending = table.rows[0].cells[colIndex].classList.toggle('asc');
    
    rows.sort((rowA, rowB) => {
        const cellA = rowA.cells[colIndex].textContent.trim();
        const cellB = rowB.cells[colIndex].textContent.trim();
        
        if (isNaN(cellA) || isNaN(cellB)) {
            return isAscending
                ? cellA.localeCompare(cellB)
                : cellB.localeCompare(cellA);
        }
        return isAscending ? cellA - cellB : cellB - cellA;
    });

    rows.forEach(row => table.appendChild(row));
}
