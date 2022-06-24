import { GameScene } from "../scenes/GameScene";
import { ReplayButton } from "./objects/GameOverContainer/ReplayButton";

export class GameOverContainer extends Phaser.GameObjects.Container {
    public scene!: GameScene;
    private replayButton!: ReplayButton;
    private blackBackground!: Phaser.GameObjects.Rectangle;

    constructor(scene:GameScene,x:number,y:number) {
        super(scene,x,y);
        this.scene.add.existing(this);
        this.drawObjects();
        this.close();
    }

    private drawObjects() {
        this.blackBackground = this.scene.add.rectangle(0,0,this.scene.sys.canvas.width,this.scene.sys.canvas.height,0x000000);
        this.blackBackground.setOrigin(0,0);
        this.blackBackground.setAlpha(0);
        this.add(this.blackBackground);
        this.replayButton = new ReplayButton(this,this.scene);
    }

    public close() {
        this.setVisible(false);
        this.replayButton.disappear();
        this.blackBackground.setAlpha(0);
    }

    public open() {
        this.setVisible(true);
        let timeline = this.scene.tweens.createTimeline();
        let buttonTween = this.replayButton.appear();
        timeline.add({
            targets:this.blackBackground,
            alpha: 0.3,
            ease: 'Power1',
            duration: 1000
        })
        timeline.add(buttonTween);
        timeline.play();
    }
}