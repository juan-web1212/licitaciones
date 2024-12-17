// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCUHHGPBdN2VAWaF_J7wYqZ54sPBxy1RFs",
  authDomain: "tenderlicitaciones-9ba50.firebaseapp.com",
  projectId: "tenderlicitaciones-9ba50",
  storageBucket: "tenderlicitaciones-9ba50.firebasestorage.app",
  messagingSenderId: "531013447459",
  appId: "1:531013447459:web:07580f26176abe2fe62696",
  measurementId: "G-E9RJCXF5MC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Guardar usuarios en Firebase
function guardarUsuario(user) {
    const userRef = database.ref('usuarios');
    userRef.push(user);
}

// Guardar licitadores en Firebase
function guardarLicitador(licitador) {
    const licitadorRef = database.ref('licitadores');
    licitadorRef.push(licitador);
};
// Función para ordenar las columnas de una tabla
function ordenarTabla(tablaID, columnaIndex) {
    const tabla = document.getElementById(tablaID);
    const filas = Array.from(tabla.getElementsByTagName("tbody")[0].getElementsByTagName("tr"));
    let ordenAscendente = tabla.getAttribute(`data-orden-${columnaIndex}`) !== "asc";
    
    filas.sort((a, b) => {
        const celdaA = a.getElementsByTagName("td")[columnaIndex].innerText.toLowerCase();
        const celdaB = b.getElementsByTagName("td")[columnaIndex].innerText.toLowerCase();

        if (!isNaN(celdaA) && !isNaN(celdaB)) {
            return ordenAscendente ? celdaA - celdaB : celdaB - celdaA;
        }

        return ordenAscendente ? celdaA.localeCompare(celdaB) : celdaB.localeCompare(celdaA);
    });

    // Limpiar y agregar filas ordenadas
    const tbody = tabla.getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    filas.forEach(fila => tbody.appendChild(fila));

    // Alternar orden
    tabla.setAttribute(`data-orden-${columnaIndex}`, ordenAscendente ? "asc" : "desc");
}

// Función para filtrar las columnas
function filtrarColumna(tablaID, indiceColumna) {
    const tabla = document.getElementById(tablaID);
    const input = document.querySelectorAll(`#${tablaID} thead input`)[indiceColumna];
    const filtro = input.value.toLowerCase();
    const filas = tabla.getElementsByTagName('tbody')[0].getElementsByTagName('tr');

    for (let i = 0; i < filas.length; i++) {
        const celda = filas[i].getElementsByTagName('td')[indiceColumna];
        if (celda) {
            const textoCelda = celda.textContent || celda.innerText;
            filas[i].style.display = textoCelda.toLowerCase().includes(filtro) ? '' : 'none';
        }
    }
}

// Pop-up para salir
document.getElementById('salirBtn').addEventListener('click', function () {
    const confirmacion = confirm("¿Estás seguro de que deseas salir?");
    if (confirmacion) {
        window.location.href = "../index.html";
    }
});
