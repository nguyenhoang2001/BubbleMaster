import { BubblesBoardState } from "../game/constant/BubblesBoardState";
import { IBubblesBoard } from "src/interfaces/objects/IBubblesBoard";
import { ICheckingFirstRowBehavior } from "src/interfaces/behaviors/ICheckingFirstRowBehavior";

export class CheckingFirstRowBehavior implements ICheckingFirstRowBehavior {
    private parent: IBubblesBoard;
    private isNeedToAdd:boolean;

    constructor(parent:IBubblesBoard) {
        this.parent = parent;
        this.isNeedToAdd = false;
    }

    public check() {
        if(this.isNeedToAdd) {
            this.parent.state = BubblesBoardState.AddingBubbleRows;
            this.isNeedToAdd = false;
        } else {
            let topBubble = this.parent.board[0].find(n=>n);
            if(topBubble != undefined) {
                if(topBubble.y >= 0) {
                    this.isNeedToAdd = true;
                }
            } else {
                this.isNeedToAdd = true;
            }
        }
    }
}