#!/bin/bash
# TownMate Backend Build and Run Script for Linux/Mac

echo ""
echo "========================================="
echo "   TownMate Backend - Spring Boot"
echo "========================================="
echo ""

if [ -z "$1" ]; then
    echo "Usage:"
    echo "  ./run.sh build     - Build the project"
    echo "  ./run.sh run       - Run the application"
    echo "  ./run.sh clean     - Clean build artifacts"
    echo "  ./run.sh package   - Create JAR file"
    echo ""
    exit 1
fi

# Check if Maven wrapper exists
if [ -f "mvnw" ]; then
    MAVEN_CMD="./mvnw"
else
    MAVEN_CMD="mvn"
fi

case "$1" in
    build)
        echo "Building project..."
        $MAVEN_CMD clean install
        ;;
    run)
        echo "Starting Spring Boot application..."
        $MAVEN_CMD spring-boot:run
        ;;
    clean)
        echo "Cleaning build artifacts..."
        $MAVEN_CMD clean
        ;;
    package)
        echo "Creating JAR package..."
        $MAVEN_CMD clean package
        ;;
    *)
        echo "Unknown command: $1"
        exit 1
        ;;
esac

echo ""
