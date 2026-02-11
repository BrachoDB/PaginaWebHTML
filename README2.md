# Sistema de Gestión de Parqueadero 🚗

Este proyecto es una solución completa para la gestión de un parqueadero 24/7, desarrollada como entrega académica. Incluye un Backend robusto (API REST) y un Frontend interactivo.

## 🚀 Tecnologías Usadas

### Backend
-   **Node.js**: Entorno de ejecución.
-   **Express**: Framework web.
-   **MySQL**: Base de datos relacional.
-   **Sequelize**: ORM para manejo de datos.
-   **JWT**: Autenticación segura.
-   **Bcrypt**: Encriptación de contraseñas.

### Frontend
-   **HTML5 / CSS3**: Estructura y diseño responsivo.
-   **JavaScript (Vanilla)**: Lógica de cliente y consumo de API.

## 📋 Requisitos Previos

-   Node.js (v14 o superior)
-   MySQL Server
-   Git

## ⚙️ Instalación y Configuración

Sigue estos pasos para desplegar el proyecto localmente:

1.  **Clonar el repositorio** (o descargar el código):
    ```bash
    git clone <url-del-repo>
    cd <carpeta-del-proyecto>
    ```

2.  **Configurar Base de Datos**:
    -   Crea una base de datos vacía en MySQL llamada `parking_system`.
    -   Puedes usar el script `backend/database/schema.sql` si prefieres hacerlo manualmente, pero el seed script lo hará por ti.

3.  **Configurar Backend**:
    -   Ve a la carpeta `backend`:
        ```bash
        cd backend
        npm install
        ```
    -   Crea un archivo `.env` basado en `.env.example`:
        ```env
        PORT=3000
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=tu_contraseña
        DB_NAME=parking_system
        JWT_SECRET=mi_secreto_super_seguro
        ```
    -   **Inicializar Datos (Seed)**:
        Ejecuta este comando para crear las tablas y usuarios por defecto:
        ```bash
        npm run seed
        ```
    -   **Iniciar Servidor**:
        ```bash
        npm run dev
        ```
        El servidor correrá en `http://localhost:3000`.

4.  **Configurar Frontend**:
    -   Ve a la carpeta `frontend`.
    -   Abre `index.html` en tu navegador.
    -   **Recomendación**: Usa un servidor local (como Live Server en VS Code o `http-server`) para evitar errores de CORS.
        ```bash
        npx http-server frontend
        ```

## 🔑 Credenciales de Prueba

El sistema viene con los siguientes usuarios pre-creados:

**Módulo Administrativo**
-   **Usuario**: `admini@gmail.com`
-   **Contraseña**: `admin123`
-   **Rol**: ADMIN (Gestión total)

**Módulo Operativo**
-   **Usuario**: Debes crearlo desde el panel de Admin primero.
-   **Rol**: OPERATOR (Entradas/Salidas)

## 📖 Guía de Uso

1.  **Login**: Ingresa con las credenciales de Admin.
2.  **Panel Admin**:
    -   Crea un usuario nuevo con rol `OPERATOR`.
    -   Revisa o ajusta las Tarifas.
3.  **Panel Operador** (Ingresa con el nuevo usuario):
    -   **Registrar Entrada**: Haz clic en un espacio disponible (verde). Ingresa placa y tipo.
    -   **Ver Ocupación**: El tablero se actualiza en tiempo real.
    -   **Registrar Salida**: Haz clic en un espacio ocupado (rojo). El sistema calculará el costo total.
    -   **Confirmar Pago**: Se genera un ticket y se libera el espacio.


## 🐘 Probando con XAMPP

Si tienes XAMPP instalado, puedes usarlo para la base de datos y/o el frontend.

### 1. Base de Datos (MySQL)
1.  Abre **XAMPP Control Panel** y arranca **MySQL**.
2.  Ve a `http://localhost/phpmyadmin`.
3.  Crea una base de datos nueva llamada `parking_system`.
4.  En la carpeta `backend`, edita el archivo `.env`:
    ```env
    DB_HOST=localhost
    DB_USER=root
    DB_PASSWORD=      <-- Déjalo vacío si es la config por defecto de XAMPP
    DB_NAME=parking_system
    ```
5.  Ejecuta `npm run seed` en la terminal (dentro de `backend/`) para crear las tablas.

### 2. Frontend (Servidor Web)
Opción A (Recomendada): Usar `http-server` como se indica arriba.
Opción B (XAMPP Apache):
1.  Copia la carpeta `frontend` dentro de `C:\xampp\htdocs\`.
2.  Renómbrala si quieres, ej: `C:\xampp\htdocs\parking`.
3.  Arranca **Apache** en XAMPP.
4.  Accede a `http://localhost/parking` en tu navegador.

**Nota**: El Backend (Node.js) **siempre** debe correrse en una terminal aparte con `npm start`, XAMPP no ejecuta Node.js.


---
**Entrega Académica - 2026**
