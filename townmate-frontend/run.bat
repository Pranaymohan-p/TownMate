@echo off
REM TownMate Frontend Build and Run Script for Windows

echo.
echo =========================================
echo   TownMate Frontend - React + Vite
echo =========================================
echo.

if "%1"=="" (
    echo Usage:
    echo   run.bat install   - Install dependencies
    echo   run.bat dev       - Start development server
    echo   run.bat build     - Build for production
    echo   run.bat preview   - Preview production build
    echo   run.bat lint      - Run ESLint
    echo.
    exit /b 1
)

if "%1"=="install" (
    echo Installing dependencies...
    call npm install
    goto end
)

if "%1"=="dev" (
    echo Starting development server...
    call npm run dev
    goto end
)

if "%1"=="build" (
    echo Building for production...
    call npm run build
    goto end
)

if "%1"=="preview" (
    echo Previewing production build...
    call npm run preview
    goto end
)

if "%1"=="lint" (
    echo Running ESLint...
    call npm run lint
    goto end
)

echo Unknown command: %1

:end
echo.
pause
