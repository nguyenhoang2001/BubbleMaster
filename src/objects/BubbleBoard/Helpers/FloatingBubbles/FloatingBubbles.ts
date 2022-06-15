import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { FloatingDetector } from "./FloatingDetector";
import { FloatingHandler } from "./FloatingHandler";

export class FloatingBubbles {
    private floatingBubbles!: Bubble[];
    public bubblesBoard!: BubblesBoard;
    private scene!: Phaser.Scene;
    private detector!: FloatingDetector;
    private handler!: FloatingHandler;
    public remains!: number;
    public isFloating!: boolean;

    constructor(scene: Phaser.Scene, bubblesBoard: BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
        this.isFloating = false;
        this.floatingBubbles = [];
        this.detector = new FloatingDetector(this.bubblesBoard);
        this.handler = new FloatingHandler(this.scene,this);
        this.remains = 1;
    }

    public resetRemains() {
        this.remains = 1;
    }

    public run() {
        this.floatingBubbles = this.detector.find();
        if( this.floatingBubbles.length > 0) {
            for(let k = 0; k <  this.floatingBubbles.length; k++) {
                this.floatingBubbles[k].setDepth(1);
            }
            this.isFloating = true;
            this.remains = this.floatingBubbles.length;
            this.handler.clearFloating(this.floatingBubbles);         
        }
    }
}