import { Bubble } from "../../Bubble";
import { BubblesBoard } from "../BubblesBoard";

export class BubbleNeighbors {
    private bubblesBoard: BubblesBoard;
    private neighborOffsets: any;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.neighborOffsets = [[[1,-1],[1,0],[0,1],[-1,0],[-1,-1],[0,-1]],
        [[1,0],[1,1],[0,1],[-1,1],[-1,0],[0,-1]]];
    }

    public resetProcess() {
        for(let i = 0; i < this.bubblesBoard.row; i++) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                const object = this.bubblesBoard.board[i][j];
                if(object == undefined)
                    continue;
                if(this.bubblesBoard.isBublleExisting(i,j))  {
                    object.processed = false;
                }
            }
        }
    }
    
    public getNeighbors(bubble:Bubble):Bubble[] {
        let bubbleRow = (bubble.row + this.bubblesBoard.rowOffSet) % 2;
        let neighbors = [];
        let offset = this.neighborOffsets[bubbleRow];
        for(let i = 0; i < offset.length; i++) {
            let neighborRow = bubble.row + offset[i][0];
            let neighborColumn = bubble.column + offset[i][1];
            if(neighborRow >= 0 && neighborRow < this.bubblesBoard.row && neighborColumn >= 0 && neighborColumn < this.bubblesBoard.column) {
                const neighborBubble = this.bubblesBoard.board[neighborRow][neighborColumn];
                if(neighborBubble == undefined)
                    continue;
                if(this.bubblesBoard.isBublleExisting(neighborRow,neighborColumn)) {
                    neighbors.push(neighborBubble);
                }

            }
        }
        return neighbors;
    }

    public getEmpty(bubble:Bubble):any[] {
        let bubbleRow = (bubble.row + this.bubblesBoard.rowOffSet) % 2;
        let empty = [];
        let offset = this.neighborOffsets[bubbleRow];
        // console.log(bubble.row, bubble.column);
        for(let i = 0; i < offset.length; i++) {
            console.log('we actually cam to this');
            let emptyRow = bubble.row + offset[i][0];
            let emptyColumn = bubble.column + offset[i][1];
            // console.log(emptyRow,emptyColumn);
            if(emptyRow >= 0 && emptyRow < this.bubblesBoard.row && emptyColumn >= 0 && emptyColumn < this.bubblesBoard.column) {
                const neighborBubble = this.bubblesBoard.board[emptyRow][emptyColumn];
                if(neighborBubble == undefined) {
                    empty.push({row:emptyRow,column:emptyColumn});
                } else {
                    if(!this.bubblesBoard.isBublleExisting(emptyRow,emptyColumn)) {
                        empty.push({row:emptyRow,column:emptyColumn});
                    }
                }
            }
        }
        return empty;
    }


    public getOppositeNeighbor(targetedBubble:Bubble, centerBubble:Bubble):any {
        const neighbors = this.getNeighbors(centerBubble);
        let isNeighbor = false;
        neighbors.some((_neighbor:Bubble) => {
            if(_neighbor == targetedBubble) {
                isNeighbor = true;
                return true;
            }
        });
        if(!isNeighbor) {
            console.log(' The targeted bubble is not the neighbor');
            return;
        }

        let oppositeRow = centerBubble.row - (targetedBubble.row - centerBubble.row);
        let oppositeColumn = 0;
        if(oppositeRow == centerBubble.row) {
            oppositeColumn = centerBubble.column - (targetedBubble.column - centerBubble.column);
        }
        else {
            if((centerBubble.row + this.bubblesBoard.rowOffSet) % 2) {
                if(targetedBubble.column > centerBubble.column) {
                    oppositeColumn = centerBubble.column;
                } else {
                    oppositeColumn = centerBubble.column + 1;
                }
            } else {
                if(targetedBubble.column < centerBubble.column) {
                    oppositeColumn = centerBubble.column;
                } else {
                    oppositeColumn = centerBubble.column - 1;
                }
            }
        }
        return {row:oppositeRow,column:oppositeColumn};
    }
}