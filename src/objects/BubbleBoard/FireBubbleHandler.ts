import DEPTH from "../../game/constant/Depth";
import { GameScene } from "../../scenes/GameScene";
import { Bubble } from "../Bubble";
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
        this.bubblesBoard.floatingBubbles.update();
    }

    public showAnimationBubble(bubble:Bubble) {
        let tintColor = bubble.texture.key;
            bubble.on('animationstart', () => {
                bubble.setTintColor(tintColor);
            });
            bubble.setDepth(DEPTH.ANIMATIONEXPLODE);
            this.scene.scoreManager.increaseScore(bubble.score);
            bubble.anims.play('explode');
            bubble.on('animationcomplete', (animation:any,frame:any,obj:any) => {
                bubble.removeAllListeners();
                bubble.anims.remove('explode');
                bubble.clear();
                this.bubblesBoard.gridGroup.killAndHide(bubble);
            });
            this.bubblesBoard.floatingBubbles.showAnimation();
    }
}