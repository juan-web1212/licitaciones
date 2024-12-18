import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, set, push, onValue, update, remove } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCUHHGPBdN2VAWaF_J7wYqZ54sPBxy1RFs",
    authDomain: "tenderlicitaciones-9ba50.firebaseapp.com",
    databaseURL: "https://tenderlicitaciones-9ba50-default-rtdb.firebaseio.com/",
    projectId: "tenderlicitaciones-9ba50",
    storageBucket: "tenderlicitaciones-9ba50.firebaseapp.com",
    messagingSenderId: "531013447459",
    appId: "1:531013447459:web:07580f26176abe2fe62696",
    measurementId: "G-E9RJCXF5MC"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// -------------------- USUARIOS --------------------

// Guardar nuevo usuario con username como ID
function guardarUsuario(user) {
    const userRef = ref(database, `usuarios/${user.username}`);
    return set(userRef, user);
}

// Cargar usuarios
function cargarUsuarios() {
    const userRef = ref(database, 'usuarios');
    const tablaUsuarios = document.querySelector('#tablaUsuarios tbody');
    tablaUsuarios.innerHTML = '';

    onValue(userRef, (snapshot) => {
        tablaUsuarios.innerHTML = ''; // Limpiar tabla antes de recargar datos
        snapshot.forEach((childSnapshot) => {
            const user = childSnapshot.val();
            const row = `<tr>
                <td contenteditable="true" data-key="${childSnapshot.key}" data-field="username">${user.username}</td>
                <td contenteditable="true" data-key="${childSnapshot.key}" data-field="email">${user.email}</td>
                <td contenteditable="true" data-key="${childSnapshot.key}" data-field="tipo">${user.tipo}</td>
                <td>
                    <button onclick="eliminarUsuario('${childSnapshot.key}')">Eliminar</button>
                </td>
            </tr>`;
            tablaUsuarios.innerHTML += row;
        });
    });
}

// Eliminar usuario
function eliminarUsuario(username) {
    const userRef = ref(database, `usuarios/${username}`);
    remove(userRef)
        .then(() => {
            alert('Usuario eliminado con éxito.');
            cargarUsuarios();
        })
        .catch((error) => {
            alert('Error al eliminar usuario: ' + error.message);
        });
}
window.eliminarUsuario = eliminarUsuario;

// Manejo del formulario de usuarios
document.getElementById('formUsuario').addEventListener('submit', function (e) {
    e.preventDefault();

    const user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        tipo: document.getElementById('tipo').value,
    };

    guardarUsuario(user)
        .then(() => {
            document.getElementById('messageUsuarios').innerHTML = "<p>Usuario registrado con éxito.</p>";
            document.getElementById('formUsuario').reset();
            cargarUsuarios();
        })
        .catch((error) => {
            document.getElementById('messageUsuarios').innerHTML = "<p>Error al registrar el usuario: " + error.message + "</p>";
        });
});

// -------------------- LICITADORES --------------------

// Guardar nuevo licitador
function guardarLicitador(licitador) {
    const licitadorRef = ref(database, 'licitadores');
    return push(licitadorRef, licitador);
}

// Cargar licitadores
function cargarLicitadores() {
    const licitadorRef = ref(database, 'licitadores');
    const tablaLicitadores = document.querySelector('#tablaLicitadores tbody');
    tablaLicitadores.innerHTML = '';

    onValue(licitadorRef, (snapshot) => {
        tablaLicitadores.innerHTML = ''; // Limpiar tabla antes de recargar datos
        snapshot.forEach((childSnapshot) => {
            const licitador = childSnapshot.val();
            const row = `<tr>
                <td>${childSnapshot.key}</td>
                <td contenteditable="true" data-key="${childSnapshot.key}" data-field="nombre">${licitador.nombre}</td>
                <td>
                    <button onclick="eliminarLicitador('${childSnapshot.key}')">Eliminar</button>
                </td>
            </tr>`;
            tablaLicitadores.innerHTML += row;
        });
    });
}

// Eliminar licitador
function eliminarLicitador(id) {
    const licitadorRef = ref(database, `licitadores/${id}`);
    remove(licitadorRef)
        .then(() => {
            alert('Licitador eliminado con éxito.');
            cargarLicitadores();
        })
        .catch((error) => {
            alert('Error al eliminar licitador: ' + error.message);
        });
}
window.eliminarLicitador = eliminarLicitador;

// Manejo del formulario de licitadores
document.getElementById('formLicitador').addEventListener('submit', function (e) {
    e.preventDefault();

    const licitador = {
        nombre: document.getElementById('nombreLicitador').value,
    };

    guardarLicitador(licitador)
        .then(() => {
            document.getElementById('messageLicitadores').innerHTML = "<p>Licitador registrado con éxito.</p>";
            document.getElementById('formLicitador').reset();
            cargarLicitadores();
        })
        .catch((error) => {
            document.getElementById('messageLicitadores').innerHTML = "<p>Error al registrar el licitador: " + error.message + "</p>";
        });
});

// Cargar datos al iniciar
cargarUsuarios();
cargarLicitadores();
