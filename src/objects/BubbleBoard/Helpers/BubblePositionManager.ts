import { Bubble } from "../../Bubble";
import { BubblesBoard } from "../BubblesBoard";
import { GameScene } from "../../../scenes/GameScene";

export class BubblePositionManager {
    private bubblesBoard: BubblesBoard;
    public scene: GameScene;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
    }

    public setPosition(row:number,column:number,bubble:Bubble) {
        let bubbleX = column * bubble.displayWidth;
        if ((row + this.bubblesBoard.rowOffSet) % 2) {
            bubbleX += bubble.displayWidth/2;
        }
        let bubbleY = row * this.bubblesBoard.rowHeight;
        bubble.x = bubbleX + this.bubblesBoard.x;
        bubble.y = bubbleY + this.bubblesBoard.y;
    }

    public setPositionFromShooting(row:number,column:number,bubble:Bubble) {
        let firstBubble = this.bubblesBoard.board[0].find(n => n);
        if(firstBubble == undefined)
            return;
        
        let bubbleX = column * bubble.displayWidth;
        if ((row + this.bubblesBoard.rowOffSet) % 2) {
            bubbleX += bubble.displayWidth/2;
        }
        let bubbleY = row * this.bubblesBoard.rowHeight;
        bubble.y = firstBubble.y;
        bubble.x = bubbleX + this.bubblesBoard.x;
        bubble.y += bubbleY;
    }

    public getCoordinate(row:number, column:number) {
        let firstBubble = this.bubblesBoard.board[0].find(n => n);
        if(firstBubble == undefined) 
            return;
        let bubbleX = column * 56;
        if ((row + this.bubblesBoard.rowOffSet) % 2) {
            bubbleX += 28;
        }
        let bubbleY = row * this.bubblesBoard.rowHeight;
        bubbleY += firstBubble.y;
        bubbleX += this.bubblesBoard.x;
        return {x:bubbleX, y:bubbleY};
    }
}