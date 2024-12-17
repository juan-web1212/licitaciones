// Función para agregar una nueva fila a la tabla
document.getElementById('agregarProductoBtn').addEventListener('click', function() {
    const tabla = document.getElementById('tablaLicitaciones').getElementsByTagName('tbody')[0];
    
    const nuevaFila = tabla.insertRow();  // Crear nueva fila

    // Crear celdas para la nueva fila
    const celdaProducto = nuevaFila.insertCell(0);
    const celdaPrecio = nuevaFila.insertCell(1);
    const celdaId = nuevaFila.insertCell(2);

    // Añadir campos de entrada a cada celda
    celdaProducto.innerHTML = '<input type="text" placeholder="Nombre del producto" required>';
    celdaPrecio.innerHTML = '<input type="number" placeholder="Precio" min="0" required>';
    celdaId.innerHTML = 'licitador1';  // Establecer ID como "licitador1" por defecto

    // Mostrar el botón de "Aceptar" solo si se han agregado filas
    document.getElementById("aceptarBtn").style.display = 'inline-block';
});

// Función para manejar el evento de "Aceptar" y validar la tabla
document.getElementById('aceptarBtn').addEventListener('click', function() {
    const filas = document.getElementById('tablaLicitaciones').getElementsByTagName('tbody')[0].getElementsByTagName('tr');
    let datosCompletos = true;

    // Comprobar si hay campos vacíos o precios menores a 0
    for (let i = 0; i < filas.length; i++) {
        const celdas = filas[i].getElementsByTagName('td');
        const producto = celdas[0].getElementsByTagName('input')[0].value;
        const precio = celdas[1].getElementsByTagName('input')[0].value;

        if (!producto || precio < 0) {
            datosCompletos = false;
            break;
        }
    }

    if (datosCompletos) {
        alert("¡Licitación enviada con éxito!");
        // Aquí puedes añadir lógica para guardar la licitación en la base de datos
        window.close(); // Cierra la página tras la validación exitosa
    } else {
        alert("Por favor, completa al menos un producto con un precio válido (mayor o igual a 0).");
    }
});

// Función para mostrar la confirmación de salida
document.getElementById('salirBtn').addEventListener('click', function(event) {
    // Preguntar al usuario si realmente quiere salir
    const confirmarSalida = confirm("¿Estás seguro de que deseas salir?");
    
    // Si el usuario confirma la salida
    if (confirmarSalida) {
        window.location.href = "../index.html";  // Redirigir al inicio
    }
    // Si el usuario cancela, no se hace nada
    else {
        event.preventDefault();  // Prevenir la acción de salir si el usuario cancela
    }
});
