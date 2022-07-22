import { IBomb } from "src/interfaces/IBomb";
import { IFlyBehavior } from "src/interfaces/IFlyBehavior";

export class BombFlyBehavior implements IFlyBehavior {
    private parent: IBomb;

    constructor(parent:IBomb) {
        this.parent = parent;
    }

    public fly(): void {
        if(this.parent.self.body.velocity.y != 0 && this.parent.self.tail.visible == false) {
            this.parent.self.tail.setVisible(true);
        }
        this.parent.self.updateTailPosition();
        this.parent.self.particles.updatePosition();
    }
}