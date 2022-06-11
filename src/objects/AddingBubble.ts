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
    
    public addFromShoot(hittedBubble:Bubble,shootedBubble:ShootedBubble):Bubble {
        let gridPos = this.positionHandler.getPositionNewBubble(hittedBubble,shootedBubble);
        let bubble = this.bubblesBoard.addToBoard(gridPos.x,gridPos.y,shootedBubble.texture.key);
        return bubble;
    }

    public addMore() {
        this.bubblesBoard.addNewRow(this.bubblesBoard.width);
        for(let i = this.bubblesBoard.width - 1; i >= 1; i--) {
            for(let j = 0; j < this.bubblesBoard.height; j++) {
                if(i == this.bubblesBoard.width - 1) {
                    if(this.bubblesBoard.isBublleExisting(i-1,j)) {
                        this.bubblesBoard.addToBoard(i,j,this.bubblesBoard.bubblesBoard[i-1][j].texture.key);
                    } else {
                        this.bubblesBoard.addToBoard(i,j);
                        this.bubblesBoard.bubblesBoard[i][j].clear();
                    }
                } else {
                    if(this.bubblesBoard.isBublleExisting(i,j)) {
                        this.bubblesBoard.bubblesBoard[i][j].clear();
                        if(this.bubblesBoard.isBublleExisting(i-1,j)) {                            
                            this.bubblesBoard.addToBoard(i,j,this.bubblesBoard.bubblesBoard[i-1][j].texture.key);
                        } else {
                            this.bubblesBoard.addToBoard(i,j);
                            this.bubblesBoard.bubblesBoard[i][j].clear();
                        }
                    } else {
                        if(this.bubblesBoard.isBublleExisting(i-1,j)) {
                            this.bubblesBoard.addToBoard(i,j,this.bubblesBoard.bubblesBoard[i-1][j].texture.key);
                        }
                    }
                }
            }
        }
        this.bubblesBoard.scene.typeGenerator.resetCurrentType();
        for(let j = 0; j < this.bubblesBoard.height; j++) {
            if(this.bubblesBoard.isBublleExisting(0,j)) {
                this.bubblesBoard.bubblesBoard[0][j].clear();
            }
            this.bubblesBoard.addToBoard(0,j,this.bubblesBoard.scene.typeGenerator.getCurrentTexture());
        }
    }
}