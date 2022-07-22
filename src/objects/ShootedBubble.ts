import { BulletFlyBehavior } from "../Behaviors/BulletFlyBehavior";
import BulletState from "src/game/constant/BulletState";
import { IBullet } from "src/interfaces/IBullet";
import { IFlyBehavior } from "src/interfaces/IFlyBehavior";
import Depth from "../game/constant/Depth";
import { Bubble } from "./Bubble";
import { Tail } from "./Tail";

export class ShootedBubble extends Bubble implements IBullet {
    // Properties
    public body: Phaser.Physics.Arcade.Body;
    public checkWorldBounce: boolean;
    public tail: Tail;
    // State
    public state: BulletState;
    // Behaviors
    protected flyBehavior: IFlyBehavior;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string) {
        super(scene,x,y,texture,undefined,undefined);
        this.state = BulletState.Idle;
        this.flyBehavior = new BulletFlyBehavior(this);
        this.body.setCircle(10,18,18);
        this.name = 'ShootedBubble';
        this.checkWorldBounce = false;
        this.tail = new Tail(this.scene,x,y,'tail',this).setAlpha(0.4).setScale(0.9).setOrigin(0.5,0);
        this.tail.setDepth(Depth.TAIL);
        this.tail.setVisible(false);
    }

    public setTailTint() {
        this.tail.setTint(this.tintGenerator.getTint(this.texture.key));
    }

    public removeVisualEffect() {
        this.tail.removeFromDisplayList();
    }

    public createWorldBounds(rectangleBound: Phaser.Geom.Rectangle) {
        this.body.setBoundsRectangle(rectangleBound);
        this.body.setCollideWorldBounds(true,1,1,true);
    }

    public clear() {
        this.scene.physics.world.disableBody(this.body);
        this.body.setCollideWorldBounds(false,undefined,undefined,false);
        this.checkWorldBounce = false;
    }

    public update(...args: any[]): void {
        this.tail.update();
        switch(this.state) {
            case BulletState.Flying: {
                this.tail.state = TailState.Appearing;
                this.flyBehavior.fly();
                break;
            }
            default: {
                this.state = BulletState.Idle;
                this.tail.state = TailState.Idle;
                break;
            }
        }

    }
}