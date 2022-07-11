import DEPTH from "../../../game/constant/Depth";
import { GameScene } from "../../../scenes/GameScene";
import { Bomb } from "../../Bomb";
import { Bubble } from "../../Bubble";
import { BubblesBoard } from "../BubblesBoard";

export class BombHandler {
    private scene: GameScene;
    private bubblesBoard: BubblesBoard;

    constructor(scene:GameScene, bubblesBoard: BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
    }


    public clearBubbles(bubbles:Bubble[]) {
        for(let i = 0; i < bubbles.length; i++) {
            bubbles[i].body.checkCollision.none = true;
            let row = bubbles[i].row;
            let column = bubbles[i].column;
            this.bubblesBoard.board[row][column] = undefined;
            bubbles[i].score = this.scene.scoreManager.getBallClusterScore();
        }
    }

    private showAnimationBubbles(bubbles:Bubble[]) {
        for(let i = 0; i < bubbles.length; i++) {
            let tintColor = bubbles[i].texture.key;
            bubbles[i].on('animationstart', () => {
                bubbles[i].setTintColor(tintColor);
            });
            bubbles[i].setDepth(DEPTH.ANIMATIONEXPLODE);
            bubbles[i].anims.playAfterDelay('explode', 100);
            
            bubbles[i].on('animationcomplete', (animation:any,frame:any,obj:any) => {
                bubbles[i].anims.remove('explode');
                bubbles[i].clear();
                this.bubblesBoard.gridGroup.killAndHide(bubbles[i]);
                bubbles[i].removeAllListeners();
            });

            bubbles[i].on('animationupdate', (animation:any,frame:any,obj:any) => {
                if(frame.index == 5) {
                    if(i == bubbles.length - 1) {
                        this.bubblesBoard.floatingBubbles.showAnimation();
                    }
                    this.scene.scoreManager.increaseScore(bubbles[i].score);
                }
            });
            
        }
    }

    public runAnimation(bubbles:Bubble[], bomb:Bomb) {
        bomb.setDepth(DEPTH.ANIMATIONBOMBEXPLODE);
        bomb.on('animationcomplete', () => {
            bomb.destroy();
        });
        bomb.anims.play('bombExplode');
        this.showAnimationBubbles(bubbles);
    }
}