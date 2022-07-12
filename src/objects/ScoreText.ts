import DEPTH from "../game/constant/Depth";
import { GameScene } from "../scenes/GameScene";
import { Bubble } from "./Bubble";

export class ScoreText extends Phaser.GameObjects.Text {
    public scene: GameScene;
    
    constructor(scene:GameScene, x:number, y:number, text:string) {
        super(scene,x,y,text,{});
        this.style.setFontSize('30px');
        this.style.setFontFamily('Arial');
        this.setDepth(DEPTH.TEXT);
        this.scene.add.existing(this);
        this.setScale(0);
    }

    public activate(text:string) {
        this.setScale(0);
        this.setText(text);
        this.setActive(true);
        this.setVisible(true);
        this.setAlpha(1);
    }

    public showAnimation(delay:number) {
        this.scene.tweens.timeline({
            targets: this,
            ease: 'Sine',
            tweens:[
                {
                    scale: {from: 0.5, to: 1.1},
                    duration: 500,
                    delay:delay
                },
                {
                    alpha: 0,
                    duration: 200,
                    onComplete: () => {
                        this.scene.bubblesBoard.scoreGroup.killAndHide(this);
                    }
                }
            ],
        });
    }
}