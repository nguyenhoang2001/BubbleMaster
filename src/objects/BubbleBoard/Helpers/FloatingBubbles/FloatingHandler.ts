import Depth from "../../../../game/constant/Depth";
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
                bubble.tween?.stop();
                let velocityY = this.getRandomValue(-150*2,-75*2);
                let velocityX = this.getRandomValue(-250*2,250*2);
                bubble.body.setGravityY(1800);

                bubble.body.setVelocity(velocityX,velocityY);
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
            bubble.setDepth(Depth.FALLBALL);
        });
    }
}