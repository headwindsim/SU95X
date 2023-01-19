#!/bin/bash

set -ex

#copy and rename effect file when it is changed. Still need to change the texture file name inside the fx file manually
rm -rvf ./headwindsim-aircraft-su100-95/effects

cp -rva ./a32nx/flybywire-aircraft-a320-neo/effects/. ./headwindsim-aircraft-su100-95/effects

for nam in ./headwindsim-aircraft-su100-95/effects/*A32NX*.fx
do
    newname=${nam/A32NX/A339}
    mv $nam $newname
done

for nam in ./headwindsim-aircraft-su100-95/effects/texture/*A32NX*
do
    newname=${nam/A32NX/A339}
    mv $nam $newname
done
