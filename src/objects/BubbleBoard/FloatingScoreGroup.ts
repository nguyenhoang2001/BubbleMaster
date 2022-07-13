import { GameScene } from "../../scenes/GameScene";
import { ScoreText } from "../ScoreText";

export class FloatingScoreGroup extends Phaser.GameObjects.Group {
    public scene: GameScene;

    constructor(scene:GameScene) {
        super(scene);
        this.classType = ScoreText;
        this.maxSize = -1;
        this.scene.add.existing(this);
    }

    public getScoreText():ScoreText {
        let scoreText = this.get() as ScoreText;
        scoreText.activate();
        return scoreText;
    }
}