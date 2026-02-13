-- Database Creation
CREATE DATABASE IF NOT EXISTS parking_system;
USE parking_system;

-- 1. Table: ROLES
CREATE TABLE IF NOT EXISTS ROLES (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
) ENGINE=InnoDB;

-- 2. Table: USUARIOS
CREATE TABLE IF NOT EXISTS USUARIOS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    rol_id INT NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (rol_id) REFERENCES ROLES(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_email (email)
) ENGINE=InnoDB;

-- 3. Table: TIPOS_VEHICULO
CREATE TABLE IF NOT EXISTS TIPOS_VEHICULO (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL UNIQUE,
    descripcion TEXT
) ENGINE=InnoDB;

-- 4. Table: ESPACIOS
CREATE TABLE IF NOT EXISTS ESPACIOS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(20) NOT NULL UNIQUE,
    tipo_vehiculo_id INT NOT NULL,
    disponible BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (tipo_vehiculo_id) REFERENCES TIPOS_VEHICULO(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_codigo (codigo),
    INDEX idx_disponible (disponible)
) ENGINE=InnoDB;

-- 5. Table: TARIFAS
CREATE TABLE IF NOT EXISTS TARIFAS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    tipo_vehiculo_id INT NOT NULL,
    tipo_cobro VARCHAR(50) NOT NULL, -- MINUTO, HORA, DIA, FRACCION
    valor DECIMAL(10, 2) NOT NULL,
    activo BOOLEAN DEFAULT TRUE,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE,
    FOREIGN KEY (tipo_vehiculo_id) REFERENCES TIPOS_VEHICULO(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- 6. Table: REGISTROS
CREATE TABLE IF NOT EXISTS REGISTROS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    placa VARCHAR(20) NOT NULL,
    entrada DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    salida DATETIME,
    minutos INT,
    valor DECIMAL(10, 2),
    estado ENUM('ACTIVO', 'COMPLETADO') DEFAULT 'ACTIVO',
    espacio_id INT, -- To link which space was used
    tipo_vehiculo_id INT, -- Store vehicle type at time of record
    FOREIGN KEY (espacio_id) REFERENCES ESPACIOS(id) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (tipo_vehiculo_id) REFERENCES TIPOS_VEHICULO(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_placa (placa),
    INDEX idx_estado (estado),
    INDEX idx_entrada (entrada)
) ENGINE=InnoDB;

-- 7. Table: TICKETS
CREATE TABLE IF NOT EXISTS TICKETS (
    id INT AUTO_INCREMENT PRIMARY KEY,
    codigo_unico VARCHAR(50) NOT NULL UNIQUE,
    registro_id INT NOT NULL,
    fecha_emision DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (registro_id) REFERENCES REGISTROS(id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Initial Data Seeding

-- Roles
INSERT INTO ROLES (nombre, descripcion) VALUES 
('ADMIN', 'Administrador del sistema'),
('OPERADOR', 'Operador de entrada y salida');

-- Tipos de Vehiculo
INSERT INTO TIPOS_VEHICULO (nombre, descripcion) VALUES 
('Sedan', 'Automóvil estándar'),
('Camioneta', 'Vehículo tipo pickup o SUV'),
('Motocicleta', 'Vehículo de dos ruedas');

-- Espacios (Example: 5 of each for brevity, usually script generates many)
-- Autos (Sedan)
INSERT INTO ESPACIOS (codigo, tipo_vehiculo_id, disponible) VALUES 
('A-01', 1, TRUE), ('A-02', 1, TRUE), ('A-03', 1, TRUE), ('A-04', 1, TRUE), ('A-05', 1, TRUE),
('A-06', 1, TRUE), ('A-07', 1, TRUE), ('A-08', 1, TRUE), ('A-09', 1, TRUE), ('A-10', 1, TRUE);

-- Camionetas
INSERT INTO ESPACIOS (codigo, tipo_vehiculo_id, disponible) VALUES 
('B-01', 2, TRUE), ('B-02', 2, TRUE), ('B-03', 2, TRUE), ('B-04', 2, TRUE), ('B-05', 2, TRUE),
('B-06', 2, TRUE), ('B-07', 2, TRUE), ('B-08', 2, TRUE), ('B-09', 2, TRUE), ('B-10', 2, TRUE);

-- Motos
INSERT INTO ESPACIOS (codigo, tipo_vehiculo_id, disponible) VALUES 
('M-01', 3, TRUE), ('M-02', 3, TRUE), ('M-03', 3, TRUE), ('M-04', 3, TRUE), ('M-05', 3, TRUE),
('M-06', 3, TRUE), ('M-07', 3, TRUE), ('M-08', 3, TRUE), ('M-09', 3, TRUE), ('M-10', 3, TRUE);
