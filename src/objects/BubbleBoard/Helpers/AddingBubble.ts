import { Bubble } from "../../Bubble";
import { BubblesBoard } from "../BubblesBoard";
import { PositionBubbleHandler } from "./PositionBubbleHandler";
import { ShootedBubble } from "../../ShootedBubble";

export class AddingBubble {
    public bubblesBoard!: BubblesBoard;
    public fixedPos!: any;
    private positionHandler!: PositionBubbleHandler;
    public scene!: Phaser.Scene;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.positionHandler = new PositionBubbleHandler(this);
        this.scene = this.bubblesBoard.scene;
    }

    public addToBoard(row:number, column:number,texture?:string):Bubble {
        this.bubblesBoard.board[row][column] = this.bubblesBoard.painter.drawBubble(row,column,texture);
        this.scene.add.existing(this.bubblesBoard.board[row][column]);
        return this.bubblesBoard.board[row][column];
    }
    
    public addFromShoot(hittedBubble:Bubble,shootedBubble:ShootedBubble):Bubble {
        let gridPos = this.positionHandler.getPositionNewBubble(hittedBubble,shootedBubble);
        let bubble = this.addToBoard(gridPos.x,gridPos.y,shootedBubble.texture.key);
        return bubble;
    }

    public addMoreRow() {
        this.bubblesBoard.addNewRow(this.bubblesBoard.row);
        for(let i = this.bubblesBoard.row - 1; i >= 1; i--) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                if(i == this.bubblesBoard.row - 1) {
                    if(this.bubblesBoard.isBublleExisting(i-1,j)) {
                        this.addToBoard(i,j,this.bubblesBoard.board[i-1][j].texture.key);
                    } else {
                        this.addToBoard(i,j);
                        this.bubblesBoard.board[i][j].clear();
                    }
                } else {
                    if(this.bubblesBoard.isBublleExisting(i,j)) {
                        this.bubblesBoard.board[i][j].clear();
                        if(this.bubblesBoard.isBublleExisting(i-1,j)) {                            
                            this.addToBoard(i,j,this.bubblesBoard.board[i-1][j].texture.key);
                        } else {
                            this.addToBoard(i,j);
                            this.bubblesBoard.board[i][j].clear();
                        }
                    } else {
                        if(this.bubblesBoard.isBublleExisting(i-1,j)) {
                            this.addToBoard(i,j,this.bubblesBoard.board[i-1][j].texture.key);
                        }
                    }
                }
            }
        }
        this.bubblesBoard.scene.typeGenerator.resetCurrentType();
        for(let j = 0; j < this.bubblesBoard.column; j++) {
            if(this.bubblesBoard.isBublleExisting(0,j)) {
                this.bubblesBoard.board[0][j].clear();
            }
            this.addToBoard(0,j,this.bubblesBoard.scene.typeGenerator.getCurrentTexture());
        }
    }
}