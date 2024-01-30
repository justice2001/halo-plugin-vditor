#!/bin/zsh

cd src/main/resources/static
rm -rf dist
pwd
curl -o vditor.tgz \
 https://registry.npmjs.org/vditor/-/vditor-3.9.9.tgz
tar -xzvf vditor.tgz
mv package/dist .
rm -rf package
rm -f vditor.tgz
