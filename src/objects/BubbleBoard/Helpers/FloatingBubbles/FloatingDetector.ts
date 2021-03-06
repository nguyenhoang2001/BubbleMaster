import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";

export class FloatingDetector {
    private bubblesBoard!: BubblesBoard;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
    }

    public find():Bubble[] {
        this.bubblesBoard.neighbors.resetProcess();
        let foundFloating = [];
        for(let i = 0; i < this.bubblesBoard.row; i++) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                const bubble = this.bubblesBoard.board[i][j];
                if(bubble == undefined)
                    continue;
                if(this.bubblesBoard.isBublleExisting(i,j)) {
                    if(!bubble.processed) {
                        let bubbleGroup = this.bubblesBoard.clusters.findClusters(bubble,false,false);
                        if(bubbleGroup.length <= 0) {
                            continue;
                        }
                        let isFloating = true;
                        for(let k = 0; k < bubbleGroup.length; k++) {
                            if(bubbleGroup[k].row == 0) {
                                isFloating = false;
                                break;
                            }
                        }
                        if(isFloating) {
                            for(let k = 0; k <bubbleGroup.length; k++) {
                                foundFloating.push(bubbleGroup[k]);
                            }
                        }
                    }
                }
            }
        }
        return foundFloating;
    }
}