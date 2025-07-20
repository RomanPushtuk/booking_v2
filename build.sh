#!/bin/bash

set -e  # Exit immediately if any command exits with a non-zero status

echo "Starting build script..."

# Function to check if a directory exists; if not, create it
ensure_dir() {
  if [ ! -d "$1" ]; then
    echo "Directory '$1' does not exist. Creating it..."
    mkdir -p "$1"
  fi
}

# Build monitoring app
echo "Building monitoring app..."
if [ ! -d "./monitoring" ]; then
  echo "Error: Directory './monitoring' does not exist."
  exit 1
fi
	cd ./monitoring
if ! bash ./build.sh; then
  echo "Error: Build failed in ./monitoring"
  exit 1
fi

cd ..

# Prepare monitoring target directory
MONITORING_TARGET="./backend/src/monitoring"
ensure_dir "$MONITORING_TARGET"
echo "Clearing old monitoring build at $MONITORING_TARGET"
rm -rf "$MONITORING_TARGET"/*
echo "Copying new monitoring build files..."
cp -r ./monitoring/server/dist/* "$MONITORING_TARGET"/

# Build client app
echo "Building client app..."
if [ ! -d "./client" ]; then
  echo "Error: Directory './client' does not exist."
  exit 1
fi
	cd ./client
if ! bash ./build.sh; then
  echo "Error: Build failed in ./client"
  exit 1
fi

cd ..

# Prepare client target directory
CLIENT_TARGET="./backend/src/gateway/client"
ensure_dir "$CLIENT_TARGET"
echo "Clearing old client build at $CLIENT_TARGET"
rm -rf "$CLIENT_TARGET"/*
echo "Copying new client build files..."
cp -r ./client/dist/* "$CLIENT_TARGET"/

echo "Build and deploy completed successfully."
