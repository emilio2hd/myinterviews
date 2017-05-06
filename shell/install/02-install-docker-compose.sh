#!/bin/bash

set -e

printf "Checking docker-compose...\n"
if ! command -v docker-compose >/dev/null; then
    printf "Downloading docker-compose-%s-%s...\n" `uname -s` `uname -m`
    curl -sS -L https://github.com/docker/compose/releases/download/1.12.0/docker-compose-`uname -s`-`uname -m` > /tmp/docker-compose

    sudo mv /tmp/docker-compose /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose

    docker-compose --version
    printf "Done\n"
fi