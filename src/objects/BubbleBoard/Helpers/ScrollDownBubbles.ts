import { GameScene } from "../../../scenes/GameScene";
import { BubblesBoard } from "../BubblesBoard";

export class ScorllDownBubbles {
    private bubblesBoard!: BubblesBoard;
    public scene!: GameScene;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
    }

    public run(numberOfRow:number) {
        for(let i = 0 ; i < this.bubblesBoard.row; i++) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                if(this.bubblesBoard.isBublleExisting(i,j)) {
                    this.scene.tweens.add({
                        targets:this.bubblesBoard.board[i][j],
                        y: this.bubblesBoard.board[i][j].y + numberOfRow*this.bubblesBoard.rowHeight,
                        ease: 'Power1',
                        duration: 1000
                    });
                }
            }
        }
    }
}