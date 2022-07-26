import { IShooter } from "src/interfaces/IShooter";

export class SwapingBulletSkinBehavior {
    private parent: IShooter;

    constructor(parent: IShooter) {
        this.parent = parent;
    }

    swap(): void {
        this.parent.isAnimationFinished = false;
        this.parent.scene.tweens.add({
            targets: this.parent.secondBubble,
            angleRotate: {from: -90, to: -300},
            scale: 0.8,
            duration: 400,
            ease: 'Power2',
            onUpdate: (tween: Phaser.Tweens.Tween, target: any) => {
                let x = 65*Math.cos(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.parent.circle.x;
                let y = 65*Math.sin(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.parent.circle.y;
                target.x = x;
                target.y = y;
            }
        });
        this.parent.scene.tweens.add({
            targets: this.parent.shootedBubble,
            angleRotate: {from: 60, to: -90},
            scale: 1,
            duration: 400,
            ease: 'Power2',
            onUpdate: (tween: Phaser.Tweens.Tween, target: any) => {
                let x = 65*Math.cos(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.parent.circle.x;
                let y = 65*Math.sin(target.angleRotate*Phaser.Math.DEG_TO_RAD) + this.parent.circle.y;
                target.x = x;
                target.y = y;
            },
            onComplete: () => {
                this.parent.isAnimationFinished = true;
            }
        });
    }
}