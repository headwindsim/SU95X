const fragmenter = require('@flybywiresim/fragmenter');
const fs = require('fs');

const execute = async () => {
    try {
        const result = await fragmenter.pack({
            packOptions: { splitFileSize: 102_760_448, keepCompleteModulesAfterSplit: false },
            baseDir: './build-su95x/out/headwindsim-aircraft-su100-95',
            outDir: './build-su95x/out/build-modules',
            modules: [{
                name: 'effects',
                sourceDir: './effects'
            }, {
                name: 'html_ui',
                sourceDir: './html_ui'
            }, {
                name: 'ModelBehaviorDefs',
                sourceDir: './ModelBehaviorDefs'
            }, {
                name: 'Textures',
                sourceDir: './SimObjects/AirPlanes/Headwind_SU95/texture'
            }, {
                name: 'Texture-Armavia',
                sourceDir: './SimObjects/AirPlanes/Headwind_SU95-Armavia'
            }, {
                name: 'Texture-RA89036',
                sourceDir: './SimObjects/AirPlanes/Headwind_SU95-RA89036'
            }, {
                name: 'Texture-RA89105',
                sourceDir: './SimObjects/AirPlanes/Headwind_SU95-RA89105'
            }, {
                name: 'Texture-RA97002',
                sourceDir: './SimObjects/AirPlanes/Headwind_SU95-RA97002'
            }, {
                name: 'Texture-RedWings',
                sourceDir: './SimObjects/AirPlanes/Headwind_SU95-RedWings'
            }, {
                name: 'Texture-Stable',
                sourceDir: './SimObjects/AirPlanes/Headwind_SU95/texture.A32NX_Stable'
            }, {
                name: 'Sound',
                sourceDir: './SimObjects/AirPlanes/Headwind_SU95/sound'
            }, {
                name: 'Sound-AI',
                sourceDir: './SimObjects/AirPlanes/Headwind_SU95/soundai'
            }, {
                name: 'Model',
                sourceDir: './SimObjects/AirPlanes/Headwind_SU95/model'
            }, {
                name: 'Panels',
                sourceDir: './SimObjects/AirPlanes/Headwind_SU95/panel'
            }]
        });
        console.log(result);
        console.log(fs.readFileSync('./build-su95x/out/build-modules/modules.json').toString());
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
};

execute();
