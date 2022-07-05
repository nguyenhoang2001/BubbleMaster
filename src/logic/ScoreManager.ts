import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { GameScene } from "../scenes/GameScene";

export class ScoreManager {
    private score: number;
    private baseScore0:number;
    private baseScore1:number;
    private multiplierCombo:number;
    private bubblesBoard:BubblesBoard;
    private combo:number;
    private scene:GameScene;

    constructor(bubblesBoard:BubblesBoard, scene:GameScene) {
        this.score = 0;
        this.baseScore0 = 10;
        this.baseScore1 = 10;
        this.multiplierCombo = 1;
        this.combo = 0;
        this.bubblesBoard = bubblesBoard;
        this.scene = scene;
    }

    public getCombo():number {
        return this.combo;
    }

    public increaseCombo() {
        if(this.combo < 15)
            this.combo += 1;
    }

    public getScore() {
        return this.score;
    }

    public resetCombo() {
        this.combo = 0;
        this.multiplierCombo = 1;
    }

    private increaseBaseScore() {
        let saveBase = this.baseScore1;
        this.baseScore1 = this.baseScore1 + this.baseScore0;
        this.baseScore0 = saveBase;
    }

    private resetBaseScore() {
        this.baseScore0 = 10;
        this.baseScore1 = 10;
    }

    public calculateScore() {
        let numberOfColors = this.scene.colorManager.countCurrentColor();
        this.resetBaseScore();
        let count = numberOfColors - 3;
        while(count > 0) {
            this.increaseBaseScore();
            count--;
        }
        console.log('The current combo: '+ this.combo);
        console.log('BaseScore is: ' + this.baseScore1);
        if(this.combo < 3)
            this.multiplierCombo = 1;
        else if(this.combo < 8)
            this.multiplierCombo = 2;
        else if(this.combo < 12)
            this.multiplierCombo = 3;
        else if(this.combo < 15)
            this.multiplierCombo = 4;
        else
            this.multiplierCombo = 5;
    }

    public updateScore() {
        this.score += this.baseScore1*this.multiplierCombo;
        console.log(this.baseScore1*this.multiplierCombo);
    }

}