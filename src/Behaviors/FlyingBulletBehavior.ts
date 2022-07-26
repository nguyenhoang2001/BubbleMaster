import { IFlyingBehavior } from "src/interfaces/behaviors/IFlyingBehavior";
import { IBullet } from "src/interfaces/objects/IBullet";


export class FLyingBulletBehavior implements IFlyingBehavior {
    private parent: IBullet;

    constructor(parent:IBullet) {
        this.parent = parent;
    }

    public fly(): void {
        if(this.parent.body.velocity.y != 0 && this.parent.tail.visible == false) {
            this.parent.tail.setVisible(true);
            this.parent.setScale(1.1,1);
        }
        this.parent.setRotation(this.parent.body.velocity.angle());
    }
}