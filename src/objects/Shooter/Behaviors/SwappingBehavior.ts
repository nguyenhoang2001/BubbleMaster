import { IShooter } from "src/interfaces/IShooter";

export class SwappingBehavior {
    private parent: IShooter;

    constructor(parent:IShooter) {
        this.parent = parent;
    }

    public swap() {
        if(this.parent.shootedBubble.name == 'ShootedBubble') {
            let saveCurrentBullet = this.parent.shootedBubble;
            this.parent.shootedBubble = this.parent.secondBubble;
            this.parent.secondBubble = saveCurrentBullet;
            this.parent.animation.showSwapping();
        }
    }
}