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

// Obtener el parámetro 'id' de la URL (ID del licitador)
const params = new URLSearchParams(window.location.search);
const idLicitador = params.get('id');

if (idLicitador) {
    obtenerNombreLicitador(idLicitador);
} else {
    alert("ID de licitador no encontrado. Redirigiendo...");
    window.location.href = "../index.html"; // Redirige al inicio si no hay ID
}

// Obtener el nombre del licitador usando su ID
async function obtenerNombreLicitador(id) {
    try {
        const snapshot = await get(ref(database, `licitadores/${id}`));
        if (snapshot.exists()) {
            const licitador = snapshot.val();
            const nombreLicitador = licitador.nombre;

            // Mostrar el nombre del licitador en la página
            document.querySelector('h1').textContent = `Agregar Producto para Licitación - ${nombreLicitador}`;

            // Mostrar el nombre del licitador en la tabla
            actualizarTabla(nombreLicitador);
        } else {
            console.error("No se encontró el licitador con ID:", id);
            alert("Licitador no encontrado. Redirigiendo...");
            window.location.href = "../index.html";
        }
    } catch (error) {
        console.error("Error al obtener el licitador:", error);
        alert("Hubo un error al cargar el licitador. Redirigiendo...");
        window.location.href = "../index.html";
    }
}

// Actualizar la tabla con el nombre del licitador
function actualizarTabla(nombreLicitador) {
    const tablaElement = document.getElementById('tablaLicitaciones');
    const tbody = tablaElement.getElementsByTagName('tbody')[0];

    const agregarProductoBtn = document.getElementById('agregarProductoBtn');
    const aceptarBtn = document.getElementById('aceptarBtn');
    
    agregarProductoBtn.addEventListener('click', () => {
        const nuevaFila = tbody.insertRow();

        const celdaProducto = nuevaFila.insertCell(0);
        const celdaPrecio = nuevaFila.insertCell(1);
        const celdaLicitador = nuevaFila.insertCell(2);

        celdaProducto.innerHTML = '<input type="text" placeholder="Nombre del producto" required>';
        celdaPrecio.innerHTML = '<input type="number" placeholder="Precio" min="0" required>';
        celdaLicitador.textContent = nombreLicitador; // Muestra el nombre del licitador directamente

        // Mostrar el botón de "Aceptar" solo si se han agregado filas
        aceptarBtn.style.display = 'inline-block';
    });

    // Evento para validar y guardar datos en Firebase al hacer clic en "Aceptar"
    aceptarBtn.addEventListener('click', () => {
        const filas = tbody.getElementsByTagName('tr');
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
}

// Función para limpiar la tabla después de enviar los datos
function limpiarTabla() {
    const tbody = document.getElementById('tablaLicitaciones').getElementsByTagName('tbody')[0];
    tbody.innerHTML = '';
}
