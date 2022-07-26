import Depth from "../game/constant/Depth";
import { IBubblesBoard } from "src/interfaces/IBubblesBoard";
import { Bubble } from "src/objects/Bubble";
import { ShootedBubble } from "src/objects/ShootedBubble";

export class HittingFireBallBehavior {
    private parent: IBubblesBoard;

    constructor(parent:IBubblesBoard) {
        this.parent = parent;
    }

    private clearBubble(bubble: Bubble) {
        bubble.body.checkCollision.none = true;
        let row = bubble.row;
        let column = bubble.column;
        this.parent.board[row][column] = undefined;
        bubble.score = this.parent.scene.scoreManager.getBallClusterScore();
    }

    private showAnimationBubble(bubble:Bubble) {
        
        let scoreText = this.parent.scoreGroup.getScoreText();
        scoreText.setText(bubble.score.toString());
        scoreText.setPosition(bubble.x,bubble.y);
        

        scoreText.showAnimation();
        let tintColor = bubble.texture.key;
            bubble.on('animationstart', () => {
                bubble.setTintColor(tintColor);
            });
            bubble.setDepth(Depth.ANIMATIONEXPLODE);
            bubble.anims.playAfterDelay('explode',0);

            bubble.on('animationupdate', (animation:any,frame:any,obj:any) => {
                if(frame.index == 15) {
                    this.parent.floatingBubbles.showAnimation();
                    this.parent.scene.scoreManager.increaseScore(bubble.score);
                }
            });

            bubble.on('animationcomplete', (animation:any,frame:any,obj:any) => {
                bubble.anims.remove('explode');
                bubble.clear();
                this.parent.gridGroup.killAndHide(bubble);
                bubble.removeAllListeners();
            });
    }

    public hit(hittedBubble:Bubble, shootedBubble:ShootedBubble) {
        this.parent.scene.scoreManager.calculateScore();
        this.clearBubble(hittedBubble);
        this.showAnimationBubble(hittedBubble);
    }
}