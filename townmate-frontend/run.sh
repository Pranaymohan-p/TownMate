#!/bin/bash
# TownMate Frontend Build and Run Script for Linux/Mac

echo ""
echo "========================================="
echo "   TownMate Frontend - React + Vite"
echo "========================================="
echo ""

if [ -z "$1" ]; then
    echo "Usage:"
    echo "  ./run.sh install   - Install dependencies"
    echo "  ./run.sh dev       - Start development server"
    echo "  ./run.sh build     - Build for production"
    echo "  ./run.sh preview   - Preview production build"
    echo "  ./run.sh lint      - Run ESLint"
    echo ""
    exit 1
fi

case "$1" in
    install)
        echo "Installing dependencies..."
        npm install
        ;;
    dev)
        echo "Starting development server..."
        npm run dev
        ;;
    build)
        echo "Building for production..."
        npm run build
        ;;
    preview)
        echo "Previewing production build..."
        npm run preview
        ;;
    lint)
        echo "Running ESLint..."
        npm run lint
        ;;
    *)
        echo "Unknown command: $1"
        exit 1
        ;;
esac

echo ""
