#!/bin/bash

set -ex

# Disable safe directory warning
git config --global --add safe.directory "*"

# initialize submodule (a32nx)
git submodule update --init --recursive

cd /external
rm -rf node_modules
npm ci
