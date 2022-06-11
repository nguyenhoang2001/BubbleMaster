import { Bubble } from "./Bubble";
import { BubblesBoard } from "./BubblesBoard";
import { FloatingBubbleDector } from "./FloatingBubbleDetector";
import { FloatingHandler } from "./FloatingHandler";

export class FloatingBubbles {
    private floatingBubbles!: Bubble[];
    public bubblesBoard!: BubblesBoard;
    private scene!: Phaser.Scene;
    private detector!: FloatingBubbleDector;
    private handler!: FloatingHandler;
    public remains!: number;
    public isFloating!: boolean;

    constructor(scene: Phaser.Scene, bubblesBoard: BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
        this.isFloating = false;
        this.floatingBubbles = [];
        this.detector = new FloatingBubbleDector(this.bubblesBoard);
        this.handler = new FloatingHandler(this.scene,this);
        this.remains = 1;
    }

    public resetRemains() {
        this.remains = 1;
    }

    public run() {
        this.floatingBubbles = this.detector.find();
        console.log('Floating bubbles number: ' +  this.floatingBubbles.length);
        if( this.floatingBubbles.length > 0) {
            for(let k = 0; k <  this.floatingBubbles.length; k++) {
                this.floatingBubbles[k].setDepth(1);
                console.log('floating bubbles position: ' +  this.floatingBubbles[k].row + '|' +  this.floatingBubbles[k].column);
            }
            this.isFloating = true;
            this.remains = this.floatingBubbles.length;
            this.handler.clearFloating(this.floatingBubbles);         
        }
    }
}