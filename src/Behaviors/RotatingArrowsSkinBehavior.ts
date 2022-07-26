import Depth from "../game/constant/Depth";
import { IRotatingArrowsSkinBehavior } from "src/interfaces/IRotatingArrowsSkinBehavior";
import { IArrowsSkinComponent } from "src/interfaces/IArrowsSkinComponent";

export class RotatingArrowsSkinBehavior implements IRotatingArrowsSkinBehavior {
    public parent: IArrowsSkinComponent;

    constructor(parent:IArrowsSkinComponent) {
        this.parent = parent;
    }

    public rotate(): void {
        let arrows = this.parent.scene.add.image(0,0,'arrows').setAlpha(0);
        arrows.setDepth(Depth.GAMEPLAY);
        Phaser.Display.Align.In.Center(arrows,this.parent.circle);
        this.parent.scene.tweens.add({
            targets:arrows,
            alpha: {
                value: '1',
                duration: 1000,
                yoyo:true,
            },
            angle: '-= 160',
            repeatDelay: 4000,
            duration: 2000,
            ease: 'Sine',
            repeat: -1
        });
    }
}