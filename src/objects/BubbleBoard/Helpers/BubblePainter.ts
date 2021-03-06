// import { logicGame } from "../../../game";
import DEPTH from "../../../game/constant/Depth";
import { GameScene } from "../../../scenes/GameScene";
import { Bubble } from "../../Bubble";
import { BubblesBoard } from "../BubblesBoard";

export class BubblePainter {
    private bubblesBoard: BubblesBoard;
    public scene: GameScene;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
    }

    private createBubble(row:number, column:number, texture?:string):Bubble {
        let bubble = this.bubblesBoard.gridGroup.get(0,0,'',undefined,true);
        bubble.setOrigin(0.5,0.5);
        bubble.row = row;
        bubble.column = column;
        bubble.setDepth(DEPTH.GRIDBALL);
        if(texture != undefined) {
            bubble.setTexture(texture);
        } else {
            let bubbleType = this.scene.colorManager.getTexture();
            bubble.setTexture(bubbleType);
        }
        return bubble;
    }

    public drawBubble(row:number, column:number, texture?:string):Bubble {
        let bubble = this.createBubble(row,column,texture);
        this.bubblesBoard.positionManager.setPosition(row,column,bubble);
        return bubble;
    }

    public drawBubbleFromShoot(row:number, column:number, texture?:string):Bubble {
        let bubble = this.createBubble(row,column,texture);
        this.bubblesBoard.positionManager.setPositionFromShooting(row,column,bubble);
        return bubble;
    }

    public drawBubblesBoard() {
        for(let i = 0; i < this.bubblesBoard.row; i++) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                this.bubblesBoard.addingManager.addToBoard(i,j);
            }
        }
    }
}