import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";

export class ClusterDetector {
    private parent!: BubblesBoard;
    private neighborOffsets!: any;

    constructor(parent:BubblesBoard) {
        this.parent = parent;
        this.neighborOffsets = [[[1,-1],[1,0],[0,1],[-1,0],[-1,-1],[0,-1]],
                                [[1,0],[1,1],[0,1],[-1,1],[-1,0],[0,-1]]];
    }

    public resetProcess() {
        for(let i = 0; i < this.parent.row; i++) {
            for(let j = 0; j < this.parent.column; j++) {
                const object = this.parent.board[i][j];
                if(object == undefined)
                    continue;
                if(this.parent.isBublleExisting(i,j))  {
                    object.processed = false;
                }
            }
        }
    }

    private getNeighbors(bubble:Bubble):Bubble[]|void {
        let bubbleRow = (bubble.row + this.parent.rowOffSet) % 2;
        let neighbors = [];
        let offset = this.neighborOffsets[bubbleRow];
        for(let i = 0; i < offset.length; i++) {
            let neighborRow = bubble.row + offset[i][0];
            let neighborColumn = bubble.column + offset[i][1];
            if(neighborRow >= 0 && neighborRow < this.parent.row && neighborColumn >= 0 && neighborColumn < this.parent.column) {
                const neighborBubble = this.parent.board[neighborRow][neighborColumn];
                if(neighborBubble == undefined)
                    continue;
                if(this.parent.isBublleExisting(neighborRow,neighborColumn) && !neighborBubble.processed) {
                    neighbors.push(neighborBubble);
                }
            }
        }
        return neighbors;
    }

    public find(targetedBubble:Bubble, reset:boolean, matchType:boolean):Bubble[] {
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
                    if(!matchType || currentBubble.texture.key == targetedBubble.texture.key) {
                        foundCluster.push(currentBubble);
                        const neighbors = this.getNeighbors(currentBubble);
                        if(neighbors == undefined)
                            continue;
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