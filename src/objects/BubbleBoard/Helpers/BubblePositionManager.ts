import { Bubble } from "../../Bubble";
import { BubblesBoard } from "../BubblesBoard";
import { ShootedBubble } from "../../ShootedBubble";
import { GameScene } from "../../../scenes/GameScene";

export class BubblePositionManager {
    private bubblesBoard!: BubblesBoard;
    public scene!: GameScene;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
    }

    public getPosition(row:number,column:number):any {
        let bubbleX = column * 56;
        if ((row + this.bubblesBoard.rowOffSet) % 2) {
            bubbleX += 56/2;
        }
        let bubbleY = row * this.bubblesBoard.rowHeight + 28 - this.bubblesBoard.deltaY;
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
        let firstBubbleY = this.bubblesBoard.y;
        let gridX = Math.floor((bubble.y - firstBubbleY + 28) / this.bubblesBoard.rowHeight);
        let xOffset = 0;
        if ((gridX + this.bubblesBoard.rowOffSet) % 2) {
            xOffset = bubble.width / 2;
        }
        let gridY = Math.floor((bubble.x - xOffset) / bubble.width);
        return { x: gridX, y: gridY };
    }
}