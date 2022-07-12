import DEPTH from "../../game/constant/Depth";
import { GameScene } from "../../scenes/GameScene";
import { Bubble } from "../Bubble";
import { ScoreText } from "../ScoreText";
import { BubblesBoard } from "./BubblesBoard";

export class FireBubbleHandler {
    private scene: GameScene;
    private bubblesBoard: BubblesBoard;

    constructor(scene:GameScene, bubblesBoard: BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
    }

    public clearBubble(bubble: Bubble) {
        bubble.body.checkCollision.none = true;
        let row = bubble.row;
        let column = bubble.column;
        this.bubblesBoard.board[row][column] = undefined;
        bubble.score = this.scene.scoreManager.getBallClusterScore();
    }

    public showAnimationBubble(bubble:Bubble) {
        let scoreText = new ScoreText(this.scene,bubble.x,bubble.y,bubble.score.toString());
            scoreText.showAnimation(0);
        let tintColor = bubble.texture.key;
            bubble.on('animationstart', () => {
                bubble.setTintColor(tintColor);
            });
            bubble.setDepth(DEPTH.ANIMATIONEXPLODE);
            bubble.anims.playAfterDelay('explode',0);

            bubble.on('animationupdate', (animation:any,frame:any,obj:any) => {
                if(frame.index == 15) {
                    this.bubblesBoard.floatingBubbles.showAnimation();
                    this.scene.scoreManager.increaseScore(bubble.score);
                }
            });

            bubble.on('animationcomplete', (animation:any,frame:any,obj:any) => {
                bubble.anims.remove('explode');
                bubble.clear();
                this.bubblesBoard.gridGroup.killAndHide(bubble);
                bubble.removeAllListeners();
            });
    }
}