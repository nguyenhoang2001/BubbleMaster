import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { PositionBubbleHandler } from "./PositionBubbleHandler";
import { ShootedBubble } from "../../../ShootedBubble";
import { GameScene } from "../../../../scenes/GameScene";

export class AddingBubble {
    public bubblesBoard!: BubblesBoard;
    public fixedPos!: any;
    private positionHandler!: PositionBubbleHandler;
    public scene!: GameScene;
    public finishedAdding!: boolean;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.positionHandler = new PositionBubbleHandler(this);
        this.scene = this.bubblesBoard.scene;
        this.finishedAdding = false;
    }

    public toBoard(row:number, column:number,texture?:string):Bubble {
        this.bubblesBoard.board[row][column] = this.bubblesBoard.painter.drawBubble(row,column,texture);
        this.scene.add.existing(this.bubblesBoard.board[row][column]);
        return this.bubblesBoard.board[row][column];
    }

    private toBoardFromShoot(row:number, column:number,texture?:string):Bubble {
        this.bubblesBoard.board[row][column] = this.bubblesBoard.painter.drawBubbleFromShoot(row,column,texture);
        this.scene.add.existing(this.bubblesBoard.board[row][column]);
        return this.bubblesBoard.board[row][column];
    }
    
    public fromShoot(hittedBubble:Bubble,shootedBubble:ShootedBubble):Bubble {
        this.finishedAdding = false;
        let gridPos = this.positionHandler.getPositionNewBubble(hittedBubble,shootedBubble);
        let bubble = this.toBoardFromShoot(gridPos.x,gridPos.y,shootedBubble.texture.key);
        this.bubblesBoard.colliderBubble.colliderBubbleAndShoot(bubble,this.scene.shooter.shootedBubble);
        this.finishedAdding = true;
        return bubble;
    }

    public moreBubbleRows(numberOfRow:number) {
        if(numberOfRow <= 0)
            return;
        while(numberOfRow > 0) {
            this.bubblesBoard.invertRowOffset();
            this.scene.typeGenerator.resetCurrentType();
            this.bubblesBoard.board.unshift([]);
            this.bubblesBoard.row += 1;
            for(let i = 1; i < this.bubblesBoard.row; i++) {
                for(let j = 0; j < this.bubblesBoard.column; j++) {
                    if(this.bubblesBoard.isBublleExisting(i,j)) {
                        this.bubblesBoard.board[i][j].row += 1;
                    }
                }
            }
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                this.bubblesBoard.board[0][j] = new Bubble(this.scene,0,0,0,j,this.scene.typeGenerator.getCurrentTexture());
                this.scene.add.existing(this.bubblesBoard.board[0][j]);
                let bubbleX = j * 56;
                if(this.bubblesBoard.rowOffSet % 2) {
                    bubbleX += 28;
                }
                this.bubblesBoard.board[0][j].x = bubbleX + this.bubblesBoard.x;
                let bellowBubble = this.bubblesBoard.board[1].find(n => n)!;
                this.bubblesBoard.board[0][j].y = bellowBubble.y - 49;
            }
            numberOfRow -= 1;
        }
    }
}