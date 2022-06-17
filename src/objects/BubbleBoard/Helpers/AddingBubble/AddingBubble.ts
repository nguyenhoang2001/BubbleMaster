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
    public finishedAddingBullet!: boolean;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.positionHandler = new PositionBubbleHandler(this);
        this.scene = this.bubblesBoard.scene;
        this.finishedAddingBullet = false;
    }

    private addingToGridGroup(bubbles:Bubble[]) {
        this.bubblesBoard.gridGroup.addMultiple(bubbles)
    }

    private toContainer(bubbles:Bubble[]) {
        this.scene.bubblesContainer.add(bubbles);
    }

    public toBoard(row:number, column:number,texture?:string):Bubble|void {
        this.bubblesBoard.board[row][column] = this.bubblesBoard.painter.drawBubble(row,column,texture);
        const object = this.bubblesBoard.board[row][column];
        if(object == undefined)
            return;
        this.scene.add.existing(object);
        // adding to the grid group
        this.addingToGridGroup([object]);
        return object;
    }

    private toBoardFromShoot(row:number, column:number,shootedBubble:ShootedBubble):Bubble|void {
        this.bubblesBoard.positionManager.setPositionFromShooting(row,column,shootedBubble);
        shootedBubble.resetPhysics();
        shootedBubble.row = row;
        shootedBubble.column = column;
        this.bubblesBoard.board[row][column] = shootedBubble;

        const object = this.bubblesBoard.board[row][column];
        if(object == undefined)
            return;
        return object;
    }
    
    public fromShoot(hittedBubble:Bubble,shootedBubble:ShootedBubble):Bubble|void {
        this.finishedAddingBullet = false;
        let gridPos = this.positionHandler.getPositionNewBubble(hittedBubble,shootedBubble);
        let bubble = this.toBoardFromShoot(gridPos.x,gridPos.y,shootedBubble);
        const object = bubble;
        if(object == undefined)
            return;
        this.toContainer([object]);
        this.finishedAddingBullet = true;
        return bubble;
    }

    private activateBubble(bubble:Bubble, texture:string) {
        this.scene.physics.world.enable(bubble);
        bubble.body.checkCollision.none = false;
        bubble.setScale(1);
        bubble.setDepth(0);
        bubble.setActive(true);
        // bubble.setVisible(true);
        bubble.setTexture(texture);
    }

    public moreBubbleRows(numberOfRow:number) {
        console.log('add more row');
        if(numberOfRow <= 0)
            return;

        this.scene.typeGenerator.resetCurrentType();

        let bellowBubble = this.bubblesBoard.board[0].find(n=>n)!
        let bellowY = bellowBubble.y;
        /////
        for(let i = 0; i < this.bubblesBoard.row; i++) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                const object = this.bubblesBoard.board[i][j];
                if(object == undefined)
                    continue;
                if(this.bubblesBoard.isBublleExisting(i,j)) {
                    object.row += 3;
                }
            }
        }
        /////
        let bubblesArray:Bubble[] = [];
        while(numberOfRow > 0) {
            this.bubblesBoard.invertRowOffset();
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                let bubbleX = j * 56;
                if(this.bubblesBoard.rowOffSet % 2) {
                    bubbleX += 28;
                }
                bubbleX += this.bubblesBoard.x;
                let bubbleY = bellowY - 49;
                let bubble = this.bubblesBoard.gridGroup.get(bubbleX,bubbleY,'',undefined,true) as Bubble;
                this.activateBubble(bubble,this.scene.typeGenerator.getCurrentTexture());
                bubblesArray.push(bubble);
            }
            numberOfRow -= 1;
            bellowY -= 49;
        }
        this.bubblesBoard.board.unshift([]);
        this.bubblesBoard.board.unshift([]);
        this.bubblesBoard.board.unshift([]);

        this.bubblesBoard.row += 3;
        let j = 0;
        let k = 0;

        while(bubblesArray.length > 0) {
            if(j == 12) {
                k++;
                j = 0;
            }
            let bubble = bubblesArray.pop()!;
            if(bubble.visible) {
                this.toContainer([bubble]);
            } else {
                bubble.setVisible(true);
            }
            bubble.row = k;
            bubble.column = j;
            this.bubblesBoard.board[k][j] = bubble;
            j++;
        }
        const object = this.bubblesBoard.board[0][0];
        if(object != undefined) {
            this.bubblesBoard.y = object.y + this.scene.bubblesContainer.y;
            this.bubblesBoard.updateRow();

            for(let i = 0; i < this.bubblesBoard.row; i++) {
                for(let j = 0; j < this.bubblesBoard.column; j++) {
                    const bubble = this.bubblesBoard.board[i][j];
                    if(bubble == undefined)
                        continue;
                    if(this.bubblesBoard.isBublleExisting(i,j)) {
                        // bubble.row = i;
                        // bubble.column = j;
                        console.log(bubble.row +'|'+ bubble.column);
                    }
                }
            }
        }


    }
}