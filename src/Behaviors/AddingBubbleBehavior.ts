import Depth from "../game/constant/Depth";
import { IBubblesBoard } from "src/interfaces/objects/IBubblesBoard";
import { Bubble } from "src/objects/Bubble";
import { ShootedBubble } from "src/objects/ShootedBubble";
import { IAddingBubbleBehavior } from "src/interfaces/behaviors/IAddingBubbleBehavior";

export class AddingBubbleBehavior implements IAddingBubbleBehavior {
    private parent: IBubblesBoard;

    constructor(parent:IBubblesBoard) {
        this.parent = parent;
    }

    private createBubble(row:number, column:number, texture?:string):Bubble {
        let bubble = this.parent.gridGroup.get(0,0,'',undefined,true);
        bubble.setOrigin(0.5,0.5);
        bubble.row = row;
        bubble.column = column;
        bubble.setDepth(Depth.GRIDBALL);
        if(texture != undefined) {
            bubble.setTexture(texture);
        } else {
            let bubbleType = this.parent.scene.colorManager.getTexture();
            bubble.setTexture(bubbleType);
        }
        return bubble;
    }

    private drawBubble(row:number, column:number, texture?:string):Bubble {
        let bubble = this.createBubble(row,column,texture);
        this.parent.positionManager.setPosition(row,column,bubble);
        return bubble;
    }

    public addBubble(row:number, column:number,texture?:string):Bubble|void {
        this.parent.board[row][column] = this.drawBubble(row,column,texture);
        const object = this.parent.board[row][column];
        if(object == undefined)
            return;
        return object;
    }

    private addBubbleToBoard(row:number, column:number,shootedBubble:ShootedBubble):Bubble|void {
        let bubble = this.parent.gridGroup.get(0,0,'',undefined,true);
        this.activateBubble(bubble,shootedBubble.texture.key);

        this.parent.positionManager.setPositionFromShooting(row,column,bubble);
        bubble.row = row;
        bubble.column = column;
        this.parent.board[row][column] = bubble;

        const object = this.parent.board[row][column];
        if(object == undefined)
            return;
        return object;
    }
    
    public addBubbleFromShoot(hittedBubble:Bubble,shootedBubble:ShootedBubble):Bubble|void {
        let gridPos = this.parent.positionManager.getPositionNewBubble(hittedBubble,shootedBubble);
        let bubble = this.addBubbleToBoard(gridPos.row,gridPos.column,shootedBubble);
        const object = bubble;
        if(object == undefined)
            return;
        console.log(JSON.parse(JSON.stringify(this.parent.board)));
        return bubble;
    }

    private activateBubble(bubble:Bubble, texture:string) {
        bubble.name = 'Bubble';
        bubble.removeAllListeners();
        bubble.setScale(1);
        bubble.setDepth(Depth.GRIDBALL);
        bubble.setActive(true);
        bubble.setVisible(true);
        bubble.setOrigin(0.5,0.5);
        bubble.setTexture(texture);
        bubble.resetPhysics();
        bubble.clearTint();
        bubble.clearAlpha();
    }

    public addMoreBubbleRows(numberOfRow:number) {
        console.log('add more row');
        if(numberOfRow <= 0)
            return;
        let saveNumberRowAdd = numberOfRow;
        let bellowBubble = this.parent.board[0].find(n=>n);
        let bellowY = 0;
        if(bellowBubble == undefined) {
            bellowY = 0;
        } else {
            bellowY = bellowBubble.y;
        }
        // update value row for old bubbles
        for(let i = 0; i < this.parent.row; i++) {
            for(let j = 0; j < this.parent.column; j++) {
                const object = this.parent.board[i][j];
                if(object == undefined)
                    continue;
                if(this.parent.isBublleExisting(i,j)) {
                    object.row += saveNumberRowAdd;
                }
            }
        }
        let bubblesArray:Bubble[] = [];
        let bubbleWidth = 56;
        while(numberOfRow > 0) {
            this.parent.board.unshift([]);
            this.parent.row += 1;
            this.parent.invertRowOffset();
            for(let j = 0; j < this.parent.column; j++) {
                let bubbleX = j * bubbleWidth;
                if(this.parent.rowOffSet % 2) {
                    bubbleX += bubbleWidth/2;
                }
                bubbleX += this.parent.x + j*this.parent.offsetDistanceBetweenBubbles;
                let bubbleY = bellowY - this.parent.rowHeight;
                let bubble = this.parent.gridGroup.get(bubbleX,bubbleY,'',undefined,true) as Bubble;
                this.activateBubble(bubble,this.parent.scene.colorManager.getTexture());
                bubblesArray.push(bubble);
            }
            numberOfRow -= 1;
            bellowY -= this.parent.rowHeight;
        }
        let j = this.parent.column - 1;
        let k = 0;
        while(bubblesArray.length > 0) {
            if(j == -1) {
                k++;
                j = this.parent.column - 1;
            }
            let bubble = bubblesArray.pop()!;
            bubble.row = k;
            bubble.column = j;
            this.parent.board[k][j] = bubble;
            j--;
        }
        this.parent.updateRow();
        const object = this.parent.board[0][0];
        if(object != undefined) {
            this.parent.y = object.y ;
        }
    }    
}