import DEPTH from "../game/constant/Depth";
import { GameScene } from "../scenes/GameScene";
import { Bubble } from "./Bubble";

export class ScoreText extends Phaser.GameObjects.Text {
    public scene: GameScene;
    
    constructor(scene:GameScene, x:number, y:number, text:string) {
        super(scene,x,y,text,{});
        this.style.setFontSize('30px');
        this.style.setFontFamily('Arial');
        this.x-= 20;
        this.y-= 20;
        this.setDepth(DEPTH.TEXT);
        this.scene.add.existing(this);
        this.setScale(0);
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
                        this.destroy();
                    }
                }
            ],
        });
    }
}