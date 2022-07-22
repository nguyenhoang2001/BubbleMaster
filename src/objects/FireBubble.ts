import { FireBulletFlyBehavior } from "../Behaviors/FireBulletFlyBehavior";
import { IFireBullet } from "src/interfaces/IFireBullet";
import Depth from "../game/constant/Depth";
import { GameScene } from "../scenes/GameScene";
import { ShootedBubble } from "./ShootedBubble";

export class FireBubble extends ShootedBubble implements IFireBullet {
    constructor(scene:GameScene, x:number, y:number, texture:string) {
        super(scene,x,y,texture);
        this.flyBehavior = new FireBulletFlyBehavior(this);
        this.scene.add.existing(this);
        this.body.setCircle(10,50,50);
        this.body.debugBodyColor = 0xffd712;
        this.name = 'FireBubble';
        this.setDepth(Depth.FIREBALL);
        this.setTailTint();
    }
}