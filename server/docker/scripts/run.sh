#!/bin/bash

RUNNER=$(ls *-runner.jar)

while ! nc -z db_connect 3306; do
    echo "waiting for godot..."
    sleep 1
done

echo "echo db_connect is available, starting quarkus $RUNNER..."
java -Dquarkus.profile=prod -jar $RUNNER
