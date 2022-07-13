import { GameScene } from "../scenes/GameScene";

export class AddingNewBubbleRowManager {
    public scene: GameScene;
    private needToAdd: boolean;

    constructor(scene:GameScene) {
        this.scene = scene;
        this.needToAdd = false;
    }

    private checkToAdd() {
        let topBubble = this.scene.bubblesBoard.board[0].find(n=>n);
        if(topBubble != undefined) {
            if(topBubble.y >= 0) {
                this.needToAdd = true;
            }
        } else {
            this.needToAdd = true;
        }
    }

    public setAddSignalToGrid() {
        if(this.needToAdd) {
            this.scene.bubblesBoard.addSignal = true;
            this.needToAdd = false;
        } else {
            this.checkToAdd();
        }
    }
}