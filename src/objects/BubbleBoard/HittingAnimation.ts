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
    private offsetcollide: number;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
        this.neighborsHelper = this.bubblesBoard.neighbors;
        this.x = 0;
        this.y = 0;
        this.offsetcollide = 15;
    }

    private setUp(coordinateOpposite:any,neighbor:Bubble) {
        this.x = 0;
        this.y = 0;
        if(coordinateOpposite.y == neighbor.y) {
            this.y = neighbor.y;
            if(coordinateOpposite.x < neighbor.x) {
                this.x = neighbor.x - this.offsetcollide;
            } else {
                this.x = neighbor.x + this.offsetcollide;
            }
        } else {
            if(coordinateOpposite.x < neighbor.x) {
                this.x = neighbor.x - this.offsetcollide/1.75;
            } else {
                this.x = neighbor.x + this.offsetcollide/1.75;
            }
            if(coordinateOpposite.y < neighbor.y) {
                this.y = neighbor.y - this.offsetcollide;
            } else {
                this.y = neighbor.y + this.offsetcollide;
            }
        }
    }

    public run(newBubble: Bubble) {
        const neighbors = this.neighborsHelper.getNeighbors(newBubble);
            neighbors.some((neighbor:Bubble) => {
                const oppositeNeighbor = this.neighborsHelper.getOppositeNeighbor(newBubble,neighbor);
                if(oppositeNeighbor != undefined && oppositeNeighbor != null) {
                    const coordinateOpposite = this.bubblesBoard.positionManager.getCoordinate(oppositeNeighbor.row,oppositeNeighbor.column);
                    this.offsetcollide = 15;
                    if(oppositeNeighbor.row < this.bubblesBoard.row && oppositeNeighbor.row > 0) {
                        const bubble = this.bubblesBoard.board[oppositeNeighbor.row][oppositeNeighbor.column];
                        if(bubble != undefined) {
                            if(this.bubblesBoard.isBublleExisting(bubble.row,bubble.column)) {
                                this.offsetcollide /= 2;
                            }
                        }
                    }
                    this.setUp(coordinateOpposite,neighbor);
                    
                    this.scene.tweens.add({
                        targets:neighbor,
                        x:this.x,
                        y:this.y,
                        duration:100,
                        ease: 'Power1',
                        yoyo:true
                    });
                }
            });
    }
}