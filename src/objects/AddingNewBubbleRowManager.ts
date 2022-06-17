import { GameScene } from "../scenes/GameScene";

export class AddingNewBubbleRowManager {
    public scene!: GameScene;
    private needToAdd!: boolean;

    constructor(scene:GameScene) {
        this.scene = scene;
        this.needToAdd = false;
    }

    private checkToAdd() {
        if(this.scene.bubblesBoard.y >= 0) {
            this.needToAdd = true;
        }
    }

    public setAddSignalToGrid() {
        if(this.needToAdd) {
            if(this.scene.shooter.allowShooting) {
                this.scene.bubblesBoard.addSignal = true;
                this.needToAdd = false;
            }
        }else {
            this.checkToAdd();
        }
    }
}