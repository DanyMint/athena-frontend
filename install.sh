#!/bin/bash
set -a
source .env
set +a



sudo mkdir -p $VITE_BUILD_OUTPUT_PATH
npm i
npm run build

project_path=`pwd`

sudo rm /etc/nginx/sites-enabled/default
sudo ln -s $project_path/nginx/site.conf /etc/nginx/sites-enabled/default
sudo service nginx restart