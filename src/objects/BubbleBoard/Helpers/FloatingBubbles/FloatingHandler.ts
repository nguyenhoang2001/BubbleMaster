import { GameScene } from "../../../../scenes/GameScene";
import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { FloatingBubbles } from "./FloatingBubbles";

export class FloatingHandler {
    private scene!: GameScene;
    private floatingBubbles!: FloatingBubbles;
    private bubblesBoard!: BubblesBoard;

    constructor(scene:GameScene,floatingBubbles:FloatingBubbles, bubblesBoard:BubblesBoard) {
        this.scene = scene;
        this.floatingBubbles = floatingBubbles;
        this.bubblesBoard = bubblesBoard;
    }

    public clearFloating(floatingBubbles:Bubble[]) {
        console.log('floating are');
        console.log(JSON.parse(JSON.stringify(floatingBubbles)));
        for(let i = 0; i< floatingBubbles.length; i++) {
            floatingBubbles[i].setDepth(1);
            floatingBubbles[i].body.checkCollision.none = true;
            floatingBubbles[i].clear();
            let row = floatingBubbles[i].row;
            let column = floatingBubbles[i].column;
            this.bubblesBoard.board[row][column] = undefined;
            this.scene.tweens.add({
                targets:floatingBubbles[i],
                y: floatingBubbles[i].y - 200,
                ease:'Cubic.easeOut',
                duration: 300,
                onComplete: () => {
                    console.log('finish flying up');
                    this.scene.tweens.add({
                        targets:floatingBubbles[i],
                        y: this.scene.sys.canvas.height + 28,
                        ease:'Cubic.easeIn',
                        duration: Phaser.Math.Between(400, 500),
                        onComplete: () => {
                            floatingBubbles[i].setDepth(0);
                            this.floatingBubbles.remains -= 1;
                            this.bubblesBoard.gridGroup.killAndHide(floatingBubbles[i]);
                        }
                    });
                }
            });
        }
    }
}