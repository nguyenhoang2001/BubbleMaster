import { IBubblesBoard } from "src/interfaces/objects/IBubblesBoard";
import { IHittingBulletBehavior } from "src/interfaces/behaviors/IHittingBulletBehavior";
import { Bubble } from "src/objects/Bubble";
import { ShootedBubble } from "src/objects/ShootedBubble";

export class HittingBulletBehavior implements IHittingBulletBehavior {
    private parent:IBubblesBoard;

    constructor(parent:IBubblesBoard) {
        this.parent = parent;
    }

    public hit(hittedBubble:Bubble,shootedBubble:ShootedBubble):void {
        // this.parent.handleWrongBubbleHit();
        shootedBubble.clear();
        this.parent.updateRow();
        const bubble = this.parent.addBubbleFromShoot(hittedBubble,shootedBubble);
        this.parent.updateRow();
        shootedBubble.removeVisualEffect();
        shootedBubble.destroy();

        if(bubble != undefined) {
            this.parent.animation.showBouncing(bubble);
            this.parent.clusters.checkClusters(bubble,true,true);
        }
    }
}