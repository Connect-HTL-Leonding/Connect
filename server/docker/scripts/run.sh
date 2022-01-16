#!/bin/bash

RUNNER=$(ls *-runner.jar)

while ! nc -z db_connect 3306 && ! nc -z keycloak 8080; do
    echo "waiting for godot..."
    nc -v keycloak 8080
    sleep 1
done

echo "echo db_connect is available, starting quarkus $RUNNER..."
java -Dquarkus.profile=prod -jar $RUNNER
