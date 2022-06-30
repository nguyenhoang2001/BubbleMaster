import { GameScene } from "../../../../scenes/GameScene";
import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { FloatingDetector } from "./FloatingDetector";
import { FloatingHandler } from "./FloatingHandler";

export class FloatingBubbles {
    public array!: Bubble[];
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
        this.array = [];
        this.detector = new FloatingDetector(this.bubblesBoard);
        this.handler = new FloatingHandler(this.scene,this,this.bubblesBoard);
        this.remains = 1;
        this.floatingFinish = true;
    }

    public resetRemains() {
        this.floatingFinish = true;
        this.remains = 0;
    }

    public run() {
        this.array = this.detector.find();
        if( this.array.length > 0) {
            this.floatingFinish = false;
            this.isFloating = true;
            this.remains = this.array.length;
            this.handler.clearFloating();         
        }
    }

    public update() {
        if(this.isFloating) {
            if(this.remains == 0) {
                console.log('finish floating');
                this.isFloating = false;
                this.floatingFinish = true;
                this.array = [];
            } else {
                this.floatingFinish = false;
                this.array.some((bubble:Bubble) => {
                    if(bubble.visible) {
                        if(bubble.y >= this.scene.sys.canvas.height + 28) {
                            bubble.setDepth(0);
                            this.remains -= 1;
                            this.scene.bubblesContainer.add(bubble);
                            bubble.clear();
                            this.bubblesBoard.gridGroup.killAndHide(bubble);
                            this.scene.score += 1;
                        }
                    }
                });
            }
        }
    }
}