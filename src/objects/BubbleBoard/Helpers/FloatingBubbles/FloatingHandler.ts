import { GameScene } from "../../../../scenes/GameScene";
import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { FloatingBubbles } from "./FloatingBubbles";

export class FloatingHandler {
    private scene: GameScene;
    private floatingBubbles: FloatingBubbles;
    private bubblesBoard: BubblesBoard;

    constructor(scene:GameScene,floatingBubbles:FloatingBubbles, bubblesBoard:BubblesBoard) {
        this.scene = scene;
        this.floatingBubbles = floatingBubbles;
        this.bubblesBoard = bubblesBoard;
    }

    private getRandomValue(min:number, max:number):number {
        const delta = max - min;
        const initialRandom = Math.random();
        const multiplied = initialRandom * delta;
        const floored = Math.floor(multiplied);
        const answer = floored + min;
        return answer;
    }

    public clearFloating() {
        console.log('floating are');
        let array = this.floatingBubbles.array;
        console.log(JSON.parse(JSON.stringify(array)));
        array.forEach((bubble: Bubble) => {
            bubble.setDepth(1);
            let row = bubble.row;
            let column = bubble.column;
            this.bubblesBoard.board[row][column] = undefined;            
            let gravityY = this.getRandomValue(2800,3000);
            let velocity = this.getRandomValue(350,400);
            let angle = this.getRandomValue(10,190);
            this.floatingBubbles.remains -= 1;

            bubble.body.setGravityY(gravityY);
            this.scene.physics.velocityFromRotation (
                angle*Phaser.Math.DEG_TO_RAD,
                velocity,
                bubble.body.velocity
            );
            bubble.body.setImmovable(false);
            bubble.body.setCollideWorldBounds(true,0.5,0.5,false);
            bubble.body.setBounce(0.5,0.5);
        })
    }
}