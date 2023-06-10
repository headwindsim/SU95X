[![GitHub latest release version](https://img.shields.io/github/v/release/headwindsim/SU95X.svg?style=for-the-badge)](https://github.com/headwindsim/SU95X/releases/latest)
[![Github All Releases download count](https://img.shields.io/github/downloads/headwindsim/SU95X/total?style=for-the-badge)](https://github.com/headwindsim/SU95X/releases/latest)
[![GitHub contributors](https://img.shields.io/github/contributors/headwindsim/SU95X.svg?style=for-the-badge)](https://github.com/headwindsim/SU95X/graphs/contributors)

[![Discord](https://img.shields.io/discord/965000103150645258?label=Discord&style=for-the-badge)](https://discord.com/invite/UxWy8C6kgv)

# Headwind SU95X - Sukhoi Superjet 100-95

Welcome to the Headwind SU95X Project! This is the open source project of the Sukhoi Superjet 100-95 in Microsoft Flight Simulator and is mainly based on the FlyByWire A32NX. If you only want to use the aircraft in MSFS please download the Addon here: headwindsim.net

## How to build
Make sure docker are isntalled. Prefferably with WSL2 backend.

#### 1. First, run following command on powershell. This will install the A32NX docker images and node modules.

For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/setup.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/setup.sh
```
#### 2. As next step we will copy the original source files and copy-over our source files.

For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/copy.sh
```
For Git Bash/Linux:
```shell
./scripts/copy.sh
```

#### 3. Build all A32NX module by running following command on powershell.

For powershell:
```shell
.\scripts\dev-env\run.cmd ./scripts/build_su95x.sh
```
For Git Bash/Linux:
```shell
./scripts/dev-env/run.sh ./scripts/build_su95x.sh
```

#### 4. The package is now ready to use. Copy the folder "headwind-aircraft-a330-900" to your CommunityPackage folder in MSFS.

#### (Optional) For faster development create sympolic link from the plane output to the MSFS community folder.
```shell
mklink /J "C:\path\to\community\folder\headwindsim-aircraft-su100-95" "C:\path\to\cloned\repo\hdw-su95x\out\headwindsim-aircraft-su100-95"
mklink /J "C:\path\to\community\folder\headwindsim-aircraft-su100-95-lock-highlight" "C:\path\to\cloned\repo\hdw-su95x\out\headwindsim-aircraft-su100-95-lock-highlight"
```

## Open source
Open Source Projects contributing to the realisation of this:

Systems, cockpit, cockpit texture, sound : FlyByWire - https://github.com/flybywiresim

## Licences

The contents of distribution packages built from the sources in this repository are licensed as follows:

- in the case of original source code from the SSJ project and FBW, or compiled binaries generated from it, under GPLv3.
- in the case of FBW texture, graphics or 3D assets, under CC BY-NC 4.0.
- in the case of assets covered by the "Game Content Usage Rules", under the license granted by those rules.
- in the case of original or modified exterior 3D model, graphics, sound or 3D assets created by Edgar Guinart Lopez, under proprietary freeware license

Microsoft Flight Simulator © Microsoft Corporation. The Headwind SU95X was created under Microsoft's "Game Content Usage Rules" using assets from Microsoft Flight Simulator 2020, and it is not endorsed by or affiliated with Microsoft.

Microsoft Flight Simulator © Microsoft Corporation. The FlyByWire Simulations A32NX was created under Microsoft's "Game Content Usage Rules" using assets from Microsoft Flight Simulator, and it is not endorsed by or affiliated with Microsoft.

This project are not affiliated, associated, authorized, endorsed by, or in any way officially connected with the United Aircraft Corporation, Irkut, Sukhoi, or any of its subsidiaries or its affiliates.
