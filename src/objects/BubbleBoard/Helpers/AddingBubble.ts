import { Bubble } from "../../Bubble";
import { BubblesBoard } from "../BubblesBoard";
import { PositionBubbleHandler } from "./PositionBubbleHandler";
import { ShootedBubble } from "../../ShootedBubble";
import { GameScene } from "../../../scenes/GameScene";

export class AddingBubble {
    public bubblesBoard!: BubblesBoard;
    public fixedPos!: any;
    private positionHandler!: PositionBubbleHandler;
    public scene!: GameScene;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.positionHandler = new PositionBubbleHandler(this);
        this.scene = this.bubblesBoard.scene;
    }

    public toBoard(row:number, column:number,texture?:string):Bubble {
        this.bubblesBoard.board[row][column] = this.bubblesBoard.painter.drawBubble(row,column,texture);
        this.scene.add.existing(this.bubblesBoard.board[row][column]);
        return this.bubblesBoard.board[row][column];
    }
    
    public fromShoot(hittedBubble:Bubble,shootedBubble:ShootedBubble):Bubble {
        this.bubblesBoard.updateRow();
        let gridPos = this.positionHandler.getPositionNewBubble(hittedBubble,shootedBubble);
        let bubble = this.toBoard(gridPos.x,gridPos.y,shootedBubble.texture.key);
        return bubble;
    }

    private updateNewRows(numberOfRow:number) {
        for(let i = 0; i < numberOfRow; i++) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                if(this.bubblesBoard.isBublleExisting(i,j)) {
                    this.bubblesBoard.board[i][j].clear();
                }
                this.toBoard(i,j,this.bubblesBoard.scene.typeGenerator.getCurrentTexture());
                this.bubblesBoard.board[i][j].y -= numberOfRow*this.bubblesBoard.rowHeight;
            }
        }
    }

    private updateOldRows(numberOfRow:number) {
        let newRowRemains = numberOfRow;
        for(let i = this.bubblesBoard.row - 1; i >= numberOfRow; i--) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                if(i-numberOfRow >= 0) {
                    if(newRowRemains > 0) {
                        if(this.bubblesBoard.isBublleExisting(i-numberOfRow,j)) {
                            this.toBoard(i,j,this.bubblesBoard.board[i-numberOfRow][j].texture.key);
                            this.bubblesBoard.board[i][j].y -= numberOfRow*this.bubblesBoard.rowHeight;
                        }
                    } else {
                        if(this.bubblesBoard.isBublleExisting(i,j)) {
                            this.bubblesBoard.board[i][j].clear();
                            if(this.bubblesBoard.isBublleExisting(i-numberOfRow,j)) {                            
                                this.toBoard(i,j,this.bubblesBoard.board[i-numberOfRow][j].texture.key);
                                this.bubblesBoard.board[i][j].y -= numberOfRow*this.bubblesBoard.rowHeight;
                            }
                        } else {
                            if(this.bubblesBoard.isBublleExisting(i-numberOfRow,j)) {
                                this.toBoard(i,j,this.bubblesBoard.board[i-numberOfRow][j].texture.key);
                                this.bubblesBoard.board[i][j].y -= numberOfRow*this.bubblesBoard.rowHeight;
                            }
                        }
                    }
                }
            }
            newRowRemains -= 1;
        }
    }

    public moreBubbleRows(numberOfRow:number) {
        if(numberOfRow <= 0)
            return;
        this.bubblesBoard.updateRow();
        this.scene.typeGenerator.resetCurrentType();
        for(let i = 0; i < numberOfRow; i++) {
            this.bubblesBoard.addNewRow();
        }
        this.updateOldRows(numberOfRow);
        this.updateNewRows(numberOfRow);
        // this.bubblesBoard.scrollDownHelper.run(numberOfRow);
    }
}