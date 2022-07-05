import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { GameScene } from "../scenes/GameScene";

export class ScoreManager {
    private score: number;
    private baseScore: number[];
    private indexBaseScore:number;
    private multiplierCombo:number;
    private bubblesBoard:BubblesBoard;
    private combo:number;
    private scene:GameScene;

    constructor(bubblesBoard:BubblesBoard, scene:GameScene) {
        this.score = 0;
        this.baseScore = [10,20,30,50,80,130,210];
        this.multiplierCombo = 1;
        this.indexBaseScore = 0;
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

    public calculateScore() {
        let numberOfColors = this.scene.colorManager.countCurrentColor();
        this.indexBaseScore = numberOfColors - 3;
        if(this.indexBaseScore < 0)
            this.indexBaseScore = 0;
        console.log('The current combo: '+ this.combo);
        console.log('the base score: ' + this.baseScore[this.indexBaseScore]);

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

    public increaseScore() {
        this.score += this.baseScore[this.indexBaseScore]*this.multiplierCombo;
        console.log(this.baseScore[this.indexBaseScore]*this.multiplierCombo);
    }

}