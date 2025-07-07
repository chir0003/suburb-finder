#!/bin/bash
echo "Starting frontend build process..."
echo "Current directory: $(pwd)"
echo "Listing files in current directory:"
ls -la

echo "Installing dependencies..."
npm install

echo "Building React app..."
npm run build

echo "Build completed. Listing build directory:"
ls -la build/

echo "Build process finished!" 