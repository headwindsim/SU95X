#!/bin/bash

set -ex

#remove directory if it exist
rm -rvf ./src
rm -rvf ./hdw-su95x/out

# copy from fbw source and su95x into one src
cp -rva ./fbw-a32nx/src/. ./src
cp -rva ./src/fbw_a320 ./src/fbw_su95x
rm -rvf ./src/fbw_a320
cp -rva ./src/fadec/a320_fadec ./src/fadec/su95_fadec
rm -rvf ./src/fadec/a320_fadec

cp -rva ./hdw-su95x/src/. ./src

mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95-lock-highlight

cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui

# rename origin to fit for SU95X
mv ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/JS ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_JS
mv ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Fonts ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_FONTS
mv ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/CSS ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_CSS
mv ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Images ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_Images
mv ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/A32NX_Core ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/SU95X_Core
mv ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/A32NX_Utils ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/SU95X_Utils
mv ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/A32NX ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X
mv ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/Airliners/FlyByWire_A320_Neo ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/Airliners/Headwind_SU95X
mv ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/FlightElements ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X_FlightElements
mv ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/NavSystems/A320_Neo ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/NavSystems/SU95X
mv ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/MAP ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X_MAP
mv ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/A32NX_Registration ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/SU95X_Registration
mv ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/Printer ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/SU95X_Printer

# delete unused file to save space
rm -rvf ./fbw-a32nx/flybywire-aircraft-a320-neo
rm -rvf ./fbw-a32nx/src
rm -rvf ./src/base

# copy base of SU95X to out
cp -rva ./hdw-su95x/src/base/headwindsim-aircraft-su100-95/. ./hdw-su95x/out/headwindsim-aircraft-su100-95
cp -rva ./hdw-su95x/src/base/headwindsim-aircraft-su100-95-lock-highlight/. ./hdw-su95x/out/headwindsim-aircraft-su100-95-lock-highlight

chmod +x ./src/fbw_su95x/build.sh
chmod +x ./src/fadec/build.sh
chmod +x ./src/flypad-backend/build.sh
