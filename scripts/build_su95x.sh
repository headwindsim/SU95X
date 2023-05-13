#!/bin/bash

set -ex

# store current file ownership
ORIGINAL_USER_ID=$(stat -c '%u' /external)
ORIGINAL_GROUP_ID=$(stat -c '%g' /external)

# set ownership to root to fix cargo/rust build (when run as github action)
if [ "${GITHUB_ACTIONS}" == "true" ]; then
  chown -R root:root /external
fi

# Loop through the arguments
for arg in "$@"; do
  if [ "$arg" == "--no-cache" ]; then
    echo "Removing out directory /external/build-su95x/out"
    rm -rf /external/build-su95x/out
  fi
done

# run build
time npx igniter -r su95x "$@"

if [ "${GITHUB_ACTIONS}" == "true" ]; then
  rm -rf /external/flybywire
  rm -rf /external/hdw-su95x/src
  rm -rf /external/build-su95x/src
fi

# restore ownership (when run as github action)
if [ "${GITHUB_ACTIONS}" == "true" ]; then
  chown -R ${ORIGINAL_USER_ID}:${ORIGINAL_GROUP_ID} /external
fi
