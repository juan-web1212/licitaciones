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

// Mostrar el formulario de inicio de sesión
function mostrarFormulario() {
    const formContainer = document.getElementById("formContainer");
    formContainer.style.display = formContainer.style.display === "none" ? "block" : "none";
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

// Eventos al cargar
document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("inicioBtn").addEventListener("click", mostrarFormulario);
    document.getElementById("validarBtn").addEventListener("click", validarUsuario);
});
