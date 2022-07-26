import BulletState from "src/game/constant/BulletState";
import { IShooter } from "src/interfaces/objects/IShooter";
import { IShootingBehavior } from "src/interfaces/behaviors/IShootingBehavior";

export class ShootingBehavior implements IShootingBehavior {
    private parent: IShooter;
    
    constructor(parent:IShooter) {
        this.parent = parent;
    }

    public shoot() {
        if(this.parent.arrowShoot.angle != 0) {
            this.parent.scene.events.emit('shooted');
            this.parent.shootedBubble.body.checkCollision.none = false;
            this.parent.shootedBubble.checkWorldBounce = true;
            this.parent.scene.physics.velocityFromRotation (
                this.parent.arrowShoot.angle*Phaser.Math.DEG_TO_RAD,
                2400,
                this.parent.shootedBubble.body.velocity
            );
            this.parent.shootedBubble.state = BulletState.Flying;
        }
    }
}