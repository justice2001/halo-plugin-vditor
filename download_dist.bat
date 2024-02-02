cd src/main/resources/static
if exist dist rmdir /s /q dist
echo %cd%
bitsadmin /transfer vditorDownloadJob https://registry.npmjs.org/vditor/-/vditor-3.9.9.tgz %cd%\vditor.tgz
7z x vditor.tgz
7z x vditor.tar
move /y %cd%\package\dist %cd%
rmdir /s /q package
del vditor.tar
del vditor.tgz
pause