@echo off
REM TownMate Backend Build and Run Script for Windows

echo.
echo =========================================
echo   TownMate Backend - Spring Boot
echo =========================================
echo.

if "%1"=="" (
    echo Usage:
    echo   run.bat build     - Build the project
    echo   run.bat run       - Run the application
    echo   run.bat clean     - Clean build artifacts
    echo   run.bat package   - Create JAR file
    echo.
    exit /b 1
)

REM Check if Maven wrapper exists
if exist "mvnw.cmd" (
    set MAVEN_CMD=mvnw.cmd
) else (
    set MAVEN_CMD=mvn
)

if "%1"=="build" (
    echo Building project...
    call %MAVEN_CMD% clean install
    goto end
)

if "%1"=="run" (
    echo Starting Spring Boot application...
    call %MAVEN_CMD% spring-boot:run
    goto end
)

if "%1"=="clean" (
    echo Cleaning build artifacts...
    call %MAVEN_CMD% clean
    goto end
)

if "%1"=="package" (
    echo Creating JAR package...
    call %MAVEN_CMD% clean package
    goto end
)

echo Unknown command: %1

:end
echo.
pause
