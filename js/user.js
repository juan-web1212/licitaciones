// Función para manejar la selección de un solo checkbox
function seleccionarCheckbox(event) {
    // Obtener todos los checkboxes
    const checkboxes = document.querySelectorAll('.licitacion-checkbox');
    
    // Desmarcar todos los checkboxes
    checkboxes.forEach(checkbox => {
        checkbox.checked = false;
    });

    // Marcar el checkbox seleccionado
    event.target.checked = true;
}

// Añadir evento para manejar los checkboxes
const checkboxes = document.querySelectorAll('.licitacion-checkbox');
checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function(event) {
        // Llamamos a la función para seleccionar un solo checkbox
        seleccionarCheckbox(event);

        // Verificamos si más de un checkbox está seleccionado
        const selectedCheckboxes = document.querySelectorAll('.licitacion-checkbox:checked');
        if (selectedCheckboxes.length > 1) {
            alert("Solo puedes seleccionar una licitación a la vez.");
            // Si se seleccionan más de uno, desmarcar todos los checkboxes
            selectedCheckboxes.forEach(checkbox => {
                checkbox.checked = false;
            });
        }
    });
});

// Función para completar la compra
function finalizarCompra() {
    const selectedCheckbox = document.querySelector('.licitacion-checkbox:checked');
    
    if (selectedCheckbox) {
        const licitacionId = selectedCheckbox.dataset.licitacionId;  // Obtener el ID de la licitación seleccionada
        alert(`Compra completada con la licitación N° ${licitacionId}`);
        // Redirigir al usuario al index de usuario o hacer cualquier otra acción
        window.location.href = "../index.html"; // Redirige a la página de inicio
    } else {
        alert("Por favor, selecciona una licitación para completar la compra.");
    }
}

// Función para mostrar el popup
function mostrarPopup() {
    document.getElementById('popupCentroCosto').style.display = 'flex';
}

// Función para cerrar el popup
function cerrarPopup() {
    document.getElementById('popupCentroCosto').style.display = 'none';
}

// Función para manejar la acción de "Aceptar" para la compra
function aceptarCompra() {
    const centroCosto = document.getElementById('centroCosto').value;
    
    if (centroCosto) {
        // Completar compra con el número de centro de costo
        const licitacionId = document.querySelector('.licitacion-checkbox:checked').dataset.licitacionId;
        alert(`Compra completada con la licitación N° ${licitacionId} y centro de costo: ${centroCosto}`);
        window.location.href = "../index.html"; // Redirige a la página de inicio
    } else {
        alert("Por favor, ingresa un número de Centro de Costo.");
    }
}

// Función para cancelar la acción
function cancelarCompra() {
    cerrarPopup();
    alert("Acción cancelada");
}
// Función para mostrar el popup de confirmación al hacer clic en "Salir"
function mostrarConfirmacion() {
    const confirmacion = confirm("¿Estás seguro de que quieres salir?");
    if (confirmacion) {
        window.location.href = "../index.html"; // Redirige al inicio
    }
}
