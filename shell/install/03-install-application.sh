#!/bin/bash

set -e

printf "Download application dependencies...\n"
sudo apt-get update -qq;
sudo apt-get install -y git

sudo cat > /tmp/docker-compose.yml << "EOF"
db:
  image: postgres:9.4
  container_name: myinterviews-db
  restart: always
  ports:
    - "5432:5432"
  environment:
    - POSTGRES_USER=myinterviews_user
    - POSTGRES_PASSWORD=123456
    - POSTGRES_DB=myinterviews
web:
  container_name: myinterviews-web
  restart: always
  build: .
  ports:
    - "3000:3000"
  environment:
    - APP_DB_HOST=db
    - APP_DB_PORT=5432
    - APP_DB_USER=myinterviews_user
    - APP_DB_PASSWORD=123456
    - SECRET_KEY_BASE=ef8705c8be8bc5c562fd403847e1451d8e149ba4bf88dea34c7e0c99fc55556d3ea3e0619b24ff7399f19c3c0e7798b62ffe643e8a6911cee982e7143ef0e262
  links:
    - db

EOF

sudo mv -f /tmp/docker-compose.yml $APP_DIR/docker-compose.yml

cd $APP_DIR

# It was causing a weird error (ERROR: Couldn't connect to Docker daemon at http+docker://localunixsocket),
# even after execute "sudo usermod -aG docker $USER"
sudo docker-compose --project-name myinterviews build --force-rm web
sudo docker-compose up -d