-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS licitaciones;

-- Usar la base de datos
USE licitaciones;

-- Crear la tabla de usuarios
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- ID único para cada usuario
    usuario VARCHAR(50) NOT NULL UNIQUE,       -- Nombre o correo del usuario
    password_hash VARCHAR(255) NOT NULL,       -- Contraseña encriptada
    creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP -- Fecha de creación
);

-- Insertar datos de prueba
INSERT INTO usuarios (usuario, password_hash) VALUES
('admin', '$2b$10$1xjKZ2mtRqLrKEFA4hBdueyw6zMb.vFuFyOI2H3vP4g5S5xLtP4fK'); -- Hash de "admin123"
