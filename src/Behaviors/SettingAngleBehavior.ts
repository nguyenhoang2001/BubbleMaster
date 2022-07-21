import ShotguideState from "src/game/constant/ShotguideState";
import { ISettingAngleBehavior } from "src/interfaces/ISettingAngleBehavior";
import { IShooter } from "src/interfaces/IShooter";

export class SettingAngleBehavior implements ISettingAngleBehavior {
    private parent: IShooter;

    constructor(parent:IShooter) {
        this.parent = parent;
    }

    public setAngle(pointer: Phaser.Input.Pointer) {
        if(this.parent.isAllowShooting && this.parent.isAnimationFinished) {
            let angle = Phaser.Math.RAD_TO_DEG * 
            Phaser.Math.Angle.Between(this.parent.shootedBubble.x,this.parent.shootedBubble.y, pointer.x, pointer.y);
            if (angle < 0) {
                angle = 180 + (180 + angle);
            }
            if(angle >= 180 && angle <= 360) {
                if(angle < 190) {
                    angle = 190;
                }
                else {
                    if(angle > 350) {
                        angle = 350;
                    }
                }
                this.parent.arrowShoot.setAngle(angle);
                this.parent.shotGuide.state = ShotguideState.Appearing;
            } else {
                this.parent.shotGuide.state = ShotguideState.Fading;
            }
        }
    }
}