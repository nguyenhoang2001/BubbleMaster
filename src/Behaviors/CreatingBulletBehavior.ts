import { ICreatingBulletBehavior } from "src/interfaces/behaviors/ICreatingBulletBehavior";
import { IShooter } from "src/interfaces/objects/IShooter";
import { ShootedBubble } from "src/objects/ShootedBubble";
import { GameScene } from "src/scenes/GameScene";
import Depth from "../game/constant/Depth";

export class CreatingBulletBehavior implements ICreatingBulletBehavior {
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
        this.parent.shootedBubble.setDepth(Depth.BULLET);
        this.parent.setUpPositionShootedBubble();
        this.parent.shootedBubble.checkWorldBounce = false;
    }

    public createSecondBubble() {
        this.parent.secondBubble = this.parent.bulletGroup.get(28,28,'',undefined,true);
        this.activateBullet(this.parent.secondBubble,this.scene.colorManager.getColorToShoot());
        this.parent.secondBubble.setDepth(Depth.BULLET);
        this.parent.secondBubble.setScale(0.8);
        this.parent.setUpPositionSecondBubble();
        this.parent.secondBubble.checkWorldBounce = false;
    }
}