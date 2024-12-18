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
    const usuarioForm = document.getElementById("formUsuario");
    const licitadorForm = document.getElementById("formLicitador");

    if (id === "formUsuario") {
        usuarioForm.style.display = usuarioForm.style.display === "none" ? "block" : "none";
        licitadorForm.style.display = "none";
    } else if (id === "formLicitador") {
        licitadorForm.style.display = licitadorForm.style.display === "none" ? "block" : "none";
        usuarioForm.style.display = "none";
    }
}

// Validar usuario
async function validarUsuario() {
    const username = document.getElementById("usuario").value.trim();
    const password = document.getElementById("contraseña").value.trim();

    if (!username || !password) {
        alert("Por favor, complete todos los campos.");
        return;
    }

    try {
        const snapshot = await get(ref(database, `usuarios/${username}`));
        if (snapshot.exists()) {
            const data = snapshot.val();
            if (data.password === password) {
                // Comparar tipo como cadena
                if (data.tipo === "1") {
                    window.location.href = "inicio/admin.html";
                } else if (data.tipo === "2") {
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
        console.error("Error al validar usuario:", error);
        alert("Ocurrió un error al validar el usuario. Intente nuevamente.");
    }
}

// Validar licitador
async function validarLicitador() {
    const idLicitador = document.getElementById("idLicitador").value.trim();

    if (!idLicitador) {
        alert("Por favor, complete el campo de ID del licitador.");
        return;
    }

    try {
        // Buscar por ID en la base de datos
        const snapshot = await get(ref(database, `licitadores/${idLicitador}`));
        if (snapshot.exists()) {
            // Almacenar el ID en sessionStorage
            sessionStorage.setItem("idLicitador", idLicitador);
            // Redirigir a la página de licitador
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
