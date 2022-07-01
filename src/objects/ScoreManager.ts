import { GameScene } from "../scenes/GameScene";

export class ScoreManager {
    private score!: number;
    private highScore!: number;
    public scene!: GameScene;

    constructor(scene:GameScene) {
        this.score = 0;
        this.highScore = 0;
        this.scene = scene;
    }
}