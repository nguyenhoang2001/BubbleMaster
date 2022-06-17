import { Bubble } from "../../Bubble";
import { BubblesBoard } from "../BubblesBoard";
import { ShootedBubble } from "../../ShootedBubble";

export class BubblePositionManager {
    private bubblesBoard!: BubblesBoard;
    public scene!: Phaser.Scene;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
    }

    public getPosition(row:number,column:number):any {
        let firstBubble = this.bubblesBoard.board[0].find(n => n)!;
        let bubbleX = column * 56;
        if ((row + this.bubblesBoard.rowOffSet) % 2) {
            bubbleX += 56/2;
        }
        let bubbleY = row * this.bubblesBoard.rowHeight + firstBubble.y;
        bubbleX = bubbleX + this.bubblesBoard.x;
        return {x: bubbleX, y:bubbleY};
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

    public setNewRow(row:number,column:number,bubble:Bubble) {
        let secondBubble = this.bubblesBoard.board[1].find(n=>n)!;
        let bubbleX = column * bubble.displayWidth;
        if (((row + this.bubblesBoard.rowOffSet) % 2)!=1) {
            bubbleX += bubble.displayWidth/2;
        }
        let bubbleY = this.bubblesBoard.rowHeight;
        bubble.y = secondBubble.y;
        bubble.x = bubbleX + this.bubblesBoard.x;
        bubble.y -= bubbleY + 49;
    }

    public setPositionFromShooting(row:number,column:number,bubble:Bubble) {
        let firstBubble = this.bubblesBoard.board[0].find(n => n)!;
        let bubbleX = column * bubble.displayWidth;
        if ((row + this.bubblesBoard.rowOffSet) % 2) {
            bubbleX += bubble.displayWidth/2;
        }
        let bubbleY = row * this.bubblesBoard.rowHeight;
        bubble.y = firstBubble.y;
        bubble.x = bubbleX + this.bubblesBoard.x;
        bubble.y += bubbleY;
    }

    public getPositionFromShooting(bubble:ShootedBubble):any {
        let firstBubble = this.bubblesBoard.board[0].find(n => n)!;
        let gridX = Math.floor((bubble.y - firstBubble.y + this.bubblesBoard.rowHeight/2) / this.bubblesBoard.rowHeight);
        let xOffset = 0;
        if ((gridX + this.bubblesBoard.rowOffSet) % 2) {
            xOffset = bubble.width / 2;
        }
        let gridY = Math.floor((bubble.x - xOffset) / bubble.width);
        return { x: gridX, y: gridY };
    }
}