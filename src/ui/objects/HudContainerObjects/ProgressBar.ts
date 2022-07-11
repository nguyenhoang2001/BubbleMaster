import { HudScene } from "../../../scenes/HudScene";
import { HudContainer } from "../../HudContainer";

export class ProgressBar {
    private scene: HudScene;
    private container: HudContainer;
    private holder: Phaser.GameObjects.Image;
    private left: Phaser.GameObjects.Image;
    private mid: Phaser.GameObjects.Image;
    private right: Phaser.GameObjects.Image;

    constructor(scene:HudScene,container:HudContainer) {
        this.container = container;
        this.scene = scene;
        this.create();
    }

    private create() {
        this.holder = this.scene.add.image(0,0,'bgProgressBar');
        this.left = this.scene.add.image(0,0,'progressLeft');
        this.mid = this.scene.add.image(0,0,'progressMid');
        this.mid.setDisplaySize(431,25);
        this.mid.setOrigin(0,0);
        this.right = this.scene.add.image(0,0,'progressRight');
        this.right.setOrigin(0,0);
        this.container.add(this.holder);
        this.container.add(this.left);
        this.container.add(this.mid);
        this.container.add(this.right);
        Phaser.Display.Align.In.LeftCenter(this.left,this.holder, -10);
        Phaser.Display.Align.To.RightCenter(this.mid,this.left);
        Phaser.Display.Align.To.RightCenter(this.right,this.mid, 
            this.mid.displayWidth - this.mid.width);
    }


}