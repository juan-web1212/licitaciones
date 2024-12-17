import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, onValue } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

// Configuración de Firebase
const firebaseConfig = {
            apiKey: "AIzaSyCUHHGPBdN2VAWaF_J7wYqZ54sPBxy1RFs",
            authDomain: "tenderlicitaciones-9ba50.firebaseapp.com",
            databaseURL: "https://tenderlicitaciones-9ba50-default-rtdb.firebaseio.com/",
            projectId: "tenderlicitaciones-9ba50",
            storageBucket: "tenderlicitaciones-9ba50.firebasestorage.app",
            messagingSenderId: "531013447459",
            appId: "1:531013447459:web:07580f26176abe2fe62696",
            measurementId: "G-E9RJCXF5MC"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Cargar Licitadores desde la base de datos
function cargarLicitadores() {
    const licitadoresRef = ref(database, 'licitadores');
    const tbody = document.querySelector('#licitadoresTable tbody');
    tbody.innerHTML = ''; // Limpiar tabla

    onValue(licitadoresRef, (snapshot) => {
        snapshot.forEach((child) => {
            const data = child.val();
            const row = `
                <tr>
                    <td>${data.nombre}</td>
                    <td>${data.licitacionesPresentadas}</td>
                    <td>${child.key}</td>
                    <td><input type="checkbox" onchange="checkLicitadores()"></td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    });
}

// Cargar Productos desde la base de datos
function cargarProductos() {
    const productosRef = ref(database, 'productos');
    const tbody = document.querySelector('#productosTable tbody');
    tbody.innerHTML = ''; // Limpiar tabla

    onValue(productosRef, (snapshot) => {
        snapshot.forEach((child) => {
            const data = child.val();
            const fechaVencimiento = calcularFechaVencimiento(30);
            const row = `
                <tr>
                    <td>${data.nombreProducto}</td>
                    <td>${data.precio}</td>
                    <td>${child.key}</td>
                    <td>${fechaVencimiento}</td>
                    <td>${data.nombreLicitador}</td>
                </tr>
            `;
            tbody.innerHTML += row;
        });
    });
}

// Calcular fecha de vencimiento (+30 días)
function calcularFechaVencimiento(dias) {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + dias);
    return fecha.toISOString().split('T')[0];

}

// Filtrar Productos
function filtrarProductos() {
    const filtro = document.getElementById('productosFilter').value.toLowerCase();
    const rows = document.querySelectorAll('#productosTable tbody tr');
    rows.forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(filtro) ? '' : 'none';
    });
}

// Pop-up para Centro de Costo
function mostrarCentroCostoPopup() {
    document.getElementById('popupCentroCosto').style.display = 'block';
}

function cerrarPopup() {
    document.getElementById('popupCentroCosto').style.display = 'none';
}

function confirmarSalir() {
    if (confirm('¿Está seguro de que desea salir?')) {
        window.location.href = '../index.html';
    }
}

// Llamar funciones al cargar
window.onload = () => {
    cargarLicitadores();
    cargarProductos();
};

// Hacer funciones globales
window.filtrarLicitadores = filtrarLicitadores;
window.filtrarProductos = filtrarProductos;
window.mostrarCentroCostoPopup = mostrarCentroCostoPopup;
window.cerrarPopup = cerrarPopup;
window.confirmarSalir = confirmarSalir;


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
