import { GameScene } from "../../../scenes/GameScene";
import { Bubble } from "../../Bubble";
import { BubblesBoard } from "../BubblesBoard";

export class BubblePainter {
    private bubblesBoard!: BubblesBoard;
    public scene!: GameScene;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
    }

    public drawBubble(row:number, column:number, texture?:string):Bubble {
        let bubbleType = this.scene.typeGenerator.getTexture();
        let bubble = new Bubble(this.scene,0,0,row,column,bubbleType);
        if(texture != undefined) {
            bubble.setTexture(texture);
        }
        this.bubblesBoard.positionManager.setCoordinateBubble(row,column,bubble);
        return bubble;
    }

    public drawBubblesBoard() {
        for(let i = 0; i < this.bubblesBoard.row; i++) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                this.bubblesBoard.addingManager.addToBoard(i,j);
            }
            this.scene.addBubblesToContainer(this.bubblesBoard.board[i]);
        }
    }
}