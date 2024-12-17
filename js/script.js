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
function redirigirPagina() {
    const role = document.getElementById('role').value.toLowerCase(); // Obtiene y convierte el rol a minúsculas
    let url = '';

    // Define las rutas para cada rol
    switch (role) {
        case 'admin':
            url = 'admin.html'; // Página para administradores
            break;
        case 'user':
            url = 'user.html'; // Página para usuarios
            break;
        case 'licitador':
            url = 'licitador.html'; // Página para licitadores
            break;
        default:
            alert('Por favor, escribe un rol válido: admin, user o licitador');
            return; // No redirige si el rol no es válido
    }

    // Redirige a la página correspondiente
    window.location.href = url;
};
