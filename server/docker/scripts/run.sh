#!/bin/bash

RUNNER=$(ls *-runner.jar)

while ! nc -vz localhost 3307; do
    echo "waiting for godot..."
    sleep 1
done

echo "echo db_connect is available, starting quarkus $RUNNER..."
java -Dquarkus.profile=prod -jar $RUNNER
