// Función para ordenar la tabla de licitadores por precio (ascendente)
function ordenarPorPrecio() {
    const tabla = document.getElementById('tablaLicitadores');
    const filas = Array.from(tabla.getElementsByTagName('tr')).slice(1); // Excluir el encabezado
    const cuerpo = tabla.getElementsByTagName('tbody')[0];

    // Ordenar las filas basado en el precio (columna 4, índice 3)
    filas.sort((a, b) => {
        const precioA = parseFloat(a.cells[3].innerText);
        const precioB = parseFloat(b.cells[3].innerText);
        return precioA - precioB; // Orden ascendente
    });

    // Limpiar la tabla y volver a agregar las filas ordenadas
    cuerpo.innerHTML = "";
    filas.forEach(fila => cuerpo.appendChild(fila));
}
