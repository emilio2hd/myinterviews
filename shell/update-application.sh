#!/bin/bash

set -e

printf "Checking for updates...\n"

cd $APP_DIR

git remote update

LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse @{u})
BASE=$(git merge-base @ @{u})

if [ $LOCAL = $REMOTE ]; then
  printf "Up-to-date\n"
elif [ $LOCAL = $BASE ]; then
  printf "Updating...\n"
  git merge origin/master

  printf "Building a new imagem...\n"
  docker-compose build --force-rm web

  printf "Stopping and Removing web container...\n"
  docker-compose stop web
  docker-compose rm --force web

  printf "Creating an updated web container...\n"
  docker-compose up -d web
fi