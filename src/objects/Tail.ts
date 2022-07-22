import { TailAppearingBehavior } from "../Behaviors/TailAppearingBehavior";
import { ITail } from "src/interfaces/ITail";
import { ITailAppearingBehavior } from "src/interfaces/ITailAppearingBehavior";
import { ShootedBubble } from "./ShootedBubble";

export class Tail extends Phaser.GameObjects.Image implements ITail {
    public self: Tail;
    public shootedBubble: ShootedBubble;
    // State
    public state: TailState;
    // Behaviors
    protected appearingBehavior: ITailAppearingBehavior;

    constructor(scene:Phaser.Scene,x:number,y:number,texture:string, shootedBubble:ShootedBubble) {
        super(scene,x,y,texture);
        this.scene.add.existing(this);
        this.shootedBubble = shootedBubble;
        this.self = this;
        this.state = TailState.Idle;
        this.appearingBehavior = new TailAppearingBehavior(this);
    }

    public update(...args: any[]): void {
        switch(this.state) {
            case TailState.Appearing: {
                this.appearingBehavior.appear();
                break;
            }
            default: {
                this.state = TailState.Idle;
                break;
            }
        }
    }
}