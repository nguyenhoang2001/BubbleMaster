import { GameScene } from "../scenes/GameScene";

export class ScoreManager {
    private score!: number;
    private highScore!: number;

    constructor() {
        this.score = 0;
        this.highScore = 0;
    }
}