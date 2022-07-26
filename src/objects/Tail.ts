import { AppearingTailBehavior } from "../Behaviors/AppearingTailBehavior";
import { ITail } from "src/interfaces/ITail";
import { IAppearingTailBehavior } from "src/interfaces/IAppearingTailBehavior";
import { ShootedBubble } from "./ShootedBubble";

export class Tail extends Phaser.GameObjects.Image implements ITail {
    public self: Tail;
    public shootedBubble: ShootedBubble;
    // State
    public state: TailState;
    // Behaviors
    protected appearingTailBehavior: IAppearingTailBehavior;

    constructor(scene:Phaser.Scene,x:number,y:number,texture:string, shootedBubble:ShootedBubble) {
        super(scene,x,y,texture);
        this.scene.add.existing(this);
        this.shootedBubble = shootedBubble;
        this.self = this;
        this.state = TailState.Idle;
        this.appearingTailBehavior = new AppearingTailBehavior(this);
    }

    public update(...args: any[]): void {
        switch(this.state) {
            case TailState.Appearing: {
                this.appearingTailBehavior.appear();
                break;
            }
            default: {
                this.state = TailState.Idle;
                break;
            }
        }
    }
}