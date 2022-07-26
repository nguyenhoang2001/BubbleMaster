import { ICheckingShotguideHitGridBehavior } from "src/interfaces/behaviors/ICheckingShotguideHitGridBehavior";
import { IShotguide } from "src/interfaces/objects/IShotguide";
import { BubblesBoard } from "src/objects/BubbleBoard/BubblesBoard";

export class CheckingShotguideHitGridBehavior implements ICheckingShotguideHitGridBehavior {
    private parent: IShotguide;
    
    constructor(parent:IShotguide) {
        this.parent = parent;
    }

    public check(x:number,y:number, hitRange:number, bubblesBoard:BubblesBoard): boolean {
        let hittedBubble = false;
        for(let i = bubblesBoard.row - 1; i >= 0; i--) {
            for(let j = 0; j < bubblesBoard.column; j++) {
                const bubble = bubblesBoard.board[i][j];
                if(bubble != undefined) {
                    if(bubblesBoard.isBublleExisting(i,j)) {
                        let bubbleY = bubble.y;
                        let distance = Phaser.Math.Distance.Between(x,y,bubble.x,bubbleY);
                        if(distance <= hitRange) {
                            hittedBubble = true;
                            break;
                        }
                    }
                }
            }
            if(hittedBubble)
                break;
        }
        return hittedBubble;
    }
}