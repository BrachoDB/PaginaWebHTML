# Guía de Entrega y Configuración 🅿️🚀

Esta guía está diseñada para que tu compañero pueda ejecutar el proyecto en su PC de forma rápida y sin complicaciones.

## Requisitos Previos
1. **Node.js** instalado (versión 14 o superior).
2. **XAMPP** con los módulos **Apache** y **MySQL** activos.

## Pasos para la Configuración

### 1. Preparar la Base de Datos (MySQL)
1. Abre **XAMPP Control Panel**.
2. Presiona "Start" en Apache y MySQL.
3. Presiona el botón "Admin" de MySQL o ve a `http://localhost/phpmyadmin`.
4. Crea una base de datos llamada `parking_system`.
5. Selecciona la base de datos y ve a la pestaña **Importar**.
6. Selecciona el archivo que se encuentra en `backend/database/schema.sql`.

### 2. Configurar el Entorno
1. Entra a la carpeta `backend`.
2. Verifica que exista un archivo llamado `.env`. Si no existe, créalo con este contenido:
   ```env
   PORT=3000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=
   DB_NAME=parking_system
   JWT_SECRET=secreto_sena_2026
   ```
   *(Asegúrate de que `DB_PASSWORD` coincida con tu configuración de XAMPP, usualmente está vacío)*.

### 3. Iniciar el Sistema (Forma Fácil)
Solo tienes que hacer doble clic en el archivo:
👉 **`INICIAR_SISTEMA.bat`**

Este archivo se encargará de:
1. Iniciar el servidor backend.
2. Abrir el frontend en tu navegador predeterminado.

---

## Usuarios de Prueba
| Rol | Usuario | Contraseña |
| :--- | :--- | :--- |
| **Administrador** | `admin@gmail.com` | `admin123` |

---

## 💡 Notas para la Entrega
- He incluido la carpeta `node_modules` para que **no tengas que ejecutar `npm install`**.
- El sistema utiliza `bcryptjs`, lo que garantiza que las contraseñas funcionen sin importar la versión de Windows o Node.js.
- Si el frontend no carga, asegúrate de que la carpeta del proyecto esté dentro de `C:/xampp/htdocs/`.
