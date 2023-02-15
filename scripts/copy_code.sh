#!/bin/bash

set -ex

#remove directory if it exist
rm -rvf ./src/atsu
rm -rvf ./src/behavior
rm -rvf ./src/fadec
rm -rvf ./src/failures
rm -rvf ./src/fbw_a320
rm -rvf ./src/fbw_a380
rm -rvf ./src/fbw_common
rm -rvf ./src/fbw_su95x
rm -rvf ./src/fdr2csv
rm -rvf ./src/flypad-backend
rm -rvf ./src/fmgc
rm -rvf ./src/fonts
rm -rvf ./src/instruments
rm -rvf ./src/sentry-client
rm -rvf ./src/shared
rm -rvf ./src/simbridge-client
rm -rvf ./src/systems
rm -rvf ./src/tcas
rm -rvf ./src/tools

# copy from fbw source and su95x into one src
cp -rva ./fbw-a32nx/src/atsu/ ./src
cp -rva ./fbw-a32nx/src/behavior/ ./src
cp -rva ./fbw-a32nx/src/fadec/ ./src
cp -rva ./fbw-a32nx/src/failures/ ./src
cp -rva ./fbw-a32nx/src/fbw_a320/ ./src
cp -rva ./fbw-a32nx/src/fbw_a380/ ./src
cp -rva ./fbw-a32nx/src/fbw_common/ ./src
cp -rva ./fbw-a32nx/src/fdr2csv/ ./src
cp -rva ./fbw-a32nx/src/flypad-backend/ ./src
cp -rva ./fbw-a32nx/src/fmgc/ ./src
cp -rva ./fbw-a32nx/src/fonts/ ./src
cp -rva ./fbw-a32nx/src/instruments/ ./src
cp -rva ./fbw-a32nx/src/sentry-client/ ./src
cp -rva ./fbw-a32nx/src/shared/ ./src
cp -rva ./fbw-a32nx/src/simbridge-client/ ./src
cp -rva ./fbw-a32nx/src/systems/ ./src
cp -rva ./fbw-a32nx/src/tcas/ ./src
cp -rva ./fbw-a32nx/src/tools/ ./src

cp -rva ./src/fbw_a320 ./src/fbw_su95x

cp -rva ./hdw-su95x/src/atsu/ ./src
cp -rva ./hdw-su95x/src/behavior/ ./src
cp -rva ./hdw-su95x/src/fadec/ ./src/
cp -rva ./hdw-su95x/src/failures/ ./src
cp -rva ./hdw-su95x/src/fbw_su95x/ ./src
cp -rva ./hdw-su95x/src/fdr2csv/ ./src
cp -rva ./hdw-su95x/src/flypad-backend/ ./src/
cp -rva ./hdw-su95x/src/fmgc/ ./src
cp -rva ./hdw-su95x/src/instruments/ ./src
cp -rva ./hdw-su95x/src/sentry-client/ ./src
cp -rva ./hdw-su95x/src/shared/ ./src
cp -rva ./hdw-su95x/src/simbridge-client/ ./src
cp -rva ./hdw-su95x/src/tcas/ ./src
cp -rva ./hdw-su95x/src/tools/ ./src

chmod +x ./src/fbw_su95x/build.sh
chmod +x ./src/fadec/build.sh
chmod +x ./src/flypad-backend/build.sh
