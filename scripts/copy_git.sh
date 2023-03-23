#!/bin/bash

set -ex

#remove directory if it exist
rm -rvf ./src
rm -rvf ./hdw-su95x/out

# copy from fbw source and su95x into one src
cp -rva ./fbw-a32nx/src/. ./src
cp -rva ./src/fbw_a320 ./src/fbw_su95x
cp -rva ./src/fadec/a320_fadec ./src/fadec/su95_fadec

cp -rva ./hdw-su95x/src/. ./src

mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95-lock-highlight

#make directories inside html_ui
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_JS
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_FONTS
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_CSS
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_Images
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/SU95X_Core
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/SU95X_Utils
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/Airliners/Headwind_SU95X
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X_FlightElements
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/NavSystems/SU95X
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X_MAP
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/SU95X_Registration
mkdir -p ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/SU95X_Printer

# copy html_ui for SU95X
cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/JS/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_JS
cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Fonts/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_FONTS
cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/CSS/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_CSS
cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Images/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_Images
cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Core/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/SU95X_Core
cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Utils/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/SU95X_Utils
cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/A32NX/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X
cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/Airliners/FlyByWire_A320_Neo/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/Airliners/Headwind_SU95X
cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/FlightElements/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X_FlightElements
cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/NavSystems/A320_Neo/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/NavSystems/SU95X
cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/MAP/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X_MAP
cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Registration/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/SU95X_Registration
cp -rva ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/Printer/. ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/SU95X_Printer

# delete unused file to save space
rm -rvf ./src/fbw_a320
rm -rvf ./src/fadec/a320_fadec
rm -rvf ./fbw-a32nx

# copy base of SU95X to out
cp -rva ./hdw-su95x/src/base/headwindsim-aircraft-su100-95/. ./hdw-su95x/out/headwindsim-aircraft-su100-95
cp -rva ./hdw-su95x/src/base/headwindsim-aircraft-su100-95-lock-highlight/. ./hdw-su95x/out/headwindsim-aircraft-su100-95-lock-highlight

chmod +x ./src/fbw_su95x/build.sh
chmod +x ./src/fadec/build.sh
chmod +x ./src/flypad-backend/build.sh
