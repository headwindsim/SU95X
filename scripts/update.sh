#!/bin/bash

set -ex

# copy from FBW A32NX source and SU95X into one src
cp -rvau ./flybywire/fbw-a32nx/src/behavior/. ./build-su95x/src/behavior
cp -rvau ./flybywire/fbw-a32nx/src/fonts/. ./build-su95x/src/fonts
cp -rvau ./flybywire/fbw-a32nx/src/systems/. ./build-su95x/src/systems
cp -rvau ./flybywire/fbw-a32nx/src/wasm/fadec_a320/. ./build-su95x/src/wasm/fadec_su95x
cp -rvau ./flybywire/fbw-a32nx/src/wasm/fbw_a320/. ./build-su95x/src/wasm/fbw_su95x
cp -rvau ./flybywire/fbw-a32nx/src/wasm/flypad-backend/. ./build-su95x/src/wasm/flypad-backend
cp -rvau ./flybywire/fbw-a32nx/src/wasm/systems/. ./build-su95x/src/wasm/systems

# cp -rvau ./hdw-su95x/.env ./build-su95x/.env
# cp -rvau ./hdw-su95x/mach.config.js ./build-su95x/mach.config.js

cp -rvau ./hdw-su95x/src/behavior/. ./build-su95x/src/behavior
cp -rvau ./hdw-su95x/src/model/. ./build-su95x/src/model
cp -rvau ./hdw-su95x/src/systems/. ./build-su95x/src/systems
cp -rvau ./hdw-su95x/src/wasm/. ./build-su95x/src/wasm

cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/CSS/. ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/CSS/su95x
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Fonts/fbw-a32nx/. ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Fonts/su95x
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Images/fbw-a32nx/. ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Images/su95x
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/JS/fbw-a32nx/. ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/JS/su95x
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Core ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/su95x_Core
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/A32NX_Utils ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/su95x_Utils
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/Airliners/FlyByWire_A320_Neo ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/Airliners/Headwind_su95x
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/FlightElements ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/FlightElements/su95x
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VCockpit/Instruments/NavSystems/A320_Neo ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/NavSystems/su95x
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Registration ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/Registration/su95x
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/html_ui/Pages/VLivery/Liveries/A32NX_Printer ./build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VLivery/Liveries/Printer/su95x

# copy base of su95x to out
cp -rvau ./hdw-su95x/src/base/headwindsim-aircraft-su100-95/. ./build-su95x/out/headwindsim-aircraft-su100-95
cp -rvau ./hdw-su95x/src/base/headwindsim-aircraft-su100-95-lock-highlight/. ./build-su95x/out/headwindsim-aircraft-su100-95-lock-highlight

# copy A32NX default texture
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/A320NEO_AIRFRAME_DECALS_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/A320NEO_AIRFRAME_FUSELAGE_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/A320NEO_AIRFRAME_GLASS_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/A320NEO_AIRFRAME_LIVERY_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/A320NEO_AIRFRAME_RIBBONS_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/A320NEO_COCKPIT_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/CHOCKS_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/CONE_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/CUP_LOW2_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/DECAL_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/DECALS_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/DECALS2_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/EMERG_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/FLYPAD_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/GLASS* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/HONEYWELLJETWAVE_* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
cp -rvau ./flybywire/fbw-a32nx/src/base/flybywire-aircraft-a320-neo/SimObjects/AirPlanes/FlyByWire_A320_NEO/TEXTURE/UNTITLED* ./build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_stable/
