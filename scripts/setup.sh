#!/bin/bash

set -ex

# Disable safe directory warning
git config --global --add safe.directory "*"

# initialize submodule (a32nx)
git submodule update --init --recursive

cd flybywire/fbw-common/msfs-avionics-mirror/src/msfstypes
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
