import { IFlyingBehavior } from "src/interfaces/behaviors/IFlyingBehavior";
import { IBomb } from "src/interfaces/objects/IBomb";

export class FlyingBombBehavior implements IFlyingBehavior {
    private parent: IBomb;

    constructor(parent:IBomb) {
        this.parent = parent;
    }

    public fly(): void {
        if(this.parent.body.velocity.y != 0 && this.parent.tail.visible == false) {
            this.parent.tail.setVisible(true);
        }
        this.parent.particles.updatePosition();
    }
}