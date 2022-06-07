import { GameScene } from "../scenes/GameScene";
import { Bubble } from "./Bubble";
import { ShootedBubble } from "./ShootedBubble";

export class BubblesBoard {
    private bubblesBoard!: Bubble[][];
    private width!: number;
    private height!:number;
    private rowOffSet!:number;
    private rowHeight!:number;
    public scene!: GameScene;
    private x!: number;
    private y!:number;

    constructor(scene:GameScene,x:number,y:number,width:number, height:number,rowOffSet:number, rowHeight:number) {
        this.x = x;
        this.y = y;
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
    }

    private setCoordinateBubble(row:number,column:number,bubble:Bubble) {
        let bubbleX = column * bubble.width;
        // X offset for odd or even rows
        if ((row + this.rowOffSet) % 2) {
            bubbleX += bubble.width/2;
        }
        let bubbleY = row * this.rowHeight;
        bubble.x = bubbleX + this.x;
        bubble.y = bubbleY + this.y;
    }

    public drawBubblesBoard() {
        for(let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++) {
                this.bubblesBoard[i][j] = this.drawBubble(i,j);
                this.scene.add.existing(this.bubblesBoard[i][j]);
            }
            this.scene.addBubblesToContainer(this.bubblesBoard[i]);
        }
    }

    private drawBubble(row:number, column:number):Bubble {
        let bubbleType = this.scene.typeGenerator.getTexture();
        let bubble = new Bubble(this.scene,0,0,bubbleType);
        this.setCoordinateBubble(row,column,bubble);
        return bubble;
    }

    public getIndexBubble(bubble:Bubble): any {
        let gridY = Math.floor(bubble.y / this.rowHeight);
        // Check for offset
        let xOffset = 0;
        if ((gridY + this.rowOffSet) % 2) {
            xOffset = bubble.width / 2;
        }
        let gridX = Math.floor((bubble.x - xOffset) / bubble.width);
        return { x: gridX, y: gridY };
    }


    public createColliderWithShootedBubble(shootedBubble:ShootedBubble) {
        for(let i = 0; i < this.width; i++) {
            for(let j = 0; j < this.height; j++) {
                this.scene.physics.add.collider(shootedBubble,this.bubblesBoard[i][j],()=>{
                    this.bubblesBoard[i][j].body.stop();
                    shootedBubble.body.stop();
                });
            }
        }
    }
}