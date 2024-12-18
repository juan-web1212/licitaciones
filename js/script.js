import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

// Cambiar las imágenes automáticamente
let imagenIndex = 1;
function cambiarImagen() {
    imagenIndex = (imagenIndex % 3) + 1;
    const imagen = document.getElementById("imagenPrincipal");
    imagen.src = `imagenes/imagen${imagenIndex}.jpg`;
}
setInterval(cambiarImagen, 4500);

// Mostrar el formulario correspondiente
function mostrarFormulario() {
    const formContainer = document.getElementById("formContainer");
    const formUsuario = document.getElementById("formUsuario");
    const formLicitador = document.getElementById("formLicitador");

    // Alternar la visibilidad del formulario
    formContainer.style.display = formContainer.style.display === "none" ? "block" : "none";
    formUsuario.style.display = "block"; // Mostrar por defecto el formulario de usuario
    formLicitador.style.display = "none";
}

// Validar el usuario y contraseña desde la base de datos
async function validarUsuario() {
    const usuario = document.getElementById("usuario").value;
    const contraseña = document.getElementById("contraseña").value;

    if (!usuario || !contraseña) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    try {
        const snapshot = await get(ref(database, `usuarios/${usuario}`));

        if (snapshot.exists()) {
            const data = snapshot.val();

            if (data.contraseña === contraseña) {
                if (data.tipo === 1) {
                    window.location.href = "inicio/admin.html"; // Redirigir al panel de admin
                } else if (data.tipo === 2) {
                    window.location.href = "inicio/user.html"; // Redirigir al panel de usuario
                }
            } else {
                alert("Contraseña incorrecta.");
            }
        } else {
            alert("Usuario no encontrado.");
        }
    } catch (error) {
        console.error("Error al validar el usuario:", error);
        alert("Ocurrió un error al validar el usuario.");
    }
}

// Manejar la redirección para licitador
function redirigirLicitador() {
    const nombreLicitador = document.getElementById("nombreLicitador").value;

    if (!nombreLicitador) {
        alert("Por favor, complete el campo de nombre.");
        return;
    }

    // Guardar el nombre del licitador en la base de datos o continuar con el flujo
    console.log("Licitador ingresado:", nombreLicitador);
    window.location.href = "inicio/licitador.html"; // Redirigir a la página de licitador
}

// Asignar los eventos al cargar el DOM
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("inicioBtn").addEventListener("click", mostrarFormulario);
    document.getElementById("validarBtn").addEventListener("click", validarUsuario);
    document.getElementById("entrarLicitadorBtn").addEventListener("click", redirigirLicitador);
});
