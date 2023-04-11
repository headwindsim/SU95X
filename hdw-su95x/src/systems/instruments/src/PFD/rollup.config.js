'use strict';

import ts from 'rollup-plugin-typescript2';
import resolve from '@rollup/plugin-node-resolve';
import scss from 'rollup-plugin-scss';

const { join } = require('path');

export default {
    input: join(__dirname, 'instrument.tsx'),
    output: {
        dir: '../../../../build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X/PFD',
        format: 'es',
    },
    plugins: [scss(
        { output: '../../../../build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X/PFD/pfd.css' },
    ),
    resolve(), ts()],
};
