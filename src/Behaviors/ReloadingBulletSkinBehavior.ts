import { IReloadingBulletSkinBehavior } from "src/interfaces/behaviors/IReloadingBulletSkinBehavior";
import { IShooter } from "src/interfaces/objects/IShooter";

export class ReloadingBulletSkinBehavior implements IReloadingBulletSkinBehavior {
    private parent: IShooter;

    constructor(parent:IShooter) {
        this.parent = parent;
    }

    public reload(): void {
        this.parent.isAnimationFinished = false;
        this.parent.scene.tweens.add({
            targets: this.parent.shootedBubble,
            angleRotate: {from: 60, to: -90},
            duration: 500,
            scale: 1,
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
        this.parent.scene.tweens.add({
            targets:this.parent.secondBubble,
            scale: 0.8,
            duration: 500,
            ease: 'Power2'
        });
    }
}