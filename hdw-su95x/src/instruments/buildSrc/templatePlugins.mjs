import { join } from 'path';
import instrumentTemplate from '@flybywiresim/rollup-plugin-msfs';
import ecamPageTemplate from '../ecam-page-template/rollup.js';
import { Directories } from './directories.mjs';

export function getTemplatePlugin({ name, config, imports = [], isInstrument }) {
    if (isInstrument) {
        return instrumentTemplate({
            name,
            elementName: `a32nx-${name.toLowerCase()}`,
            config,
            imports,
            outputDir: join(Directories.root, 'hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X'),
        });
    }
    return ecamPageTemplate({
        name,
        outputDir: join(Directories.root, 'hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X/EcamPages'),
    });
}
