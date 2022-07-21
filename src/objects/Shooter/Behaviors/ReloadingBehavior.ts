import { IShooter } from "src/interfaces/IShooter";

export class ReloadingBehavior {
    private parent:IShooter;

    constructor(parent:IShooter) {
        this.parent = parent;
    }

    public reload() {
        this.parent.shootedBubble = this.parent.secondBubble;
        this.parent.createSecondBullet();
        this.parent.secondBubble.setScale(0);
        this.parent.animation.showReloading();
    }
}