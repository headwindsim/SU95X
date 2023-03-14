#!/bin/bash

set -ex

# copy from fbw source and su95x into one src
cp -rvau ./fbw-a32nx/src/. ./src
cp -rvau ./src/fbw_a320 ./src/fbw_su95x
cp -rvau ./src/fadec/a320_fadec ./src/fadec/su95_fadec

cp -rvau ./hdw-su95x/src/. ./src

# copy html_ui for SU95X
cp -rvau ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/JS ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_JS
cp -rvau ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Fonts ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_FONTS
cp -rvau ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/CSS ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_CSS
cp -rvau ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Images ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_Images
cp -rvau ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Core ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/SU95X_Core
cp -rvau ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Utils ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/SU95X_Utils
cp -rvau ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/A32NX ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X
cp -rvau ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/Airliners/FlyByWire_A320_Neo ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/Airliners/Headwind_SU95X
cp -rvau ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/FlightElements ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X_FlightElements
cp -rvau ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/NavSystems/A320_Neo ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/NavSystems/SU95X
cp -rvau ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/MAP ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X_MAP
cp -rvau ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Registration ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/SU95X_Registration
cp -rvau ./fbw-a32nx/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/Printer ./hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/SU95X_Printer

# copy base of SU95X to out
cp -rvau ./hdw-su95x/src/base/headwindsim-aircraft-su100-95/. ./hdw-su95x/out/headwindsim-aircraft-su100-95
cp -rvau ./hdw-su95x/src/base/headwindsim-aircraft-su100-95-lock-highlight/. ./hdw-su95x/out/headwindsim-aircraft-su100-95-lock-highlight
