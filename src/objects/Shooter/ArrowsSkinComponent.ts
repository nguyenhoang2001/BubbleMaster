import { IArrowsSkinComponent } from "src/interfaces/behaviors/IArrowsSkinComponent";
import { IRotatingArrowsSkinBehavior } from "src/interfaces/behaviors/IRotatingArrowsSkinBehavior";
import { IShooter } from "src/interfaces/objects/IShooter";
import { RotatingArrowsSkinBehavior } from "../../Behaviors/RotatingArrowsSkinBehavior";

export class ArrowsSkinComponent implements IArrowsSkinComponent {
    private parent: IShooter;
    private rotatingArrowsSkinBehavior: IRotatingArrowsSkinBehavior;
    public scene: Phaser.Scene;
    public circle: Phaser.GameObjects.Image;

    constructor(parent:IShooter) {
        this.parent = parent;
        this.scene = this.parent.scene;
        this.circle = this.parent.circle;
        this.rotatingArrowsSkinBehavior = new RotatingArrowsSkinBehavior(this);
    }

    public rotate() {
        this.rotatingArrowsSkinBehavior.rotate();
    }
}