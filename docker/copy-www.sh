#!/usr/bin/env bash

#script is used during ci/cd to assembly the web component to the folder where docker images are built.

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
BASE_DIR=$(dirname $SCRIPT_DIR)
DIST=$BASE_DIR/docker

echo "copy www files to $DIST"

pushd $BASE_DIR
mkdir -p $DIST/html/
#cp -r ./www/docker/* $DIST
ls -ld ../application/application
cp -r ../application/application/www/* $DIST/html/
ls -ld $DIST
ls -ld $DIST/html
popd