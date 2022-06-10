import { Bubble } from "./Bubble";
import { BubblesBoard } from "./BubblesBoard";

export class FloatingBubbleDector {
    private parent!: BubblesBoard;

    constructor(parent:BubblesBoard) {
        this.parent = parent;
    }

    public find():Bubble[] {
        this.parent.clusterDetector.resetProcess();
        let foundFloating = [];
        for(let i = 0; i < this.parent.width; i++) {
            for(let j = 0; j < this.parent.height; j++) {
                if(this.parent.isBublleExisting(i,j)) {
                    let bubble = this.parent.bubblesBoard[i][j];
                    if(!bubble.processed) {
                        let bubbleGroup = this.parent.clusterDetector.find(bubble,false,false);
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