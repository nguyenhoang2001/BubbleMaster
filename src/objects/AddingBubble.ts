import { Bubble } from "./Bubble";
import { BubblesBoard } from "./BubblesBoard";
import { PositionBubbleHandler } from "./PositionBubbleHandler";
import { ShootedBubble } from "./ShootedBubble";

export class AddingBubble {
    public bubblesBoard!: BubblesBoard;
    public fixedPos!: any;
    private positionHandler!: PositionBubbleHandler;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.positionHandler = new PositionBubbleHandler(this);
    }
    
    public addNewBubble(hittedBubble:Bubble,shootedBubble:ShootedBubble):Bubble {
        let gridPos = this.positionHandler.getPositionNewBubble(hittedBubble,shootedBubble);
        let bubble = this.bubblesBoard.drawBubble(gridPos.x,gridPos.y,shootedBubble.texture.key);
        this.bubblesBoard.bubblesBoard[gridPos.x][gridPos.y] = bubble;
        this.bubblesBoard.scene.add.existing(bubble);
        return bubble;
    }
}