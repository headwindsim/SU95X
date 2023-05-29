import { DisplayManagementComputer } from 'instruments/src/PFD/shared/DisplayManagementComputer';
import { Clock, FSComponent, HEventPublisher } from '@microsoft/msfs-sdk';
import { getDisplayIndex, PFDComponent } from './PFD';
import { AdirsValueProvider } from '../MsfsAvionicsCommon/AdirsValueProvider';
import { ArincValueProvider } from './shared/ArincValueProvider';
import { PFDSimvarPublisher, PFDSimvars } from './shared/PFDSimvarPublisher';
import { SimplaneValueProvider } from './shared/SimplaneValueProvider';
import { ArincEventBus } from '../MsfsAvionicsCommon/ArincEventBus';

import './style.scss';

class A32NX_PFD extends BaseInstrument {
    private bus: ArincEventBus;

    private simVarPublisher: PFDSimvarPublisher;

    private readonly hEventPublisher;

    private readonly arincProvider: ArincValueProvider;

    private readonly simplaneValueProvider: SimplaneValueProvider;

    private readonly clock: Clock;

    private adirsValueProvider: AdirsValueProvider<PFDSimvars>;

    private readonly displayManagementComputer: DisplayManagementComputer;

    /**
     * "mainmenu" = 0
     * "loading" = 1
     * "briefing" = 2
     * "ingame" = 3
     */
    private gameState = 0;

    constructor() {
        super();
        this.bus = new ArincEventBus();
        this.simVarPublisher = new PFDSimvarPublisher(this.bus);
        this.hEventPublisher = new HEventPublisher(this.bus);
        this.arincProvider = new ArincValueProvider(this.bus);
        this.simplaneValueProvider = new SimplaneValueProvider(this.bus);
        this.clock = new Clock(this.bus);
        this.displayManagementComputer = new DisplayManagementComputer(this.bus);
    }

    get templateID(): string {
        return 'SU95X_PFD';
    }

    public getDeltaTime() {
        return this.deltaTime;
    }

    public onInteractionEvent(args: string[]): void {
        this.hEventPublisher.dispatchHEvent(args[0]);
    }

    public connectedCallback(): void {
        super.connectedCallback();

        this.adirsValueProvider = new AdirsValueProvider(this.bus, this.simVarPublisher, getDisplayIndex() === 1 ? 'L' : 'R');

        this.arincProvider.init();
        this.clock.init();
        this.displayManagementComputer.init();

        FSComponent.render(<PFDComponent bus={this.bus} instrument={this} />, document.getElementById('PFD_CONTENT'));

        // Remove "instrument didn't load" text
        document.getElementById('PFD_CONTENT').querySelector(':scope > h1').remove();
    }

    /**
   * A callback called when the instrument gets a frame update.
   */
    public Update(): void {
        super.Update();

        if (this.gameState !== 3) {
            const gamestate = this.getGameState();
            if (gamestate === 3) {
                this.simVarPublisher.startPublish();
                this.hEventPublisher.startPublish();
                this.adirsValueProvider.start();
            }
            this.gameState = gamestate;
        } else {
            this.simVarPublisher.onUpdate();
            this.simplaneValueProvider.onUpdate();
            this.clock.onUpdate();
        }
    }
}

registerInstrument('su95x-pfd', A32NX_PFD);
