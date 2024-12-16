const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Configurar la conexión a la base de datos
const conexion = mysql.createConnection({
    host: 'localhost',      // Cambia según la configuración de tu servidor
    user: 'root',           // Usuario de MySQL
    password: '',           // Contraseña de MySQL
    database: 'licitaciones' // Nombre de la base de datos (definido en database.sql)
});

// Verificar la conexión
conexion.connect((err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err);
        return;
    }
    console.log('Conexión exitosa a la base de datos');
});

// Ruta para obtener las licitaciones
app.get('/licitaciones', (req, res) => {
    const query = 'SELECT * FROM licitaciones'; // Cambia según las tablas en tu database.sql
    conexion.query(query, (err, resultados) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).send('Error en el servidor');
        } else {
            res.json(resultados);
        }
    });
});

// Iniciar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
