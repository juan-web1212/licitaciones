// Función para ordenar las columnas de una tabla
function ordenarTabla(tablaID, columnaIndex) {
    const tabla = document.getElementById(tablaID);
    const filas = Array.from(tabla.getElementsByTagName("tbody")[0].getElementsByTagName("tr"));
    let ordenAscendente = tabla.getAttribute(`data-orden-${columnaIndex}`) !== "asc";
    
    filas.sort((a, b) => {
        const celdaA = a.getElementsByTagName("td")[columnaIndex].innerText.toLowerCase();
        const celdaB = b.getElementsByTagName("td")[columnaIndex].innerText.toLowerCase();

        if (!isNaN(celdaA) && !isNaN(celdaB)) {
            return ordenAscendente ? celdaA - celdaB : celdaB - celdaA;
        }

        return ordenAscendente ? celdaA.localeCompare(celdaB) : celdaB.localeCompare(celdaA);
    });

    // Limpiar y agregar filas ordenadas
    const tbody = tabla.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    filas.forEach(fila => tbody.appendChild(fila));

    // Alternar orden
    tabla.setAttribute(`data-orden-${columnaIndex}`, ordenAscendente ? "asc" : "desc");
}
import { getDatabase, ref, remove } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

function eliminarUsuario(${childSnapshot.key}) {
    const database = getDatabase(); // Obtener la base de datos
    const userRef = ref(database, `usuarios/${id}`); // Referencia al usuario específico por su ID
    
    remove(userRef)
        .then(() => {
            alert('Usuario eliminado con éxito.');
            // Opcional: Actualizar la tabla después de eliminar
            cargarUsuarios(); // Recargar los datos si tienes esta función implementada
        })
        .catch((error) => {
            alert('Error al eliminar el usuario: ' + error.message);
        });
}

// Asegúrate de asignar la función al `window` para hacerla global
window.eliminarUsuario = eliminarUsuario;

// Función para filtrar las columnas
function filtrarColumna(tablaID, indiceColumna) {
    const tabla = document.getElementById(tablaID);
    const input = document.querySelectorAll(`#${tablaID} thead input`)[indiceColumna];
    const filtro = input.value.toLowerCase();
    const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (let i = 0; i < filas.length; i++) {
        const celda = filas[i].getElementsByTagName('td')[indiceColumna];
        if (celda) {
            const textoCelda = celda.textContent || celda.innerText;
            filas[i].style.display = textoCelda.toLowerCase().includes(filtro) ? '' : 'none';
        }
    }
}
// Función para confirmar al salir
function confirmarSalir() {
    const confirmation = confirm("¿Estás seguro de que quieres salir?");
    if (confirmation) {
        window.location.href = "../index.html"; // Redirige al inicio
    }
};
