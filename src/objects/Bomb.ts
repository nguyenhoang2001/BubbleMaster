import DEPTH from "../game/constant/Depth";
import { GameScene } from "../scenes/GameScene";
import { ShootedBubble } from "./ShootedBubble";

export class Bomb extends ShootedBubble {
    constructor(scene:GameScene, x:number, y:number, texture:string) {
        super(scene,x,y,texture);
        this.scene.add.existing(this);
        this.name = 'Bomb';
        this.setDepth(DEPTH.BULLET);
    }

    public update(...args: any[]): void {
        this.updateTailPosition();
        if(this.body.velocity.y != 0 && this.tail.visible == false) {
            this.tail.setVisible(true);
        }
    }
}