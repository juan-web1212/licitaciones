import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

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

// Función para agregar una nueva fila a la tabla
document.getElementById('agregarProductoBtn').addEventListener('click', function () {
    const tabla = document.getElementById('tablaLicitaciones').getElementsByTagName('tbody')[0];

    const nuevaFila = tabla.insertRow();  // Crear nueva fila

    // Crear celdas para la nueva fila
    const celdaProducto = nuevaFila.insertCell(0);
    const celdaPrecio = nuevaFila.insertCell(1);
    const celdaId = nuevaFila.insertCell(2);

    // Añadir campos de entrada a cada celda
    celdaProducto.innerHTML = '<input type="text" placeholder="Nombre del producto" required>';
    celdaPrecio.innerHTML = '<input type="number" placeholder="Precio" min="0" required>';
    celdaId.innerHTML = '<input type="text" placeholder="Nombre del licitador" required>';

    // Mostrar el botón de "Aceptar" solo si se han agregado filas
    document.getElementById("aceptarBtn").style.display = 'inline-block';
});

// Función para manejar el evento de "Aceptar" y validar la tabla
document.getElementById('aceptarBtn').addEventListener('click', function () {
    const filas = document.getElementById('tablaLicitaciones').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    const productosRef = ref(database, 'productos'); // Referencia en Firebase
    let datosCompletos = true;

    // Comprobar si hay campos vacíos o precios menores a 0
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName('td');
        const producto = celdas[0].getElementsByTagName('input')[0].value.trim();
        const precio = celdas[1].getElementsByTagName('input')[0].value.trim();
        const licitador = celdas[2].getElementsByTagName('input')[0].value.trim();

        if (!producto || precio < 0 || !licitador) {
            datosCompletos = false;
            break;
        }

        // Guardar cada producto en Firebase
        push(productosRef, {
            nombreProducto: producto,
            precio: `$${precio}`,
            nombreLicitador: licitador
        });
    }

    if (datosCompletos) {
        alert("¡Licitación enviada con éxito y guardada en la base de datos!");
        limpiarTabla();
        window.location.href = "../index.html"; // Redirigir a la página principal
    } else {
        alert("Por favor, completa todos los campos y verifica que los precios sean mayores o iguales a 0.");
    }
});

// Función para limpiar la tabla después de enviar los datos
function limpiarTabla() {
    document.querySelector('#tablaLicitaciones tbody').innerHTML = '';
}

// Función para mostrar la confirmación de salida
document.getElementById('salirBtn').addEventListener('click', function (event) {
    // Preguntar al usuario si realmente quiere salir
    const confirmarSalida = confirm("¿Estás seguro de que deseas salir?");

    // Si el usuario confirma la salida
    if (confirmarSalida) {
        window.location.href = "../index.html"; // Redirigir al inicio
    }
    // Si el usuario cancela, no se hace nada
    else {
        event.preventDefault(); // Prevenir la acción de salir si el usuario cancela
    }
});
// Definir la función guardarProductos
function guardarproductos() {
    // Lógica para guardar los productos
    console.log("Productos guardados.");
    // Aquí puedes agregar el código para procesar los productos y guardarlos en la base de datos
};
