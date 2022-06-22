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
        this.shooter.shootedBubble = new ShootedBubble(this.scene,28,28,this.scene.typeGenerator.getCurrentTexture());
        Phaser.Display.Align.In.BottomCenter(this.shooter.shootedBubble,this.scene.bubblesContainer.mainZone, 0, -30);
        this.scene.add.existing(this.shooter.shootedBubble);
        this.shooter.shootedBubble.body.checkCollision.none = true;
        this.shooter.shootedBubble.checkWorldBounce = false;
        this.shooter.bulletGroup.add(this.shooter.shootedBubble);
    }

    public createSecondBullet() {
        this.shooter.secondBubllet = new ShootedBubble(this.scene,28,28,this.scene.typeGenerator.getCurrentTexture());
        Phaser.Display.Align.In.BottomCenter(this.shooter.secondBubllet,this.scene.bubblesContainer.mainZone, 0, -30);
        Phaser.Display.Align.To.LeftCenter(this.shooter.secondBubllet,this.shooter.shootedBubble, -12, 20);
        this.shooter.secondBubllet.setScale(0.5);
        this.scene.add.existing(this.shooter.secondBubllet);
        this.shooter.secondBubllet.body.checkCollision.none = true;
        this.shooter.secondBubllet.checkWorldBounce = false;
        this.shooter.bulletGroup.add(this.shooter.secondBubllet);
    }
}