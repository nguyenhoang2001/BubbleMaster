import DEPTH from "../game/constant/Depth";
import { GameScene } from "../scenes/GameScene";
import { ShootedBubble } from "./ShootedBubble";

export class FireBubble extends ShootedBubble {
    constructor(scene:GameScene, x:number, y:number, texture:string) {
        super(scene,x,y,texture);
        this.scene.add.existing(this);
        this.body.setCircle(28,0,0);
        this.name = 'FireBubble';
        this.setDepth(DEPTH.FIREBALL);
        this.setTailTint();
    }

    public update(...args: any[]): void {
        this.updateTailPosition();
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