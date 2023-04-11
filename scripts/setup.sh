#!/bin/bash

set -ex

# initialize submodule (a32nx)
git submodule update --init --recursive

cd fbw-a32nx/fbw-common/msfs-avionics-mirror/src/msfstypes
npm pack
cd ../sdk
rm -rf node_modules
rm -rf build
npm ci
npm run build
cp package.json build/
cd build
npm pack

cd /external
rm -rf node_modules
npm ci