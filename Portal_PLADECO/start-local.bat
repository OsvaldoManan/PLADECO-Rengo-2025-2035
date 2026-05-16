@echo off
REM ════════════════════════════════════════════════════
REM  PLADECO Rengo · Servidor local de desarrollo
REM ════════════════════════════════════════════════════
title PLADECO Rengo - Servidor Local

cd /d "%~dp0"

echo.
echo ====================================================
echo  PLADECO Rengo 2025-2035 - Servidor Local
echo ====================================================
echo.

REM Mata cualquier proceso Python que este en el puerto 8000
echo [1/3] Liberando puerto 8000 si esta ocupado...
for /f "tokens=5" %%a in ('netstat -ano ^| findstr ":8000.*LISTENING"') do (
    echo     Cerrando proceso PID %%a
    taskkill /F /PID %%a >nul 2>&1
)

REM Espera medio segundo
ping -n 1 127.0.0.1 >nul

echo [2/3] Iniciando servidor Python en puerto 8000...
echo.
echo Portal disponible en:
echo     http://localhost:8000/
echo.
echo Si tienes problemas de cache, abre primero:
echo     http://localhost:8000/clear-cache.html
echo.
echo Presiona Ctrl+C para detener el servidor.
echo ====================================================
echo.

REM Abre el navegador en clear-cache.html para forzar limpieza al inicio
start "" "http://localhost:8000/clear-cache.html"

REM Inicia el servidor (Python 3)
python -m http.server 8000

REM Si Python falla, prueba con py
if errorlevel 1 (
    echo.
    echo Python no encontrado, probando con 'py'...
    py -m http.server 8000
)

pause
