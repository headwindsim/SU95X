#!/bin/bash

set -ex

#remove directory if it exist
rm -rvf ./build-su95x

# copy from FBW A32NX source and SU95X into one src

mkdir -p ./build-su95x/src
mkdir -p ./build-su95x/out

cp -rva ./flybywire/fbw-a32nx/src/behavior/. ./build-su95x/src/behavior
cp -rva ./flybywire/fbw-a32nx/src/fonts/. ./build-su95x/src/fonts
cp -rva ./flybywire/fbw-a32nx/src/systems/. ./build-su95x/src/systems
cp -rva ./flybywire/fbw-a32nx/src/model/. ./build-su95x/src/model

mkdir -p ./build-su95x/src/wasm
cp -rva ./flybywire/fbw-a32nx/src/wasm/fadec_a320/. ./build-su95x/src/wasm/fadec_su95x
cp -rva ./flybywire/fbw-a32nx/src/wasm/fbw_a320/. ./build-su95x/src/wasm/fbw_su95x
cp -rva ./flybywire/fbw-a32nx/src/wasm/flypad-backend/. ./build-su95x/src/wasm/flypad-backend
cp -rva ./flybywire/fbw-a32nx/src/wasm/systems/. ./build-su95x/src/wasm/systems
cp -va ./flybywire/fbw-a32nx/src/.eslintrc.js ./build-su95x/src/.eslintrc.js

cp -rva ./hdw-su95x/.env ./build-su95x/.env
cp -rva ./hdw-su95x/mach.config.js ./build-su95x/mach.config.js

cp -rva ./hdw-su95x/src/behavior/. ./build-su95x/src/behavior
cp -rva ./hdw-su95x/src/model/. ./build-su95x/src/model
cp -rva ./hdw-su95x/src/systems/. ./build-su95x/src/systems
cp -rva ./hdw-su95x/src/wasm/. ./build-su95x/src/wasm

mkdir -p ./build-su95x/out/headwindsim-aircraft-su100-95
mkdir -p ./build-su95x/out/headwindsim-aircraft-su100-95-lock-highlight

mkdir -p ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/CSS
mkdir -p ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Fonts
mkdir -p ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Images
mkdir -p ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/JS
mkdir -p ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/Airliners
mkdir -p ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X_FlightElements
mkdir -p ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/NavSystems
mkdir -p ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/SU95X_Printer
mkdir -p ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/SU95X_Registration

cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/CSS/. ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/CSS/SU95X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Fonts/fbw-a32nx/. ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Fonts/SU95X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Images/fbw-a32nx/. ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Images/SU95X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/JS/fbw-a32nx/. ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/JS/SU95X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Core ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/SU95X_Core
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Utils ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/SU95X_Utils
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/Airliners/FlyByWire_A320_Neo ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/Airliners/Headwind_SU95X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/FlightElements/. ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X_FlightElements
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/NavSystems/A320_Neo ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/NavSystems/SU95X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Registration/. ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/SU95X_Registration
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Printer/. ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/SU95X_Printer

mkdir -p ./build-su95x/out/headwindsim-aircraft-su100-95/ModelBehaviorDefs/SU95X
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/ModelBehaviorDefs/A32NX/. ./build-su95x/out/headwindsim-aircraft-su100-95/ModelBehaviorDefs/SU95X

# copy base of su95x to out
cp -rva ./hdw-su95x/src/base/headwindsim-aircraft-su100-95/. ./build-su95x/out/headwindsim-aircraft-su100-95
cp -rva ./hdw-su95x/src/base/headwindsim-aircraft-su100-95-lock-highlight/. ./build-su95x/out/headwindsim-aircraft-su100-95-lock-highlight

# copy A32NX default texture
mkdir -p ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/A320NEO_AIRFRAME_DECALS_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/A320NEO_AIRFRAME_FUSELAGE_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/A320NEO_AIRFRAME_GLASS_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/A320NEO_AIRFRAME_LIVERY_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/A320NEO_AIRFRAME_RIBBONS_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/A320NEO_COCKPIT_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/CHOCKS_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/CONE_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/CUP_LOW2_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/DECAL_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/DECALS_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/DECALS2_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/EMERG_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/FLYPAD_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/GLASS* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/HONEYWELLJETWAVE_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/UNTITLED* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/
cp -rva './flybywire/fbw-a32nx/src/textures/decals 4k/A320NEO_COCKPIT_DECALSTEXT_ALBD.TIF-master.dds' ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/texture.A32NX_Stable/A320NEO_COCKPIT_DECALSTEXT_ALBD.TIF.dds

chmod +x ./build-su95x/src/wasm/fbw_su95x/build.sh
chmod +x ./build-su95x/src/wasm/fadec_su95x/build.sh
chmod +x ./build-su95x/src/wasm/flypad-backend/build.sh
