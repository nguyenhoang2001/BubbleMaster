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

    public activate() {
        this.setScale(0);
        this.setActive(true);
        this.setVisible(true);
        this.setAlpha(1);
        this.setOrigin(0.5, 0.8)
    }

    public showAnimation() {
        this.scene.tweens.timeline({
            targets: this,
            ease: 'Sine',
            tweens:[
                {
                    scale: {from: 0.8, to: 1},
                    duration: 150
                },
                {
                    alpha: 0,
                    scale:{from: 1, to:0.8},
                    duration: 373,
                    onComplete: () => {
                        this.scene.bubblesBoard.scoreGroup.killAndHide(this);
                    }
                }
            ],
        });
    }
}