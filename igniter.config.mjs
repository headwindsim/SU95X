import { ExecTask, TaskOfTasks } from "@flybywiresim/igniter";
import { getInstrumentsIgniterTasks } from "./build-su95x/src/systems/instruments/buildSrc/igniter/tasks.mjs";

export default new TaskOfTasks("all", [
    // SU95X Task
    new TaskOfTasks("su95x", [
        // Prepare the out folder and any other pre tasks.
        // Currently, these can be run in parallel but in the future, we may need to run them in sequence if there are any dependencies.
        new TaskOfTasks("preparation", [
            //new ExecTask("copy-base-files", "npm run build-su95x:copy-base-files"),
            new TaskOfTasks("localization", [
                new ExecTask("efb-translation", "npm run build-su95x:efb-translation"),
                new ExecTask("locPak-translation", "npm run build-su95x:locPak-translation")
            ], true),
        ], false),

        // Group all typescript and react build tasks together.
        new TaskOfTasks("build", [
            new ExecTask("model",
                "npm run build-su95x:model",
                [
                    "build-su95x/src/model",
                    "build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/model"
                ]),
            new ExecTask("behavior",
                "npm run build-su95x:behavior",
                [
                    "build-su95x/src/behavior",
                    "build-su95x/out/headwindsim-aircraft-su100-95/ModelBehaviorDefs/SU95X/generated"
                ]),

                new TaskOfTasks('atsu', [
                    new ExecTask(
                        'common',
                        'npm run build-su95x:atsu-common',
                        [
                            'build-su95x/src/systems/atsu/common',
                            'build-su95x/out/headwindsim-aircraft-su100-95/html_ui/JS/SU95X/atsu/common.js'
                        ]
                    ),
                    new ExecTask(
                        'fmsclient',
                        'npm run build-su95x:atsu-fms-client',
                        [
                            'build-su95x/src/systems/atsu/common',
                            'build-su95x/src/systems/atsu/fmsclient',
                            'build-su95x/out/headwindsim-aircraft-su100-95/html_ui/JS/SU95X/atsu/fmsclient.js'
                        ]
                    ),
                ]),
                new ExecTask(
                    'extras-host',
                    'npm run build-su95x:extras-host',
                    [
                        'build-su95x/src/systems/extras-host',
                        'build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X/ExtrasHost'
                    ]
                ),
                new ExecTask("failures",
                "npm run build-su95x:failures",
                [
                    "build-su95x/src/systems/failures",
                    "build-su95x/out/headwindsim-aircraft-su100-95/html_ui/JS/SU95X/failures/failures.js"
                ]),
            new ExecTask("fmgc",
                "npm run build-su95x:fmgc",
                [
                    "build-su95x/src/systems/fmgc",
                    "build-su95x/out/headwindsim-aircraft-su100-95/html_ui/JS/SU95X/fmgc"
                ]),
            new ExecTask("sentry-client",
                "npm run build-su95x:sentry-client",
                [
                    "build-su95x/src/systems/sentry-client",
                    "build-su95x/out/headwindsim-aircraft-su100-95/html_ui/JS/SU95X/sentry-client"
                ]),
            new ExecTask("simbridge-client",
                "npm run build-su95x:simbridge-client",
                [
                    "build-su95x/src/systems/simbridge-client",
                    "build-su95x/out/headwindsim-aircraft-su100-95/html_ui/JS/SU95X/simbridge-client"
                ]),
                new ExecTask(
                    'systems-host',
                    'npm run build-su95x:systems-host',
                    [
                        'build-su95x/src/systems/systems-host',
                        'flybywire/fbw-common/src/systems/datalink',
                        'build-su95x/out/headwindsim-aircraft-su100-95/html_ui/Pages/VCockpit/Instruments/SU95X/SystemsHost'
                    ]
                ),
                new ExecTask("tcas",
                "npm run build-su95x:tcas",
                [
                    "build-su95x/src/systems/tcas",
                    "build-su95x/out/headwindsim-aircraft-su100-95/html_ui/JS/SU95X/tcas"
                ]),

                new TaskOfTasks("instruments", getInstrumentsIgniterTasks(), true),
        ], true),

        // Group all WASM build tasks together but separate from the rest of the tasks as build run more stable like this.
        new TaskOfTasks("wasm", [
            new ExecTask("systems",
                "npm run build-su95x:systems",
                [
                    "build-su95x/src/wasm/systems",
                    "flybywire/fbw-common/src/wasm/systems",
                    "Cargo.lock",
                    "Cargo.toml",
                    "build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/panel/systems.wasm"
                ]),
            new ExecTask("systems-fadec",
                "npm run build-su95x:fadec",
                [
                    "build-su95x/src/wasm/fadec_su95x",
                    "flybywire/fbw-common/src/wasm/fbw_common",
                    "flybywire/fbw-common/src/wasm/fadec_common",
                    "build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/panel/fadec.wasm"
                ]),
            new ExecTask("systems-fbw",
                "npm run build-su95x:fbw",
                [
                    "build-su95x/src/wasm/fbw_su95x",
                    "flybywire/fbw-common/src/wasm/fbw_common",
                    "build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/panel/fbw.wasm"
                ]),
                new ExecTask("systems-terronnd", [
                    "flybywire/fbw-common/src/wasm/terronnd/build.sh",
                    "wasm-opt -O1 -o build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/panel/terronnd.wasm flybywire/fbw-common/src/wasm/terronnd/out/terronnd.wasm"
                ], [
                    "flybywire/fbw-common/src/wasm/terronnd",
                    "build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/panel/terronnd.wasm",
                    "flybywire/fbw-common/src/wasm/terronnd/out/terronnd.wasm",
                ]),
            new ExecTask("flypad-backend",
                "npm run build-su95x:flypad-backend",
                [
                    "build-su95x/src/wasm/flypad-backend",
                    "flybywire/fbw-common/src/wasm/fbw_common",
                    "build-su95x/out/headwindsim-aircraft-su100-95/SimObjects/AirPlanes/Headwind_SU95/panel/flypad-backend.wasm"
                ])
        ], true),

        // Create final package meta files.
        new TaskOfTasks("dist", [
            new ExecTask("metadata", "npm run build-su95x:metadata"),
            new ExecTask("manifests", "npm run build-su95x:manifest")
        ])
    ]),

]);
