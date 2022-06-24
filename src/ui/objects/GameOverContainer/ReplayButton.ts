import { Tweens } from "phaser";
import { GameScene } from "../../../scenes/GameScene";
import { GameOverContainer } from "../../GameOverContainer";

export class ReplayButton {
    private mid!: Phaser.GameObjects.Image;
    private left!: Phaser.GameObjects.Image;
    private right!: Phaser.GameObjects.Image;
    private text!: Phaser.GameObjects.Text;
    private parentContainer!: GameOverContainer;
    public container!: Phaser.GameObjects.Container;
    private scene!: GameScene;
    
    constructor(parentContainer:GameOverContainer, scene: GameScene) {
        this.parentContainer = parentContainer;
        this.scene = scene;
        this.container = this.scene.add.container(0,0);
        this.parentContainer.add(this.container);
        this.create();
    }


    private create() {

        this.mid = this.scene.add.image(0,0,'progressMid').setOrigin(0,0);
        this.mid.setDisplaySize(270, 50);
        this.left = this.scene.add.image(0,0,'progressLeft').setOrigin(0,0);
        this.right = this.scene.add.image(0,0,'progressRight').setOrigin(0,0);

        this.text = this.scene.add.text(0,0,'Play Again');
        this.text.style.setFontSize('30px');
        this.text.style.setFontFamily('fontfamily');


        this.left.setDisplaySize(this.left.width,50);
        this.right.setDisplaySize(this.right.width,50);
        this.container.add(this.left);
        this.container.add(this.mid);
        this.container.add(this.right);
        this.container.add(this.text);
        Phaser.Display.Align.In.Center(this.container, this.scene.mainZone,-150, 100);
        Phaser.Display.Align.To.RightCenter(this.mid,this.left);
        Phaser.Display.Align.To.RightCenter(this.right,this.mid, (this.mid.displayWidth - this.mid.width));
        Phaser.Display.Align.In.Center(this.text,this.mid, 57, 11);
    }

    public appear() {
        this.container.setVisible(true);
        this.container.setAlpha(0);
        let tween = {
            targets:this.container,
            y: this.container.y + 200,
            ease: 'Sine',
            alpha: 1,
            duration: 1000,
            onComplete: () => {
                this.left.setInteractive();
                this.mid.setInteractive();
                this.right.setInteractive();
            }
        }
        return tween;
    }

    public disappear() {
        this.container.setVisible(false);
        this.container.y -= 200;
        this.left.removeInteractive();
        this.mid.removeInteractive();
        this.right.removeInteractive();
    }

}