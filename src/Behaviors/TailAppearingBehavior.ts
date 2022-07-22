import { ITail } from "src/interfaces/ITail";
import { ITailAppearingBehavior } from "src/interfaces/ITailAppearingBehavior";

export class TailAppearingBehavior implements ITailAppearingBehavior {
    private parent: ITail;

    constructor(parent:ITail) {
        this.parent = parent;
    }

    public appear() {
        let angle = this.parent.self.shootedBubble.body.velocity.angle() * Phaser.Math.RAD_TO_DEG;        
        if(angle >= 270) {
            angle = 90 - (360 - angle);
        } else {
            angle = 360 - (90 - (angle - 180));
        }
        this.parent.self.setRotation(angle * Phaser.Math.DEG_TO_RAD);
        this.parent.self.x = this.parent.self.shootedBubble.x;
        this.parent.self.y = this.parent.self.shootedBubble.y;
        let angleOffset = 0;
        let offsetX = 0;
        let offsetY = 0;
        if(angle >= 0 && angle <= 90) {
            angleOffset = 90 - angle;
            offsetX = 1;
        } else {
            angleOffset = 90 - (360 - angle);
            offsetX = -1;
        }
        offsetY = 30 * Math.sin(angleOffset * Phaser.Math.DEG_TO_RAD);
        offsetX *= 30 * Math.cos(angleOffset * Phaser.Math.DEG_TO_RAD);
        this.parent.self.y = this.parent.self.y - offsetY;
        this.parent.self.x = this.parent.self.x + offsetX;
    }
}