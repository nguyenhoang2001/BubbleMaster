import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { GameScene } from "../scenes/GameScene";

export class GameOverManager {
    private scene!: GameScene;
    private bubblesBoard!: BubblesBoard;

    constructor(scene:GameScene, bubblesBoard:BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
    }

    public checkGameOver() {
        this.bubblesBoard.updateRow();
        let gridHeight = this.bubblesBoard.y + this.bubblesBoard.rowHeight*(this.bubblesBoard.row - 1) + 28;
        if(gridHeight > 298*2 + 250*2) {
            this.scene.registry.set('isGameOver', true);
        }
    }
}