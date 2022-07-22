import { IBullet } from "src/interfaces/IBullet";
import { IFlyBehavior } from "src/interfaces/IFlyBehavior";


export class BulletFlyBehavior  implements IFlyBehavior {
    private parent: IBullet;

    constructor(parent:IBullet) {
        this.parent = parent;
    }

    public fly(): void {
        if(this.parent.self.body.velocity.y != 0 && this.parent.self.tail.visible == false) {
            this.parent.self.tail.setVisible(true);
            this.parent.self.setScale(1.1,1);
        }
        this.parent.self.updateTailPosition();
        this.parent.self.setRotation(this.parent.self.body.velocity.angle());
    }
}