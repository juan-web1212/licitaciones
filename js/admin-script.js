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
}

// Pop-up para salir
document.getElementById('salirBtn').addEventListener('click', function () {
    const confirmacion = confirm("¿Estás seguro de que deseas salir?");
    if (confirmacion) {
        window.location.href = "../index.html";
    }
});
