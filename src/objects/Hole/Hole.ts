import { GameScene } from "../../scenes/GameScene";
import { Bubble } from "../Bubble";
import { ScoreText } from "../ScoreText";

export class Hole extends Phaser.GameObjects.Image {
    public scene:GameScene;
    public body: Phaser.Physics.Arcade.Body;
    private holeNumber:number;

    constructor(scene:GameScene, x:number, y:number,texture:string, holeNumber:number) {
        super(scene,x,y,texture);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.holeNumber = holeNumber;
        this.body.setSize(120,10);
        this.body.setOffset(5,65);
        this.enableOverlap();
    }

    private enableOverlap() {
        let gridBall = this.scene.bubblesBoard.gridGroup;
        this.scene.physics.add.overlap(gridBall,this, (_bubble:any) => {
            let bubble = _bubble as Bubble;
            if(bubble.isOutGrid && bubble.score == 0) {
                bubble.score = this.scene.scoreManager.getHoleScore(this.holeNumber);
                this.scene.scoreManager.increaseScore(bubble.score);
                
                let scoreText = this.scene.bubblesBoard.scoreGroup.getScoreText();
                scoreText.setText(bubble.score.toString());
                scoreText.setPosition(bubble.x,bubble.y);
                scoreText.showAnimation();
            }
        })
    }


}