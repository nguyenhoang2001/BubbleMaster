// import { logicGame } from "../../../game";
import { GameScene } from "../../../scenes/GameScene";
import { ShootedBubble } from "../../ShootedBubble";
import { Shooter } from "../Shooter";

export class BulletCreator {
    private shooter!: Shooter;
    private scene!: GameScene;

    constructor(shooter:Shooter) {
        this.shooter = shooter;
        this.scene = this.shooter.scene;        
    }

    public run() {
        this.createShootedBubble();
        this.createSecondBullet();
    }

    private createShootedBubble() {
        this.shooter.shootedBubble = new ShootedBubble(this.scene,28,28,this.scene.colorManager.getTexture());
        this.scene.add.existing(this.shooter.shootedBubble);
        this.shooter.setUpPositionFirst();
        this.shooter.shootedBubble.checkWorldBounce = false;
        this.shooter.bulletGroup.add(this.shooter.shootedBubble);
    }

    public createSecondBullet() {
        this.shooter.secondBubllet = new ShootedBubble(this.scene,28,28,this.scene.colorManager.getTexture());
        this.shooter.secondBubllet.setScale(0.8);
        this.scene.add.existing(this.shooter.secondBubllet);
        this.shooter.setUpPositionSecond();
        this.shooter.secondBubllet.checkWorldBounce = false;
        this.shooter.bulletGroup.add(this.shooter.secondBubllet);
    }
}