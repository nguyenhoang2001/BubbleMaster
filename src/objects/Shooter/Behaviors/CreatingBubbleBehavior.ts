import DEPTH from "../../../game/constant/Depth";
import { IShooter } from "src/interfaces/IShooter";
import { ShootedBubble } from "src/objects/ShootedBubble";
import { GameScene } from "src/scenes/GameScene";

export class CreatingBubbleBehavior {
    private parent: IShooter;
    private scene: GameScene;

    constructor(parent:IShooter) {
        this.parent = parent;
        this.scene = this.parent.scene;
    }

    private activateBullet(bubble:ShootedBubble,texture:string) {
        bubble.createWorldBounds(this.parent.rectangleBound);
        bubble.setActive(true);
        bubble.setVisible(true);
        bubble.setTexture(texture);
        bubble.setTailTint();
    }

    public createShootedBubble() {
        this.parent.shootedBubble = this.parent.bulletGroup.get(28,28,'',undefined,true);
        this.activateBullet(this.parent.shootedBubble ,this.scene.colorManager.getColorToShoot());
        this.parent.shootedBubble.setDepth(DEPTH.BULLET);
        this.parent.setUpPositionShootedBubble();
        this.parent.shootedBubble.checkWorldBounce = false;
    }

    public createSecondBubble() {
        this.parent.secondBubble = this.parent.bulletGroup.get(28,28,'',undefined,true);
        this.activateBullet(this.parent.secondBubble,this.scene.colorManager.getColorToShoot());
        this.parent.secondBubble.setDepth(DEPTH.BULLET);
        this.parent.secondBubble.setScale(0.8);
        this.parent.setUpPositionSecondBubble();
        this.parent.secondBubble.checkWorldBounce = false;
    }
}