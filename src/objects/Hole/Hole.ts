import Depth from "../../game/constant/Depth";
import { GameScene } from "../../scenes/GameScene";
import { Bubble } from "../Bubble";
import { ScoreText } from "../ScoreText";

export class Hole extends Phaser.GameObjects.Image {
    public scene:GameScene;
    public body: Phaser.Physics.Arcade.Body;
    private holeNumber:number;
    private light:Phaser.GameObjects.Sprite;

    constructor(scene:GameScene, x:number, y:number,texture:string, holeNumber:number) {
        super(scene,x,y,texture);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.light = this.scene.add.sprite(0,0,'gamePlaySet');
        this.setColorLight();
        this.light.setDepth(Depth.LIGHT);
        this.holeNumber = holeNumber;
        this.body.setSize(120,10);
        this.body.setOffset(5,65);
        this.enableOverlap();
    }

    public setUpLight() {
        Phaser.Display.Align.In.Center(this.light,this,2, -18);
    }

    public setColorLight() {
        if(this.texture.key == 'orangeHole') {
            this.light.setTint(0xffd712);
        } else if(this.texture.key == 'greenHole') {
            this.light.setTint(0x00FF00);
        } else if(this.texture.key == 'purpleHole') {
            this.light.setTint(0xFF00FF);
        }
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
                this.light.anims.playAfterDelay('light',0);
            }
        })
    }


}