import { Bubble } from "./Bubble";
import { BubblesBoard } from "./BubblesBoard";

export class ClusterDetector {
    private parent!: BubblesBoard;
    private neighborOffsets!: any;

    constructor(parent:BubblesBoard) {
        this.parent = parent;
        this.neighborOffsets = [[[1,-1],[1,0],[0,1],[-1,0],[-1,-1],[0,-1]],
                                [[1,0],[1,1],[0,1],[-1,1],[-1,0],[0,-1]]];
    }

    private resetProcess() {
        for(let i = 0; i < this.parent.width; i++) {
            for(let j = 0; j < this.parent.height; j++) {
                if(this.parent.bubblesBoard[i] != undefined ) {
                    if(this.parent.bubblesBoard[i][j] != undefined && this.parent.bubblesBoard[i][j].visible)  {
                        this.parent.bubblesBoard[i][j].processed = false;
                    }
                }
            }
        }
    }

    private getNeighbors(bubble:Bubble):Bubble[] {
        let bubbleRow = (bubble.row + this.parent.rowOffSet) % 2;
        let neighbors = [];
        let offset = this.neighborOffsets[bubbleRow];
        for(let i = 0; i < offset.length; i++) {
            let neighborRow = bubble.row + offset[i][0];
            let neighborColumn = bubble.column + offset[i][1];
            if(neighborRow >= 0 && neighborRow < this.parent.width && neighborColumn >= 0 && neighborColumn < this.parent.height) {
                let neighborBubble = this.parent.bubblesBoard[neighborRow][neighborColumn];
                if(neighborBubble != undefined && neighborBubble.visible && !neighborBubble.processed) {
                    neighbors.push(neighborBubble);
                }
            }
        }
        return neighbors;
    }

    public find(targetedBubble:Bubble, reset:boolean):Bubble[] {
        if(reset) {
            this.resetProcess();
        }
        let toProcess = [targetedBubble];
        targetedBubble.processed = true;
        let foundCluster = [];
        while(toProcess.length > 0) {
            let currentBubble = toProcess.pop();
            if(currentBubble == undefined) {
                continue;
            } else {
                if(currentBubble.visible) {
                    if(currentBubble.texture.key == targetedBubble.texture.key) {
                        foundCluster.push(currentBubble);
                        let neighbors = this.getNeighbors(currentBubble);
                        for(let i = 0; i < neighbors.length; i++) {
                            if(!neighbors[i].processed) {
                                neighbors[i].processed = true;
                                toProcess.push(neighbors[i]);
                            }
                        }
                    }
                }

            }
        }
        return foundCluster;
    }
}