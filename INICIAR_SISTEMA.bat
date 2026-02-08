@echo off
TITLE Sistema de Parqueadero - Iniciar
echo ==========================================
echo   SISTEMA DE GESTION DE PARQUEADERO (SENA)
echo ==========================================
echo.

:: Verificar si Node.js está instalado
node -v >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Node.js no esta instalado o no esta en el PATH.
    echo Por favor, instala Node.js desde https://nodejs.org/
    pause
    exit
)

:: Ir a la carpeta del backend e iniciar
echo [1/2] Iniciando el servidor Backend...
cd backend
start cmd /k "npm start"

echo.
echo [2/2] Abriendo el Frontend en el navegador...
echo El frontend requiere que Apache (XAMPP) este corriendo si lo usas mediante localhost.
echo Si no, puedes abrir el archivo index.html directamente.
timeout /t 3 /nobreak >nul
start http://localhost/PaginaWebHTML/frontend/index.html

echo.
echo [LISTO] El sistema se esta ejecutando.
echo No cierres la ventana negra que se abrio (Backend).
echo.
echo Presiona cualquier tecla para salir de este asistente...
pause >nul
