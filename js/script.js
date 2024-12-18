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

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Rotación de imágenes
let imagenIndex = 1;
function cambiarImagen() {
    imagenIndex = (imagenIndex % 3) + 1;
    const imagen = document.getElementById("imagenPrincipal");
    imagen.src = `imagenes/imagen${imagenIndex}.jpg`;
}
setInterval(cambiarImagen, 4500);

// Mostrar formulario de inicio de sesión de usuario
function mostrarFormularioUsuario() {
    document.getElementById("formUsuarioSesion").style.display = "block";
    document.getElementById("formLicitadorSesion").style.display = "none";
}

// Mostrar formulario de inicio de sesión de licitador
function mostrarFormularioLicitador() {
    document.getElementById("formLicitadorSesion").style.display = "block";
    document.getElementById("formUsuarioSesion").style.display = "none";
}

// Validar usuario en la base de datos
async function validarUsuario() {
    const username = document.getElementById("usuario").value;
    const password = document.getElementById("contraseña").value;

    if (!username || !password) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    try {
        const snapshot = await get(ref(database, `usuarios/${username}`)); 

        if (snapshot.exists()) {
            const data = snapshot.val();

            if (data.password && data.password.trim() === password.trim()) {
                const tipo = data.tipo && data.tipo.trim();
                if (tipo === '1') {
                    window.location.href = "inicio/admin.html";
                } else if (tipo === '2') {
                    window.location.href = "inicio/user.html";
                } else {
                    alert("Tipo de usuario no reconocido.");
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

// Manejo del licitador
function redirigirLicitador() {
    const nombreLicitador = document.getElementById("nombreLicitador").value;

    if (!nombreLicitador) {
        alert("Por favor, complete el campo de nombre.");
        return;
    }

    window.location.href = "inicio/licitador.html";
}

// Eventos al cargar
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("validarBtn").addEventListener("click", validarUsuario);
    document.getElementById("entrarLicitadorBtn").addEventListener("click", redirigirLicitador);
});
