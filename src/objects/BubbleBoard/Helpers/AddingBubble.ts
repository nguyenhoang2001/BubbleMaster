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

    public addToBoard(row:number, column:number,texture?:string):Bubble {
        this.bubblesBoard.board[row][column] = this.bubblesBoard.painter.drawBubble(row,column,texture);
        this.scene.add.existing(this.bubblesBoard.board[row][column]);
        return this.bubblesBoard.board[row][column];
    }
    
    public addFromShoot(hittedBubble:Bubble,shootedBubble:ShootedBubble):Bubble {
        this.bubblesBoard.updateRow();
        let gridPos = this.positionHandler.getPositionNewBubble(hittedBubble,shootedBubble);
        let bubble = this.addToBoard(gridPos.x,gridPos.y,shootedBubble.texture.key);
        return bubble;
    }

    public addMoreRows(numberOfRow:number) {
        if(numberOfRow <= 0)
            return;
        this.bubblesBoard.updateRow();
        this.scene.typeGenerator.resetCurrentType();
        for(let i = 0; i < numberOfRow; i++) {
            this.bubblesBoard.addNewRow();
        }
        let newRowRemains = numberOfRow;
        for(let i = this.bubblesBoard.row - 1; i >= numberOfRow; i--) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                if(i-numberOfRow >= 0) {
                    if(newRowRemains > 0) {
                        if(this.bubblesBoard.isBublleExisting(i-numberOfRow,j)) {
                            this.addToBoard(i,j,this.bubblesBoard.board[i-numberOfRow][j].texture.key);
                        } else {
                            this.addToBoard(i,j);
                            this.bubblesBoard.board[i][j].clear();
                        }
                    } else {
                        if(this.bubblesBoard.isBublleExisting(i,j)) {
                            this.bubblesBoard.board[i][j].clear();
                            if(this.bubblesBoard.isBublleExisting(i-numberOfRow,j)) {                            
                                this.addToBoard(i,j,this.bubblesBoard.board[i-numberOfRow][j].texture.key);
                            } else {
                                this.addToBoard(i,j);
                                this.bubblesBoard.board[i][j].clear();
                            }
                        } else {
                            if(this.bubblesBoard.isBublleExisting(i-numberOfRow,j)) {
                                this.addToBoard(i,j,this.bubblesBoard.board[i-numberOfRow][j].texture.key);
                            }
                        }
                    }
                }
            }
            newRowRemains -= 1;
        }
        for(let i = 0; i < numberOfRow; i++) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                if(this.bubblesBoard.isBublleExisting(i,j)) {
                    this.bubblesBoard.board[i][j].clear();
                }
                this.addToBoard(i,j,this.bubblesBoard.scene.typeGenerator.getCurrentTexture());
            }
        }
    }
}