import { Bubble } from "../objects/Bubble";
import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { GameScene } from "../scenes/GameScene";

export class MovingGridManager {
    private bubblesBoard: BubblesBoard;
    private velocityPerSecond: number;
    private scene: GameScene;
    private initialTimeMoving: number;
    private shooted:boolean;


    constructor(scene:GameScene, bubblesBoard:BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
        this.velocityPerSecond = 0;
        this.initialTimeMoving = 0;
        this.shooted = false;
        this.scene.events.once('shooted', ()=>{this.shooted = true;});
    }

    private updateVelocity(delta:number) {
        if(this.initialTimeMoving < 5000) {
            this.initialTimeMoving += delta;
            this.velocityPerSecond = 10;
            return;
        }
        let gridHeight = this.bubblesBoard.y + this.bubblesBoard.rowHeight*(this.bubblesBoard.row - 1) + 28;
        if(gridHeight <= 250*2) {
            this.velocityPerSecond = 20;
        } else if(gridHeight > 250*2 && gridHeight <= 149*2 + 250*2) {
            this.velocityPerSecond = 10;
        } else if(gridHeight > 149*2 + 250*2 && gridHeight <= 298*2 + 250*2) {
            this.velocityPerSecond = 5;
        } else {
            this.velocityPerSecond = 0;
            this.scene.registry.set('isGameOver', true);
        }
    }

    public moveDownBubbles(time:number,delta:number) {
        if(this.shooted) {
            this.bubblesBoard.updateRow();
            this.updateVelocity(delta);
            for(let i = 0; i < this.bubblesBoard.row; i++) {
                for(let j = 0; j < this.bubblesBoard.column; j++) {
                    const bubble = this.bubblesBoard.board[i][j];
                    if(bubble != undefined) {
                        if(this.bubblesBoard.isBublleExisting(i,j)) {
                            let deltaY = (delta * this.velocityPerSecond)/ 1000;
                            bubble.y += deltaY;
                        }
                    }
                }
            }
        }
    }
}