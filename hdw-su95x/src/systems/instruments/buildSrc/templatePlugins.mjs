import { join } from 'path';
import instrumentTemplate from '@flybywiresim/rollup-plugin-msfs';
import { Directories } from './directories.mjs';

export function getTemplatePlugin({ name, config, imports = [] }) {
    return instrumentTemplate({
        name,
        elementName: `a32nx-${name.toLowerCase()}`,
        config,
        imports,
        outputDir: join(Directories.root, 'build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X'),
    });
}
