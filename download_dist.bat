cd src/main/resources/static
if exist dist rmdir /s /q dist
echo %cd%
bitsadmin /transfer vditorDownloadJob https://git.mczhengyi.top/zhengyi/-/packages/npm/@zhengyi%%2Fvditor/3.9.10-beta.3/files/261 %cd%\vditor.tgz
7z x vditor.tgz
7z x vditor.tar
move /y %cd%\package\dist %cd%
rmdir /s /q package
del vditor.tar
del vditor.tgz
pause