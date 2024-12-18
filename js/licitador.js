import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, get, push } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCUHHGPBdN2VAWaF_J7wYqZ54sPBxy1RFs",
    authDomain: "tenderlicitaciones-9ba50.firebaseapp.com",
    databaseURL: "https://tenderlicitaciones-9ba50-default-rtdb.firebaseio.com/",
    projectId: "tenderlicitaciones-9ba50",
    storageBucket: "tenderlicitaciones-9ba50.appspot.com",
    messagingSenderId: "531013447459",
    appId: "1:531013447459:web:07580f26176abe2fe62696",
    measurementId: "G-E9RJCXF5MC"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

let licitadores = [];

// Cargar nombres de licitadores al iniciar la página
async function cargarLicitadores() {
    try {
        const snapshot = await get(ref(database, 'licitadores'));
        if (snapshot.exists()) {
            licitadores = Object.values(snapshot.val()).map(licitador => licitador.nombre);
        } else {
            console.error("No se encontraron licitadores en la base de datos.");
        }
    } catch (error) {
        console.error("Error al cargar licitadores:", error);
    }
}

// Inicializar eventos al cargar el DOM
document.addEventListener('DOMContentLoaded', async () => {
    await cargarLicitadores();

    const tablaElement = document.getElementById('tablaLicitaciones');
    const agregarProductoBtn = document.getElementById('agregarProductoBtn');
    const aceptarBtn = document.getElementById('aceptarBtn');
    const tbody = tablaElement.querySelector('tbody');

    // Evento para agregar una nueva fila
    agregarProductoBtn.addEventListener('click', () => {
        const nuevaFila = tbody.insertRow();

        const celdaProducto = nuevaFila.insertCell(0);
        const celdaPrecio = nuevaFila.insertCell(1);
        const celdaLicitador = nuevaFila.insertCell(2);

        celdaProducto.innerHTML = '<input type="text" placeholder="Nombre del producto" required>';
        celdaPrecio.innerHTML = '<input type="number" placeholder="Precio" min="0" required>';

        if (licitadores.length > 0) {
            const select = document.createElement('select');
            licitadores.forEach(nombre => {
                const option = document.createElement('option');
                option.value = nombre;
                option.textContent = nombre;
                select.appendChild(option);
            });
            celdaLicitador.appendChild(select);
        } else {
            celdaLicitador.textContent = "Sin licitadores disponibles";
        }

        aceptarBtn.style.display = 'inline-block';
    });

    // Evento para validar y guardar datos en Firebase
    aceptarBtn.addEventListener('click', async () => {
        const filas = tbody.querySelectorAll('tr');
        const productosRef = ref(database, 'productos');
        let datosCompletos = true;

        for (let fila of filas) {
            const producto = fila.cells[0].querySelector('input').value.trim();
            const precio = fila.cells[1].querySelector('input').value.trim();
            const licitadorSelect = fila.cells[2].querySelector('select');
            const licitador = licitadorSelect ? licitadorSelect.value : "";

            if (!producto || !precio || precio <= 0 || !licitador) {
                datosCompletos = false;
                break;
            }

            try {
                await push(productosRef, {
                    nombreProducto: producto,
                    precio: `$${precio}`,
                    nombreLicitador: licitador
                });
            } catch (error) {
                console.error("Error al guardar producto:", error);
            }
        }

        if (datosCompletos) {
            alert("¡Licitación enviada con éxito!");
            tbody.innerHTML = '';
            aceptarBtn.style.display = 'none';
            window.location.href = "../index.html";
        } else {
            alert("Por favor, complete todos los campos correctamente.");
        }
    });
});
