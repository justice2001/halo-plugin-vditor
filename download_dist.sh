#!/bin/bash
VDITOR_VERSION="3.11.2"

cd src/main/resources/static
rm -rf dist
pwd
curl -o vditor.tgz \
 https://registry.npmjs.org/vditor/-/vditor-${VDITOR_VERSION}.tgz
tar -xzvf vditor.tgz
mv package/dist .
rm -rf package
rm -f vditor.tgz
