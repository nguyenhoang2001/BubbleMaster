import { HudContainer } from "../ui/HudContainer";

export class HudScene extends Phaser.Scene {
    private container!: HudContainer;
    public score!: number;

    constructor() {
        super({key:'HudScene'});
        this.score = 0;
    }

    public create() {
        this.container = new HudContainer(this,0,0);
        this.score = 0;
        this.container.run();
    }

    public update(time: number, delta: number): void {
        this.score = this.registry.get('score');
        this.container.update(time,delta);
    }

}