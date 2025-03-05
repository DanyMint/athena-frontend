#!/bin/bash
read -p "The full path to build the project (Press [ENTER] for default: /var/www/athena): " BUILD_OUTPUT_PATH
BUILD_OUTPUT_PATH=${BUILD_OUTPUT_PATH:-/var/www/athena}

read -p "Backend URL with protocol (for example, http://192.168.100.250/api/): " BACKEND_API_URL
if [[ -z "$BACKEND_API_URL" ]]; then
    echo "Error: Backend URL cannot be empty!"
    exit 1
fi

echo "VITE_BUILD_OUTPUT_PATH=$BUILD_OUTPUT_PATH" > .env
echo "VITE_BACKEND_API_URL=\"$BACKEND_API_URL\"" >> .env

echo "Environment variables saved to .env:"
cat .env

sudo mkdir -p $BUILD_OUTPUT_PATH
npm i
npm run build
