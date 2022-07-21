import DEPTH from "../../game/constant/Depth";
import { GameScene } from "../../scenes/GameScene";
import { Shooter } from "./Shooter";

export class ShooterAnimation {
    public scene: GameScene;
    private shooter: Shooter;


    constructor(shooter:Shooter, scene:GameScene) {
        this.shooter = shooter;
        this.scene = scene;
    }

    public showRotatingCircle() {
        let arrows = this.scene.add.image(0,0,'arrows').setAlpha(0);
        arrows.setDepth(DEPTH.GAMEPLAY);
        Phaser.Display.Align.In.Center(arrows,this.shooter.circle);
        this.scene.tweens.add({
            targets:arrows,
            alpha: {
                value: '1',
                duration: 1000,
                yoyo:true,
            },
            angle: '-= 160',
            repeatDelay: 4000,
            duration: 2000,
            ease: 'Sine',
            repeat: -1
        });
    }

    public showReloading() {
        this.shooter.isAnimationFinished = false;
        this.scene.tweens.add({
            targets: this.shooter.shootedBubble,
            angleRotate: {from: 60, to: -90},
            duration: 500,
            scale: 1,
            ease: 'Power2',
            onUpdate: (tween: Phaser.Tweens.Tween, target: any) => {
                let x = 65*Math.cos(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.shooter.circle.x;
                let y = 65*Math.sin(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.shooter.circle.y;
                target.x = x;
                target.y = y;
            },
            onComplete: () => {
                this.shooter.isAnimationFinished = true;
            }
        });
        this.scene.tweens.add({
            targets:this.shooter.secondBubble,
            scale: 0.8,
            duration: 500,
            ease: 'Power2'
        });
    }

    public showSwapping() {
        this.shooter.isAnimationFinished = false;
        this.scene.tweens.add({
            targets: this.shooter.secondBubble,
            angleRotate: {from: -90, to: -300},
            scale: 0.8,
            duration: 400,
            ease: 'Power2',
            onUpdate: (tween: Phaser.Tweens.Tween, target: any) => {
                let x = 65*Math.cos(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.shooter.circle.x;
                let y = 65*Math.sin(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.shooter.circle.y;
                target.x = x;
                target.y = y;
            }
        });
        this.scene.tweens.add({
            targets: this.shooter.shootedBubble,
            angleRotate: {from: 60, to: -90},
            scale: 1,
            duration: 400,
            ease: 'Power2',
            onUpdate: (tween: Phaser.Tweens.Tween, target: any) => {
                let x = 65*Math.cos(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.shooter.circle.x;
                let y = 65*Math.sin(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.shooter.circle.y;
                target.x = x;
                target.y = y;
            },
            onComplete: () => {
                this.shooter.isAnimationFinished = true;
            }
        });
    }
}