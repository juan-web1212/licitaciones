import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCUHHGPBdN2VAWaF_J7wYqZ54sPBxy1RFs",
    authDomain: "tenderlicitaciones-9ba50.firebaseapp.com",
    databaseURL: "https://tenderlicitaciones-9ba50-default-rtdb.firebaseio.com/",
    projectId: "tenderlicitaciones-9ba50",
    storageBucket: "tenderlicitaciones-9ba50.appspot.com",
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

// Mostrar formularios
function toggleFormulario(id) {
    document.getElementById("formUsuario").style.display = "none";
    document.getElementById("formLicitador").style.display = "none";
    document.getElementById(id).style.display = "block";
}

// Validar usuario
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
            if (data.password === password) {
                if (data.tipo === 1) {
                    window.location.href = "inicio/admin.html";
                } else if (data.tipo === 2) {
                    window.location.href = "inicio/user.html";
                }
            } else {
                alert("Contraseña incorrecta.");
            }
        } else {
            alert("Usuario no encontrado.");
        }
    } catch (error) {
        console.error("Error al validar usuario:", error);
    }
}

// Validar licitador
async function validarLicitador() {
    const nombreLicitador = document.getElementById("nombreLicitador").value;

    if (!nombreLicitador) {
        alert("Por favor, complete el campo de nombre.");
        return;
    }

    try {
        const snapshot = await get(ref(database, `licitadores/${nombreLicitador}`));
        if (snapshot.exists()) {
            window.location.href = "inicio/licitador.html";
        } else {
            alert("Licitador no encontrado.");
        }
    } catch (error) {
        console.error("Error al validar licitador:", error);
    }
}

// Eventos al cargar
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("inicioUsuarioBtn").addEventListener("click", () => toggleFormulario("formUsuario"));
    document.getElementById("inicioLicitadorBtn").addEventListener("click", () => toggleFormulario("formLicitador"));
    document.getElementById("validarBtn").addEventListener("click", validarUsuario);
    document.getElementById("entrarLicitadorBtn").addEventListener("click", validarLicitador);
});
