#!/bin/bash
set -e

echo "Waiting database be available"

MAX_TRIES=10
TRIES=0
until nc -z "$APP_DB_HOST" "$APP_DB_PORT"; do
    sleep 2
    TRIES=$(($TRIES + 1))
    if [ "$TRIES" = "$MAX_TRIES" ]; then
        echo "The max of $MAX_TRIES tries has been reached."
        exit 1
    fi
done

echo "Database is ready. Running migration..."

bundle exec rake db:migrate

rails server -b 0.0.0.0