import Depth from "../game/constant/Depth";
import { GameScene } from "../scenes/GameScene";
import { ShootedBubble } from "./ShootedBubble";

export class FireBubble extends ShootedBubble {
    constructor(scene:GameScene, x:number, y:number, texture:string) {
        super(scene,x,y,texture);
        this.scene.add.existing(this);
        this.body.setCircle(10,50,50);
        this.body.debugBodyColor = 0xffd712;
        this.name = 'FireBubble';
        this.setDepth(Depth.FIREBALL);
        this.setTailTint();
    }

    public update(...args: any[]): void {
        this.updateTailPosition();
        this.setRotation(this.body.velocity.angle());
        if(this.body.velocity.y != 0 && this.tail.visible == false) {
            this.tail.setVisible(true);
            this.setScale(1.1,1);
        }
        if(this.y <= -this.height) {
            this.clear();
            this.removeVisualEffect();
            this.destroy();
        }
    }
}