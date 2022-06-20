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
            ease:'Power2',
            duration:400,
            onComplete: () => {
                this.countingFinish += 1;
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