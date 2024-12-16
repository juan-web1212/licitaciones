document.addEventListener('DOMContentLoaded', () => {
    const tabla = document.getElementById('licitaciones-table').querySelector('tbody');

    // Obtener datos de licitaciones desde el backend
    fetch('http://localhost:3000/licitaciones')
        .then(response => response.json())
        .then(licitaciones => {
            licitaciones.forEach(licitacion => {
                const fila = document.createElement('tr');
                fila.innerHTML = `
                    <td>${licitacion.id}</td>
                    <td>${licitacion.nombre}</td>
                    <td>${licitacion.descripcion}</td>
                    <td>${licitacion.fecha}</td>
                `;
                tabla.appendChild(fila);
            });
        })
        .catch(error => {
            console.error('Error al obtener licitaciones:', error);
        });
});
