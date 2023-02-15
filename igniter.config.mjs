import { ExecTask, TaskOfTasks } from '@flybywiresim/igniter';
import { getInstrumentsIgniterTasks } from './src/instruments/buildSrc/igniter/tasks.mjs';

export default new TaskOfTasks('su95x', [
    new TaskOfTasks('preparation', [
        new ExecTask('efb-translation', 'npm run build:efb-translation'),
    ]),

    new TaskOfTasks('wasm', [
        new ExecTask('systems', [
            'cargo build -p a320_systems_wasm --target wasm32-wasi --release',
            'wasm-opt -O1 -o hdw-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/panel/systems.wasm target/wasm32-wasi/release/a320_systems_wasm.wasm',
        ], ['src/systems', 'Cargo.lock', 'Cargo.toml', 'hdw-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/panel/systems.wasm']),
        new ExecTask('systems-autopilot', [
            'src/fbw_su95x/build.sh',
            'wasm-opt -O1 -o hdw-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/panel/fbw.wasm hdw-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/panel/fbw.wasm'
        ], ['src/fbw_su95x', 'src/fbw_common', 'hdw-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/panel/fbw.wasm']),
        new ExecTask('systems-fadec', [
            'src/fadec/build.sh',
            'wasm-opt -O1 -o hdw-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/panel/fadec.wasm hdw-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/panel/fadec.wasm'
        ], ['src/fadec', 'src/fbw_common', 'hdw-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/panel/fadec.wasm']),
        new ExecTask('flypad-backend', [
            'src/flypad-backend/build.sh',
            'wasm-opt -O1 -o hdw-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/panel/flypad-backend.wasm hdw-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/panel/flypad-backend.wasm'
        ], ['src/flypad-backend', 'hdw-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/panel/flypad-backend.wasm']),
    ], true),

    new TaskOfTasks('build', [
        new TaskOfTasks('instruments',
            [...getInstrumentsIgniterTasks(),
                new ExecTask('pfd',
                    'npm run build:pfd',
                    ['src/instruments/src/PFD','hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X/PFD']
                )
            ],
            true),
        new ExecTask('atsu','npm run build:atsu', ['src/atsu', 'hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_JS/atsu']),
        new ExecTask('sentry-client','npm run build:sentry-client', ['src/sentry-client', 'hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_JS/sentry-client']),
        new ExecTask('failures','npm run build:failures', ['src/failures', 'hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_JS/generated/failures.js']),
        new ExecTask('behavior','node src/behavior/build.js', ['src/behavior', 'hdw-su95x/out/headwindsim-aircraft-su100-95/ModelBehaviorDefs/SU95X/generated']),
        new ExecTask('model','node src/model/build.js', ['src/model', 'hdw-su95x/out/headwindsim-aircraft-su100-95/SimObjects/Airplanes/Headwind_SU95/model']),
        new ExecTask('fmgc','npm run build:fmgc', ['src/fmgc', 'hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_JS/fmgc']),
        new TaskOfTasks('simbridge', [
            new ExecTask('client', ['npm run build:simbridge-client'], ['src/simbridge-client', 'hdw-su95x/out/headwindsim-aircraft-su100-95/html_ui/SU95X_JS/simbridge-client']),
        ]),
    ], true),

    new TaskOfTasks('dist', [
        new ExecTask('metadata', 'node scripts/metadata.js hdw-su95x/out/headwindsim-aircraft-su100-95 SU95X'),
        new ExecTask('manifests', 'node scripts/build.js'),
    ]),
]);
