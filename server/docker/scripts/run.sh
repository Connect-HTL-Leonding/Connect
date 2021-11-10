#!/bin/bash

RUNNER=$(ls *-runner.jar)

while ! nc -z mysql 3307; do
    echo "waiting for godot..."
    sleep 1
done

echo "echo mysql is available, starting quarkus $RUNNER..."
java -Dquarkus.profile=prod -jar $RUNNER
