#!/bin/bash

set -ex

# copy from build into PackageSource
cp -rva ./headwindsim-aircraft-su100-95/. ./src-a339/project/PackageSources

cd /external/src-a339/project/PackageSources
find . -type f -iname \*.PNG.DDS -delete
find . -type f -iname \*.PNG.DDS.json -delete
