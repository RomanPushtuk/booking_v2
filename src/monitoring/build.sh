#!/bin/bash

# Change directory to client
cd client || { echo "Failed to change directory to client"; exit 1; }

# Run npm run build
npm run build || { echo "Build error in client"; exit 1; }

# Go back one level up
cd ..

# Change directory to server
cd server || { echo "Failed to change directory to server"; exit 1; }

# Run npm run build
npm run build || { echo "Build error in server"; exit 1; }

# Move index.html from client/dist to server/dist
mv ../client/dist/index.html dist/ || { echo "Error moving the file"; exit 1; }

echo "Done."
