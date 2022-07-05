import { GameScene } from "../../../scenes/GameScene";
import { GameOverContainer } from "../../GameOverContainer";

export class TextContainer extends Phaser.GameObjects.Container {
    private parent: GameOverContainer;
    private score: Phaser.GameObjects.Text;
    private highScore: Phaser.GameObjects.Text;
    public scene: GameScene;

    constructor(parent: GameOverContainer, scene:GameScene, x:number, y:number) {
       super(scene,x,y) ;
       this.parent = parent;
       this.parent.add(this);
       Phaser.Display.Align.In.Center(this, this.parent.mainZone);
       this.createObjects();
       this.disappear();
    }

    private createObjects() {
        this.score = this.scene.add.text(-130,-100,'score: ');
        this.highScore = this.scene.add.text(-130,-30,'High Score: ');
        this.score.style.setFontSize('50px');
        this.score.style.setFontFamily('fontfamily');
        this.highScore.style.setFontSize('50px');
        this.highScore.style.setFontFamily('fontfamily');
        this.add([this.score,this.highScore]);
    }

    public disappear() {
        this.setVisible(false);
    }

    public appear() {
        this.setVisible(true);
        this.setAlpha(0);
        this.score.setText('score: ' + this.scene.score);
        this.highScore.setText('high score: ' + this.scene.highScore);
        let tween = {
            targets:this,
            alpha: 1,
            duration: 800,
            ease: 'Sine'
        }
        return tween;
    }
}