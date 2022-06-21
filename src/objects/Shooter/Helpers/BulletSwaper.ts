import { GameScene } from "../../../scenes/GameScene";
import { Shooter } from "../Shooter";

export class BulletSwaper {
    private shooter!: Shooter;
    private scene!: GameScene;
    public finished!: boolean;
    private countingFinish!: number;

    constructor(shooter:Shooter) {
        this.shooter = shooter;
        this.scene = this.shooter.scene;
        this.finished = true;
        this.countingFinish = 0;
    }

    public run() {
        this.finished = false;
        const secondBullet = this.shooter.secondBubllet;
        const shootBullet = this.shooter.shootedBubble;
        this.scene.tweens.add({
            targets:shootBullet,
            x:secondBullet.x,
            y:secondBullet.y,
            scale:secondBullet.scale,
            ease:'Power2',
            duration:400,
            onComplete: () => {
                this.countingFinish += 1;
            }
        });
        this.scene.tweens.add({
            targets:secondBullet,
            x:shootBullet.x,
            y:shootBullet.y,
            scale:shootBullet.scale,
            ease:'Power2',
            duration:400,
            onComplete: () => {
                this.countingFinish += 1;
            }
        });
    }

    public afterShooting() {
        this.finished = false;
        this.scene.tweens.add({
            targets:this.shooter.secondBubllet,
            x:this.shooter.circle.x,
            y:this.shooter.circle.y,
            scale:1,
            ease:'Power2',
            duration:300,
            onComplete: () => {
                this.finished = true;
                this.shooter.shootedBubble = this.shooter.secondBubllet;
                this.shooter.makeSecondBullet();
            }
        });
    }

    public update() {
        if(this.countingFinish >= 2) {
            this.countingFinish = 0;
            const secondBullet = this.shooter.secondBubllet;
            const shootBullet = this.shooter.shootedBubble;
            let saveCurrentBullet = shootBullet;
            this.shooter.shootedBubble = secondBullet;
            this.shooter.secondBubllet = saveCurrentBullet;
            this.finished = true;
        }
    }
}