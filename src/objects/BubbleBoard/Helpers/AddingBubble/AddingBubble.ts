import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { PositionBubbleHandler } from "./PositionBubbleHandler";
import { ShootedBubble } from "../../../ShootedBubble";
import { GameScene } from "../../../../scenes/GameScene";
import DEPTH from "../../../../game/constant/Depth";

export class AddingBubble {
    public bubblesBoard: BubblesBoard;
    public fixedPos: any;
    public positionHandler: PositionBubbleHandler;
    public scene: GameScene;
    public finishedAddingBullet: boolean;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.positionHandler = new PositionBubbleHandler(this);
        this.scene = this.bubblesBoard.scene;
        this.finishedAddingBullet = true;
    }

    public addToBoard(row:number, column:number,texture?:string):Bubble|void {
        this.bubblesBoard.board[row][column] = this.bubblesBoard.painter.drawBubble(row,column,texture);
        const object = this.bubblesBoard.board[row][column];
        if(object == undefined)
            return;
        return object;
    }

    private addToBoardFromShoot(row:number, column:number,shootedBubble:ShootedBubble):Bubble|void {
        let bubble = this.bubblesBoard.gridGroup.get(0,0,'',undefined,true);
        this.activateBubble(bubble,shootedBubble.texture.key);

        this.bubblesBoard.positionManager.setPositionFromShooting(row,column,bubble);
        bubble.row = row;
        bubble.column = column;
        this.bubblesBoard.board[row][column] = bubble;

        const object = this.bubblesBoard.board[row][column];
        if(object == undefined)
            return;
        return object;
    }
    
    public addBubblefromShoot(hittedBubble:Bubble,shootedBubble:ShootedBubble):Bubble|void {
        let gridPos = this.positionHandler.getPositionNewBubble(hittedBubble,shootedBubble);
        let bubble = this.addToBoardFromShoot(gridPos.x,gridPos.y,shootedBubble);
        const object = bubble;
        if(object == undefined)
            return;
        this.finishedAddingBullet = true;
        console.log(JSON.parse(JSON.stringify(this.bubblesBoard.board)));
        return bubble;
    }

    private activateBubble(bubble:Bubble, texture:string) {
        bubble.name = 'Bubble';
        bubble.removeAllListeners();

        bubble.setScale(1);
        bubble.setDepth(DEPTH.GRIDBALL);
        bubble.setActive(true);
        bubble.setVisible(true);
        bubble.setOrigin(0.5,0.5);
        bubble.setTexture(texture);
        bubble.resetPhysics();
        bubble.clearTint();
        bubble.clearAlpha();
    }

    public moreBubbleRows(numberOfRow:number) {
        console.log('add more row');
        if(numberOfRow <= 0)
            return;
        let saveNumberRowAdd = numberOfRow;
        let bellowBubble = this.bubblesBoard.board[0].find(n=>n);
        let bellowY = 0;
        if(bellowBubble == undefined) {
            bellowY = 0;
        } else {
            bellowY = bellowBubble.y;
        }
        // update value row for old bubbles
        for(let i = 0; i < this.bubblesBoard.row; i++) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                const object = this.bubblesBoard.board[i][j];
                if(object == undefined)
                    continue;
                if(this.bubblesBoard.isBublleExisting(i,j)) {
                    object.row += saveNumberRowAdd;
                }
            }
        }
        let bubblesArray:Bubble[] = [];
        let bubbleWidth = 56;
        while(numberOfRow > 0) {
            this.bubblesBoard.board.unshift([]);
            this.bubblesBoard.row += 1;
            this.bubblesBoard.invertRowOffset();
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                let bubbleX = j * bubbleWidth;
                if(this.bubblesBoard.rowOffSet % 2) {
                    bubbleX += bubbleWidth/2;
                }
                bubbleX += this.bubblesBoard.x + j*this.bubblesBoard.offsetDistanceBetweenBubbles;
                let bubbleY = bellowY - this.bubblesBoard.rowHeight;
                let bubble = this.bubblesBoard.gridGroup.get(bubbleX,bubbleY,'',undefined,true) as Bubble;
                this.activateBubble(bubble,this.scene.colorManager.getTexture());
                bubblesArray.push(bubble);
            }
            numberOfRow -= 1;
            bellowY -= this.bubblesBoard.rowHeight;
        }
        let j = this.bubblesBoard.column - 1;
        let k = 0;
        while(bubblesArray.length > 0) {
            if(j == -1) {
                k++;
                j = this.bubblesBoard.column - 1;
            }
            let bubble = bubblesArray.pop()!;
            bubble.row = k;
            bubble.column = j;
            this.bubblesBoard.board[k][j] = bubble;
            j--;
        }
        this.bubblesBoard.updateRow();
        const object = this.bubblesBoard.board[0][0];
        if(object != undefined) {
            this.bubblesBoard.y = object.y ;
        }
    }
}