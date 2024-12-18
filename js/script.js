// Configuración de Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

// Funciones para mostrar formularios
function mostrarFormularioUsuario() {
    document.getElementById("formContainerUsuario").style.display = "block";
    document.getElementById("formContainerLicitador").style.display = "none";
}

function mostrarFormularioLicitador() {
    document.getElementById("formContainerLicitador").style.display = "block";
    document.getElementById("formContainerUsuario").style.display = "none";
}

// Rotación de imágenes
const imagenes = ["imagenes/imagen1.jpg", "imagenes/imagen2.jpg", "imagenes/imagen3.jpg"];
let index = 0;

function cambiarImagen() {
    index = (index + 1) % imagenes.length;
    document.getElementById("imagenPrincipal").src = imagenes[index];
}

// Eventos al cargar
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("inicioUsuarioBtn").addEventListener("click", mostrarFormularioUsuario);
    document.getElementById("inicioLicitadorBtn").addEventListener("click", mostrarFormularioLicitador);
    setInterval(cambiarImagen, 5000); // Cambia la imagen cada 5 segundos
});
