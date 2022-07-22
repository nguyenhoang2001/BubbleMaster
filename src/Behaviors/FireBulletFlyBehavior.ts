import { IFireBullet } from "src/interfaces/IFireBullet";
import { IFlyBehavior } from "src/interfaces/IFlyBehavior";

export class FireBulletFlyBehavior implements IFlyBehavior {
    private parent:IFireBullet;

    constructor(parent:IFireBullet) {
        this.parent = parent;
    }

    public fly(): void {
        if(this.parent.body.velocity.y != 0 && this.parent.tail.visible == false) {
            this.parent.tail.setVisible(true);
            this.parent.setScale(1.1,1);
        }
        this.parent.setRotation(this.parent.body.velocity.angle());
        if(this.parent.y <= -this.parent.height) {
            this.parent.clear();
            this.parent.removeVisualEffect();
            this.parent.destroy();
        }
    }
}