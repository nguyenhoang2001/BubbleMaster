import { GameScene } from "../../../scenes/GameScene";
import { Shooter } from "../Shooter";

export class BulletSwaper {
    private shooter: Shooter;
    private scene: GameScene;
    public finished: boolean;

    constructor(shooter:Shooter) {
        this.shooter = shooter;
        this.scene = this.shooter.scene;
        this.finished = true;
    }

    public startSwaping() {
        this.finished = false;

        let saveCurrentBullet = this.shooter.shootedBubble;
        this.shooter.shootedBubble = this.shooter.secondBubllet;
        this.shooter.secondBubllet = saveCurrentBullet;

        this.tweenSecondBubble();
        this.tweenShootedBubble();
    }

    private tweenSecondBubble() {
        this.scene.tweens.add({
            targets: this.shooter.secondBubllet,
            angleRotate: {from: -90, to: -300},
            scale: 0.8,
            duration: 200,
            ease: 'Power2',
            onUpdate: (tween: Phaser.Tweens.Tween, target: any) => {
                let x = 65*Math.cos(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.shooter.circle.x;
                let y = 65*Math.sin(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.shooter.circle.y;
                target.x = x;
                target.y = y;
            }
        });
    }

    private tweenShootedBubble() {
        this.scene.tweens.add({
            targets: this.shooter.shootedBubble,
            angleRotate: {from: 60, to: -90},
            scale: 1,
            duration: 200,
            ease: 'Power2',
            onUpdate: (tween: Phaser.Tweens.Tween, target: any) => {
                let x = 65*Math.cos(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.shooter.circle.x;
                let y = 65*Math.sin(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.shooter.circle.y;
                target.x = x;
                target.y = y;
            },
            onComplete: () => {
                this.finished = true;
            }
        });
    }

    public swapBulletAfterShooting() {
        this.finished = false;
        this.shooter.shootedBubble = this.shooter.secondBubllet;
        this.shooter.makeSecondBullet();
        this.shooter.secondBubllet.setScale(0);

        this.scene.tweens.add({
            targets: this.shooter.shootedBubble,
            angleRotate: {from: 60, to: -90},
            duration: 200,
            scale: 1,
            ease: 'Power2',
            onUpdate: (tween: Phaser.Tweens.Tween, target: any) => {
                let x = 65*Math.cos(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.shooter.circle.x;
                let y = 65*Math.sin(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.shooter.circle.y;
                target.x = x;
                target.y = y;
            },
            onComplete: () => {
                this.finished = true;
            }
        });
        this.scene.tweens.add({
            targets:this.shooter.secondBubllet,
            scale: 0.8,
            duration: 200,
            ease: 'Power2'
        });
    }
}