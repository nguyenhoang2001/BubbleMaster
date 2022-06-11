import { GameScene } from "../scenes/GameScene";
import { AddingBubble } from "./AddingBubble";
import { Bubble } from "./Bubble";
import { Clusters } from "./Cluster";
import { ColliderManager } from "./ColliderManager";
import { FloatingBubbleDector } from "./FloatingBubbleDetector";
import { FloatingBubbles } from "./FloatingBubbles";
import { FloatingHandler } from "./FloatingHandler";
import { ShootedBubble } from "./ShootedBubble";

export class BubblesBoard {
    public bubblesBoard!: Bubble[][];
    public addingBubbleManager!: AddingBubble;
    public colliderBubble!: ColliderManager;
    public clusters!: Clusters;
    private floatingBubbles!: FloatingBubbles;
    public width!: number;
    public height!:number;
    public rowOffSet!:number;
    private rowHeight!:number;
    public scene!: GameScene;
    private x!: number;
    private y!:number;
    public addSignal!: boolean;
    private allowAdding!: boolean;

    constructor(scene:GameScene,x:number,y:number,width:number, height:number,rowOffSet:number, rowHeight:number) {
        // Variables
        this.x = x;
        this.y = y;
        this.allowAdding = false;
        this.addSignal = false;
        this.scene = scene;
        this.width = width;
        this.height = height;
        this.rowOffSet = rowOffSet;
        this.rowHeight = rowHeight;
        this.bubblesBoard = [];
        for(let i = 0; i < this.width; i++) {
            this.bubblesBoard[i] = []
        }
        this.drawBubblesBoard();
        // Game Objects
        this.addingBubbleManager = new AddingBubble(this);
        this.colliderBubble = new ColliderManager(this);
        this.floatingBubbles = new FloatingBubbles(this.scene,this);
        this.clusters = new Clusters(this.scene,this);
    }

    public getCoordinateBubble(row:number,column:number):any {
        let bubbleX = column * 56;
        if ((row + this.rowOffSet) % 2) {
            bubbleX += 56/2;
        }
        let bubbleY = row * this.rowHeight;
        bubbleX = bubbleX + this.x;
        bubbleY = bubbleY + this.y;
        return {x: bubbleX, y:bubbleY};
    }

    private setCoordinateBubble(row:number,column:number,bubble:Bubble) {
        let bubbleX = column * bubble.displayWidth;
        if ((row + this.rowOffSet) % 2) {
            bubbleX += bubble.displayWidth/2;
        }
        let bubbleY = row * this.rowHeight;
        bubble.x = bubbleX + this.x;
        bubble.y = bubbleY + this.y;
    }

    public isBublleExisting(row:number,column:number):boolean {
        return (this.bubblesBoard[row][column] != undefined && this.bubblesBoard[row][column].visible)
    }

    public addToBoard(row:number, column:number,texture?:string):Bubble {
        this.bubblesBoard[row][column] = this.drawBubble(row,column,texture);
        this.scene.add.existing(this.bubblesBoard[row][column]);
        return this.bubblesBoard[row][column];
    }

    public drawBubblesBoard() {
        for(let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++) {
                this.addToBoard(i,j);
            }
            this.scene.addBubblesToContainer(this.bubblesBoard[i]);
        }
    }

    public drawBubble(row:number, column:number, texture?:string):Bubble {
        let bubbleType = this.scene.typeGenerator.getTexture();
        let bubble = new Bubble(this.scene,0,0,row,column,bubbleType);
        if(texture != undefined) {
            bubble.setTexture(texture);
        }
        this.setCoordinateBubble(row,column,bubble);
        return bubble;
    }

    public addNewRow(row:number) {
        if(row >= this.width) {
            this.width += 1;
            this.bubblesBoard[row] = [];
        }
    }

    public invertRowOffset() {
        if(this.rowOffSet == 0)
            this.rowOffSet = 1;
        else
            this.rowOffSet = 0;
    }

    public getIndexBubble(bubble:ShootedBubble): any {
        let gridX = Math.floor(bubble.y / this.rowHeight);
        let xOffset = 0;
        if ((gridX + this.rowOffSet) % 2) {
            xOffset = bubble.width / 2;
        }
        let gridY = Math.floor((bubble.x - xOffset) / bubble.width);
        return { x: gridX, y: gridY };
    }

    public createColliderWithShootedBubble(shootedBubble:ShootedBubble) {
        this.colliderBubble.createColliderShootedBubble(shootedBubble);
    }

    public updateRow() {
        let maxRow = 0;
        for(let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++) {
                if(this.isBublleExisting(i,j)) {
                    if(maxRow < this.bubblesBoard[i][j].row) {
                        maxRow = this.bubblesBoard[i][j].row;
                    }
                }
            }
        }
        this.width = maxRow + 1;
    }

    public update() {
        this.allowAdding = false;
        if(this.clusters.remains <= 0) {
            this.scene.typeGenerator.resetCurrentType();
            this.floatingBubbles.run();
            this.clusters.resetRemains();
            this.allowAdding = true;
        }
        if(this.floatingBubbles.isFloating) {
            this.allowAdding = false;
            if(this.floatingBubbles.remains <= 0) {
                this.floatingBubbles.resetRemains();
                this.allowAdding = true;
                this.floatingBubbles.isFloating = false
            }
        }
        if(this.addSignal) {
            if(!this.clusters.isHavingClusters) {
                this.invertRowOffset();
                this.addingBubbleManager.addMore();
                console.log('new width is: ' + this.width + ' but not have clusters');
            } else {
                if(this.allowAdding) {
                    this.updateRow();
                    this.allowAdding = false;
                    this.invertRowOffset();
                    this.addingBubbleManager.addMore();
                    console.log('new width is: ' + this.width + ' have clusters');
                    
                }
            }
            this.addSignal = false;
        }
    }
}