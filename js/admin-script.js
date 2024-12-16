// Función para ordenar la tabla de licitadores por precio (ascendente)
// Función para filtrar las columnas de una tabla
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

// Función para mostrar el pop-up de confirmación al salir
document.getElementById('salirBtn').addEventListener('click', function () {
    const confirmacion = confirm("¿Estás seguro de que deseas salir?");
    if (confirmacion) {
        window.location.href = "../index.html";  // Redirige al inicio si confirma
    }
});
