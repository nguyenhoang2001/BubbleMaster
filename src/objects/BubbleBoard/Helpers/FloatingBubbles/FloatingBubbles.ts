import { GameScene } from "../../../../scenes/GameScene";
import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { FloatingDetector } from "./FloatingDetector";
import { FloatingHandler } from "./FloatingHandler";

export class FloatingBubbles {
    private floatingBubbles!: Bubble[];
    public bubblesBoard!: BubblesBoard;
    private scene!: GameScene;
    private detector!: FloatingDetector;
    private handler!: FloatingHandler;
    public remains!: number;
    public isFloating!: boolean;
    public floatingFinish!: boolean;

    constructor(scene: GameScene, bubblesBoard: BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
        this.isFloating = false;
        this.floatingBubbles = [];
        this.detector = new FloatingDetector(this.bubblesBoard);
        this.handler = new FloatingHandler(this.scene,this,this.bubblesBoard);
        this.remains = 1;
        this.floatingFinish = false;
    }

    public resetRemains() {
        this.floatingFinish = true;
        this.remains = 1;
    }

    public run() {
        this.floatingBubbles = this.detector.find();
        if( this.floatingBubbles.length > 0) {
            this.floatingFinish = false;
            this.isFloating = true;
            this.remains = this.floatingBubbles.length;
            this.handler.clearFloating(this.floatingBubbles);         
        } else {
            this.isFloating = false;
        }
    }
}