import { Bubble } from "../objects/Bubble";
import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { GameScene } from "../scenes/GameScene";

export class MovingGridManager {
    private bubblesBoard!: BubblesBoard;
    private velocityPerSecond!: number;
    private scene!: GameScene;
    private initialTimeMoving!: number;


    constructor(scene:GameScene, bubblesBoard:BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
        this.velocityPerSecond = 0;
        this.initialTimeMoving = 0;
    }

    private updateVelocity(delta:number) {
        if(this.initialTimeMoving < 5000) {
            this.initialTimeMoving += delta;
            this.velocityPerSecond = 5;
            return;
        }
        let gridHeight = this.bubblesBoard.y + this.bubblesBoard.rowHeight*(this.bubblesBoard.row - 1) + 28;
        if(gridHeight <= 250*2) {
            this.velocityPerSecond = 40;
        } else if(gridHeight > 250*2 && gridHeight <= 298*2 +  250*2) {
            this.velocityPerSecond = 20;
        } else {
            this.velocityPerSecond = 0;
            this.scene.registry.set('isGameOver', true);
        }
    }

    public moveDownBubbles(time:number,delta:number) {
        this.bubblesBoard.updateRow();
        this.updateVelocity(delta);

        // this.bubblesBoard.gridGroup.getChildren().forEach((_bubble:any) => {
        //     let bubble = _bubble as Bubble;
        //     if(bubble.visible == true) {
        //         if(bubble.body.gravity.y == 0 && bubble.body.velocity.y == 0) {
        //             let deltaY = (delta * this.velocityPerSecond)/ 1000;
        //             bubble.y += deltaY;
        //         }
        //     }
        // });

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