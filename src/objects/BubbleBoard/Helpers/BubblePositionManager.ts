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

    public getCoordinateBubble(row:number,column:number):any {
        let bubbleX = column * 56;
        if ((row + this.bubblesBoard.rowOffSet) % 2) {
            bubbleX += 56/2;
        }
        let bubbleY = row * this.bubblesBoard.rowHeight;
        bubbleX = bubbleX + this.bubblesBoard.x;
        bubbleY = bubbleY + this.bubblesBoard.y;
        return {x: bubbleX, y:bubbleY};
    }

    public setCoordinateBubble(row:number,column:number,bubble:Bubble) {
        let bubbleX = column * bubble.displayWidth;
        if ((row + this.bubblesBoard.rowOffSet) % 2) {
            bubbleX += bubble.displayWidth/2;
        }
        let bubbleY = row * this.bubblesBoard.rowHeight;
        bubble.x = bubbleX + this.bubblesBoard.x;
        bubble.y = bubbleY + this.bubblesBoard.y;
    }

    public getIndexBubble(bubble:ShootedBubble): any {
        let gridX = Math.floor((bubble.y) / this.bubblesBoard.rowHeight);
        let xOffset = 0;
        if ((gridX + this.bubblesBoard.rowOffSet) % 2) {
            xOffset = bubble.width / 2;
        }
        let gridY = Math.floor((bubble.x - xOffset) / bubble.width);
        return { x: gridX, y: gridY };
    }
}