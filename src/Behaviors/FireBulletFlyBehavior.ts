import { IFireBullet } from "src/interfaces/IFireBullet";
import { IFlyBehavior } from "src/interfaces/IFlyBehavior";

export class FireBulletFlyBehavior implements IFlyBehavior {
    private parent:IFireBullet;

    constructor(parent:IFireBullet) {
        this.parent = parent;
    }

    public fly(): void {
        if(this.parent.self.body.velocity.y != 0 && this.parent.self.tail.visible == false) {
            this.parent.self.tail.setVisible(true);
            this.parent.self.setScale(1.1,1);
        }
        this.parent.self.setRotation(this.parent.self.body.velocity.angle());
        if(this.parent.self.y <= -this.parent.self.height) {
            this.parent.self.clear();
            this.parent.self.removeVisualEffect();
            this.parent.self.destroy();
        }
    }
}