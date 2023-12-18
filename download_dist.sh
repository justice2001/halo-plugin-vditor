#!/bin/zsh

cd src/main/resources/static
pwd
curl -o vditor.tgz \
 https://git.mczhengyi.top/zhengyi/-/packages/npm/@zhengyi%2Fvditor/3.9.7/files/248
tar -xzvf vditor.tgz
mv package/dist .
rm -rf package
rm -f vditor.tgz
