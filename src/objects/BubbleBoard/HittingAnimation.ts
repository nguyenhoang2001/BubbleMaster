import { GameScene } from "../../scenes/GameScene";
import { Bubble } from "../Bubble";
import { BubblesBoard } from "./BubblesBoard";
import { BubbleNeighbors } from "./Helpers/BubbleNeighbors";

export class HittingAnimation {
    private bubblesBoard!: BubblesBoard;
    private scene!: GameScene;
    private neighborsHelper!: BubbleNeighbors;
    private x: number;
    private y: number;
    private offsetBounce: number;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
        this.neighborsHelper = this.bubblesBoard.neighbors;
        this.x = 0;
        this.y = 0;
        this.offsetBounce = 16;
    }

    private setUpPosition(coordinateOpposite:any,neighbor:Bubble, offset:number) {
        this.x = 0;
        this.y = 0;
        if(coordinateOpposite.y == neighbor.y) {
            this.y = neighbor.y;
            if(coordinateOpposite.x < neighbor.x) {
                this.x = neighbor.x - offset;
            } else {
                this.x = neighbor.x + offset;
            }
        } else {
            if(coordinateOpposite.x < neighbor.x) {
                this.x = neighbor.x - offset/1.75;
            } else {
                this.x = neighbor.x + offset/1.75;
            }
            if(coordinateOpposite.y < neighbor.y) {
                this.y = neighbor.y - offset;
            } else {
                this.y = neighbor.y + offset;
            }
        }
    }

    private setUpAnimation(array:Bubble[], targetedBubble:Bubble, offset:number) {
        const neighbors = array;
        neighbors.some((neighbor:Bubble) => {
            const oppositeNeighbor = this.neighborsHelper.getOppositeNeighbor(targetedBubble,neighbor);
            if(oppositeNeighbor != undefined && oppositeNeighbor != null) {
                const coordinateOpposite = this.bubblesBoard.positionManager.getCoordinate(oppositeNeighbor.row,oppositeNeighbor.column);
                let offsetValue = offset;
                if(oppositeNeighbor.row < this.bubblesBoard.row && oppositeNeighbor.row > 0) {
                    const bubble = this.bubblesBoard.board[oppositeNeighbor.row][oppositeNeighbor.column];
                    if(bubble != undefined) {
                        if(this.bubblesBoard.isBublleExisting(bubble.row,bubble.column)) {
                            offsetValue /= 2;
                        }
                    }
                }
                this.setUpPosition(coordinateOpposite,neighbor, offsetValue);
                
                this.scene.tweens.add({
                    targets:neighbor,
                    x:this.x,
                    y:this.y,
                    duration:150,
                    ease: 'Sine.easeOut',
                    yoyo:true
                });
            }
        });
    }

    public run(newBubble: Bubble) {
        this.neighborsHelper.resetProcess();
        let toWork:Bubble[] = [];
        toWork.push(newBubble);
        newBubble.processed = true;
        let initialOffset = this.offsetBounce;
        for(let i = 0; i < 4; i++) {
            let offset = initialOffset;
            initialOffset/=2;
            let neighbors:Bubble[] = [];
            let toProcess:Bubble[] = [];
            while(toWork.length > 0) {
                neighbors = [];
                let targetedBubble = toWork.pop();
                if(targetedBubble != undefined) {
                    const rawNeighbors = this.neighborsHelper.getNeighbors(targetedBubble);
                    rawNeighbors.some((bubble:Bubble) => {
                        if(!bubble.processed) {
                            bubble.processed = true;
                            // neighbor accepted
                            neighbors.push(bubble);
                            toProcess.push(bubble);
                        }
                    });
                    this.setUpAnimation(neighbors,targetedBubble,offset);
                }
            }
            toWork = toProcess;
        }
    }
}