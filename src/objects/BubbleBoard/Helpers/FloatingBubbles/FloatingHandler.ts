import DEPTH from "../../../../game/constant/Depth";
import { GameScene } from "../../../../scenes/GameScene";
import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { FloatingBubbles } from "./FloatingBubbles";

export class FloatingHandler {
    private scene: GameScene;
    private floatingBubbles: FloatingBubbles;
    private bubblesBoard: BubblesBoard;
    private floatings: Bubble[][];

    constructor(scene:GameScene,floatingBubbles:FloatingBubbles, bubblesBoard:BubblesBoard) {
        this.scene = scene;
        this.floatingBubbles = floatingBubbles;
        this.bubblesBoard = bubblesBoard;
        this.floatings = [];
    }

    private getRandomValue(min:number, max:number):number {
        const delta = max - min;
        const initialRandom = Math.random();
        const multiplied = initialRandom * delta;
        const floored = Math.floor(multiplied);
        const answer = floored + min;
        return answer;
    }


    public runAnimation() {
        let array = this.floatings.shift();
        if(array != undefined) {
            array.forEach((bubble: Bubble) => {
                bubble.isOutGrid = true;
                bubble.body.checkCollision.none = false;
                let gravityY = this.getRandomValue(2800,3000);
                let velocity = this.getRandomValue(350,400);
                let angle = this.getRandomValue(10,190);
                bubble.body.setGravityY(gravityY);
                this.scene.physics.velocityFromRotation (
                    angle*Phaser.Math.DEG_TO_RAD,
                    velocity,
                    bubble.body.velocity
                );
                bubble.body.setImmovable(false);
                bubble.body.setBounce(0.6,0.6);
                bubble.body.setCollideWorldBounds(true,0.6,0.6,false);
            });
        }
    }

    public clearFloating() {
        let array = this.floatingBubbles.array;
        this.floatings.push(array);
        array.forEach((bubble: Bubble) => {
            let row = bubble.row;
            let column = bubble.column;
            this.bubblesBoard.board[row][column] = undefined;
            bubble.body.checkCollision.none = true;
            bubble.setDepth(DEPTH.FALLBALL);
        });
    }
}