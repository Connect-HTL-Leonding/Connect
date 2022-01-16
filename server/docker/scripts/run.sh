#!/bin/bash

RUNNER=$(ls *-runner.jar)

while ! nc -z db_connect 3306 && ! curl --output /dev/null --silent --head --fail "http://keycloak:8080/auth"; do
    echo "waiting for godot..."
    nc -v keycloak 8080
    sleep 1
done

echo "echo db_connect is available, starting quarkus $RUNNER..."
java -Dquarkus.profile=prod -jar $RUNNER
