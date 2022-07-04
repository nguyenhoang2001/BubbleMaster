import { Bubble } from "../objects/Bubble";
import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { GameScene } from "../scenes/GameScene";

export class MovingGridManager {
    private bubblesBoard!: BubblesBoard;
    private velocityPerSecond!: number;
    private scene!: GameScene;


    constructor(scene:GameScene, bubblesBoard:BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
        this.velocityPerSecond = 0;
    }

    private updateVelocity() {
        let gridHeight = this.bubblesBoard.y + this.bubblesBoard.rowHeight*(this.bubblesBoard.row - 1) + 28;
        if(gridHeight <= 250*2) {
            this.velocityPerSecond = 50;
        } else if(gridHeight > 250*2 && gridHeight <= 298*2 +  250*2) {
            this.velocityPerSecond = 20;
        } else {
            this.velocityPerSecond = 0;
        }
    }


    public moveDownBubbles(time:number,delta:number) {
        this.bubblesBoard.updateRow();
        this.updateVelocity();
        this.bubblesBoard.gridGroup.getChildren().forEach((_bubble:any) => {
            let bubble = _bubble as Bubble;
            if(bubble.visible == true) {
                if(bubble.body.velocity.x == 0  && bubble.body.velocity.y == 0 && bubble.body.gravity.y == 0) {
                    let deltaY = (delta * this.velocityPerSecond)/ 1000;
                    bubble.y += deltaY;
                }
            }
        });
    }
}