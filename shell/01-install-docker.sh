#!/bin/bash

set -e

printf "Checking docker...\n"
if ! command -v docker >/dev/null; then
    printf "Installing docker...\n"
    sudo curl -sSL https://get.docker.com/ | sudo sh

    printf "Configuring docker...\n"
    sudo usermod -aG docker $USER
    sudo service docker restart

    docker --version
    printf "Done\n"
fi