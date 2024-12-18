import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, get, push } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

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

// Obtener el nombre del licitador desde el campo de texto
const nombreLicitadorInput = document.getElementById('nombreLicitador');

// Referencia a los botones
const agregarProductoBtn = document.getElementById('agregarProductoBtn');
const aceptarBtn = document.getElementById('aceptarBtn');
const tablaLicitaciones = document.getElementById('tablaLicitaciones').getElementsByTagName('tbody')[0];

// Función para agregar una nueva fila a la tabla
agregarProductoBtn.addEventListener('click', () => {
    const nombreLicitador = nombreLicitadorInput.value.trim();

    // Verificar que el nombre del licitador no esté vacío
    if (nombreLicitador === '') {
        alert("Por favor, ingresa el nombre del licitador.");
        return;
    }

    const nuevaFila = tablaLicitaciones.insertRow();

    const celdaProducto = nuevaFila.insertCell(0);
    const celdaPrecio = nuevaFila.insertCell(1);
    const celdaLicitador = nuevaFila.insertCell(2);

    celdaProducto.innerHTML = '<input type="text" placeholder="Nombre del producto" required>';
    celdaPrecio.innerHTML = '<input type="number" placeholder="Precio" min="0" required>';
    celdaLicitador.textContent = nombreLicitador; // Muestra el nombre del licitador

    // Mostrar el botón de "Aceptar" solo si se han agregado filas
    aceptarBtn.style.display = 'inline-block';
});

// Evento para validar y guardar datos en Firebase al hacer clic en "Aceptar"
aceptarBtn.addEventListener('click', () => {
    const filas = tablaLicitaciones.getElementsByTagName('tr');
    const productosRef = ref(database, 'productos');
    let datosCompletos = true;

    // Validar y guardar cada fila
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName('td');
        const producto = celdas[0].getElementsByTagName('input')[0].value.trim();
        const precio = celdas[1].getElementsByTagName('input')[0].value.trim();
        const licitador = celdas[2].textContent;  // Usamos el nombre que aparece en la tabla

        if (!producto || precio <= 0 || !licitador) {
            datosCompletos = false;
            break;
        }

        // Guardar datos en Firebase
        push(productosRef, {
            nombreProducto: producto,
            precio: `$${precio}`,
            nombreLicitador: licitador
        }).then(() => {
            console.log("Producto guardado correctamente en Firebase");
        }).catch(error => {
            console.error("Error al guardar producto en Firebase", error);
        });
    }

    if (datosCompletos) {
        alert("¡Licitación enviada con éxito y guardada en la base de datos!");
        limpiarTabla();
        window.location.href = "../index.html"; // Redirigir a la página principal
    } else {
        alert("Por favor, completa todos los campos y verifica que los precios sean mayores a 0.");
    }
});

// Función para limpiar la tabla después de enviar los datos
function limpiarTabla() {
    tablaLicitaciones.innerHTML = '';
}
