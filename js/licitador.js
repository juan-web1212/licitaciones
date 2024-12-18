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

// Esperar a que el DOM esté completamente cargado antes de añadir los event listeners
document.addEventListener('DOMContentLoaded', () => {
    // Referencias de elementos
    const tablaElement = document.getElementById('tablaLicitaciones');
    const agregarProductoBtn = document.getElementById('agregarProductoBtn');
    const aceptarBtn = document.getElementById('aceptarBtn');
    const salirBtn = document.getElementById('salirBtn');

    // Verificar si la tabla y el tbody existen
    if (tablaElement) {
        const tbody = tablaElement.getElementsByTagName('tbody')[0];
        if (!tbody) {
            console.error('El elemento tbody no existe en la tabla.');
            return;
        }

        // Evento para agregar una nueva fila a la tabla
        agregarProductoBtn.addEventListener('click', () => {
            const nuevaFila = tbody.insertRow(); // Crear nueva fila

            // Crear celdas para la nueva fila
            const celdaProducto = nuevaFila.insertCell(0);
            const celdaPrecio = nuevaFila.insertCell(1);
            const celdaId = nuevaFila.insertCell(2);

            // Añadir campos de entrada a cada celda
            celdaProducto.innerHTML = '<input type="text" placeholder="Nombre del producto" required>';
            celdaPrecio.innerHTML = '<input type="number" placeholder="Precio" min="0" required>';
            celdaId.innerHTML = '<input type="text" placeholder="Nombre del licitador" required>';

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
                const licitador = celdas[2].getElementsByTagName('input')[0].value.trim();

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

        // Evento para mostrar confirmación al salir
        salirBtn.addEventListener('click', (event) => {
            if (confirm("¿Estás seguro de que deseas salir?")) {
                window.location.href = "../index.html"; // Redirigir al inicio
            } else {
                event.preventDefault();
            }
        });

        // Función para limpiar la tabla después de enviar los datos
        function limpiarTabla() {
            tbody.innerHTML = '';
        }
    } else {
        console.error('El elemento #tablaLicitaciones no existe en el DOM.');
    }
});
