import { GameScene } from "../../../../scenes/GameScene";
import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { FloatingDetector } from "./FloatingDetector";
import { FloatingHandler } from "./FloatingHandler";

export class FloatingBubbles {
    public array: Bubble[];
    public bubblesBoard: BubblesBoard;
    private scene: GameScene;
    private detector: FloatingDetector;
    private handler: FloatingHandler;
    public remains: number;
    public isFloating: boolean;

    constructor(scene: GameScene, bubblesBoard: BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
        this.isFloating = false;
        this.array = [];
        this.detector = new FloatingDetector(this.bubblesBoard);
        this.handler = new FloatingHandler(this.scene,this,this.bubblesBoard);
        this.remains = 0;
    }

    public showAnimation() {
        this.handler.runAnimation();
    }

    public checkFloating() {
        this.array = this.detector.find();
        if( this.array.length > 0) {
            this.isFloating = true;
            this.remains = this.array.length;
            this.handler.clearFloating();
            // this.handler.runAnimation();
        }
    }

    public update() {
        this.checkFloating();
        this.bubblesBoard.gridGroup.getChildren().forEach((_bubble:any) => {
            let bubble = _bubble as Bubble;
            if(bubble.visible && bubble.isOutGrid == true) {
                if(bubble.y >= this.scene.sys.canvas.height + 28) {
                    bubble.clear();
                    this.remains -= 1;
                    this.bubblesBoard.gridGroup.killAndHide(bubble);
                }
            }   
        })
        // if(this.isFloating) {
        //     if(this.remains == 0) {
        //         console.log('finish floating');
        //         this.isFloating = false;
        //         this.array = [];
        //     } else {
        //         this.array.some((bubble:Bubble) => {
        //             if(bubble.visible) {
        //                 if(bubble.y >= this.scene.sys.canvas.height + 28) {
        //                     bubble.clear();
        //                     this.remains -= 1;
        //                     this.bubblesBoard.gridGroup.killAndHide(bubble);
        //                 }
        //             }
        //         });
        //     }
        // }

    }
}