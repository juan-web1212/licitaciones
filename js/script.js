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

// Mostrar los formularios
function mostrarFormularioUsuario() {
    document.getElementById("formContainerUsuario").style.display = "block";
    document.getElementById("formContainerLicitador").style.display = "none";
}

function mostrarFormularioLicitador() {
    document.getElementById("formContainerLicitador").style.display = "block";
    document.getElementById("formContainerUsuario").style.display = "none";
}

// Validar usuarios
async function validarUsuario() {
    const username = document.getElementById("usuario").value;
    const password = document.getElementById("contraseña").value;

    try {
        const snapshot = await get(ref(database, `usuarios/${username}`));

        if (snapshot.exists() && snapshot.val().password === password) {
            alert("Usuario válido");
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    } catch (error) {
        alert("Error validando usuario");
    }
}

// Validar licitadores
async function validarLicitador() {
    const nombre = document.getElementById("nombreLicitador").value;
    const clave = document.getElementById("claveLicitador").value;

    try {
        const snapshot = await get(ref(database, `licitadores/${nombre}`));

        if (snapshot.exists() && snapshot.val().clave === clave) {
            alert("Licitador válido");
        } else {
            alert("Licitador o clave incorrectos");
        }
    } catch (error) {
        alert("Error validando licitador");
    }
}

// Eventos al cargar
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("inicioUsuarioBtn").addEventListener("click", mostrarFormularioUsuario);
    document.getElementById("inicioLicitadorBtn").addEventListener("click", mostrarFormularioLicitador);
    document.getElementById("validarUsuarioBtn").addEventListener("click", validarUsuario);
    document.getElementById("validarLicitadorBtn").addEventListener("click", validarLicitador);
});
