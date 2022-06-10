import { Bubble } from "./Bubble";
import { BubblesBoard } from "./BubblesBoard";
import { FloatingBubbleDector } from "./FloatingBubbleDetector";
import { FloatingHandler } from "./FloatingHandler";

export class FloatingBubbles {
    private floatingBubbles!: Bubble[];
    private bubblesBoard!: BubblesBoard;
    private scene!: Phaser.Scene;
    private detector!: FloatingBubbleDector;
    private handler!: FloatingHandler;

    constructor(scene: Phaser.Scene, bubblesBoard: BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
        this.floatingBubbles = [];
        this.detector = new FloatingBubbleDector(this.bubblesBoard);
        this.handler = new FloatingHandler(this.scene);
    }

    public run() {
        this.floatingBubbles = this.detector.find();
        console.log('Floating bubbles number: ' +  this.floatingBubbles.length);
        if( this.floatingBubbles.length > 0) {
            for(let k = 0; k <  this.floatingBubbles.length; k++) {
                console.log('floating bubbles position: ' +  this.floatingBubbles[k].row + '|' +  this.floatingBubbles[k].column);
            }
            this.handler.clearFloating( this.floatingBubbles);                
        }
    }
}