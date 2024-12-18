import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, set, push, onChildAdded, onChildRemoved, remove } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCUHHGPBdN2VAWaF_J7wYqZ54sPBxy1RFs",
    authDomain: "tenderlicitaciones-9ba50.firebaseapp.com",
    databaseURL: "https://tenderlicitaciones-9ba50-default-rtdb.firebaseio.com/",
    projectId: "tenderlicitaciones-9ba50",
    storageBucket: "tenderlicitaciones-9ba50.appspot.com",
    messagingSenderId: "531013447459",
    appId: "1:531013447459:web:07580f26176abe2fe62696",
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// ------------------- USUARIOS -------------------

// Guardar usuario
function guardarUsuario(user) {
    const userRef = ref(database, `usuarios/${user.username}`);
    return set(userRef, user);
}

// Agregar usuario a la tabla dinámicamente
function agregarUsuarioATabla(key, user) {
    const tablaUsuarios = document.querySelector('#tablaUsuarios tbody');
    const row = `
        <tr id="usuario-${key}">
            <td>${user.username}</td>
            <td>${user.email}</td>
            <td>${user.tipo}</td>
            <td>
                <button onclick="eliminarUsuario('${key}')">Eliminar</button>
            </td>
        </tr>`;
    tablaUsuarios.innerHTML += row;
}

// Cargar usuarios en tiempo real
function cargarUsuarios() {
    const userRef = ref(database, 'usuarios');

    onChildAdded(userRef, (data) => {
        agregarUsuarioATabla(data.key, data.val());
    });

    onChildRemoved(userRef, (data) => {
        const row = document.getElementById(`usuario-${data.key}`);
        if (row) row.remove();
    });
}

// Eliminar usuario
function eliminarUsuario(username) {
    const userRef = ref(database, `usuarios/${username}`);
    remove(userRef)
        .then(() => {
            alert('Usuario eliminado con éxito.');
        })
        .catch((error) => {
            alert('Error al eliminar usuario: ' + error.message);
        });
}
window.eliminarUsuario = eliminarUsuario;

// Registrar usuario desde formulario
document.getElementById('formUsuario').addEventListener('submit', (e) => {
    e.preventDefault();

    const user = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
        email: document.getElementById('email').value,
        tipo: document.getElementById('tipo').value,
    };

    guardarUsuario(user)
        .then(() => {
            document.getElementById('messageUsuarios').innerHTML = '<p>Usuario registrado con éxito.</p>';
            document.getElementById('formUsuario').reset();
        })
        .catch((error) => {
            document.getElementById('messageUsuarios').innerHTML = `<p>Error: ${error.message}</p>`;
        });
});

// ------------------- LICITADORES -------------------

// Guardar licitador
function guardarLicitador(licitador) {
    const licitadorRef = ref(database, 'licitadores');
    return push(licitadorRef, licitador);
}

// Agregar licitador a la tabla dinámicamente
function agregarLicitadorATabla(key, licitador) {
    const tablaLicitadores = document.querySelector('#tablaLicitadores tbody');
    const row = `
        <tr id="licitador-${key}">
            <td>${key}</td>
            <td>${licitador.nombre}</td>
            <td>
                <button onclick="eliminarLicitador('${key}')">Eliminar</button>
            </td>
        </tr>`;
    tablaLicitadores.innerHTML += row;
}

// Cargar licitadores en tiempo real
function cargarLicitadores() {
    const licitadorRef = ref(database, 'licitadores');

    onChildAdded(licitadorRef, (data) => {
        agregarLicitadorATabla(data.key, data.val());
    });

    onChildRemoved(licitadorRef, (data) => {
        const row = document.getElementById(`licitador-${data.key}`);
        if (row) row.remove();
    });
}

// Eliminar licitador
function eliminarLicitador(id) {
    const licitadorRef = ref(database, `licitadores/${id}`);
    remove(licitadorRef)
        .then(() => {
            alert('Licitador eliminado con éxito.');
        })
        .catch((error) => {
            alert('Error al eliminar licitador: ' + error.message);
        });
}
window.eliminarLicitador = eliminarLicitador;

// Registrar licitador desde formulario
document.getElementById('formLicitador').addEventListener('submit', (e) => {
    e.preventDefault();

    const licitador = {
        nombre: document.getElementById('nombreLicitador').value,
    };

    guardarLicitador(licitador)
        .then(() => {
            document.getElementById('messageLicitadores').innerHTML = '<p>Licitador registrado con éxito.</p>';
            document.getElementById('formLicitador').reset();
        })
        .catch((error) => {
            document.getElementById('messageLicitadores').innerHTML = `<p>Error: ${error.message}</p>`;
        });
});

// ------------------- INICIAR CARGA -------------------
cargarUsuarios();
cargarLicitadores();
