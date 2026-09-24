@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ============================================
echo   LOLLIFLIX PRO - Gerar instalador (Windows)
echo ============================================
echo.
if not exist "node_modules" (
  echo Instalando dependencias ^(primeira vez, pode demorar^)...
  call npm install
)
echo Gerando o instalador...
call npm run dist
echo.
echo ============================================
echo  Pronto! O instalador esta na pasta "dist"
echo  ^(ex.: dist\LOLLIFLIX PRO Setup 1.0.0.exe^)
echo ============================================
pause
