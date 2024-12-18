import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getDatabase, ref, get, child } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

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

// Mostrar el formulario de inicio de sesión
function mostrarFormulario() {
    document.getElementById('formularioAuth').style.display = 'block';
}

// Validar usuario y contraseña
async function validarUsuario() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();

    if (!username || !password) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    try {
        const dbRef = ref(database);
        const snapshot = await get(child(dbRef, `usuarios/${username}`));

        if (snapshot.exists()) {
            const userData = snapshot.val();

            if (userData.password === password) {
                if (userData.tipo === 1) {
                    // Redirigir a la página de admin
                    window.location.href = 'inicio/admin.html';
                } else if (userData.tipo === 2) {
                    // Redirigir a la página de user
                    window.location.href = 'inicio/user.html';
                } else {
                    alert('Tipo de usuario no válido.');
                }
            } else {
                alert('Contraseña incorrecta.');
            }
        } else {
            alert('Usuario no encontrado.');
        }
    } catch (error) {
        console.error('Error al validar el usuario:', error);
        alert('Ocurrió un error. Por favor, intenta nuevamente.');
    }
}

// Redirigir al licitador
function redirigirLicitador() {
    const licitadorName = document.getElementById('licitadorName').value.trim();

    if (!licitadorName) {
        alert('Por favor, ingresa tu nombre.');
        return;
    }

    // Redirigir al formulario del licitador
    window.location.href = 'inicio/licitador.html';
}
