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
    
    public getNeighbors(bubble:Bubble):Bubble[]|void {
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
        for(let i = 0; i < offset.length; i++) {
            let emptyRow = bubble.row + offset[i][0];
            let emptyColumn = bubble.column + offset[i][1];
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
}