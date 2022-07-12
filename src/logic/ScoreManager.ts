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
    private firstHoleScore:number[];
    private secondHoleScore:number[];
    private thirdHoleScore:number[];
    private fourthHoleScore:number[];
    private fifthHoleScore:number[];
    private indexHoleScore:number;

    constructor(bubblesBoard:BubblesBoard, scene:GameScene) {
        this.score = 0;
        this.baseScore = [10,20,30,50,80,130,210];

        this.firstHoleScore = [50,60,75,100,200];
        this.secondHoleScore = [100,120,150,200,400];
        this.thirdHoleScore = [250,300,350,500,1000];
        this.fourthHoleScore = [100,120,150,200,400];
        this.fifthHoleScore = [50,60,75,100,200];

        this.indexHoleScore = 0;
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
        this.combo += 1;
        this.updateScoreByCombo();
        if(this.combo == 10) {
            this.scene.events.emit('fireBall');
        }
    }

    public getScore() {
        return this.score;
    }

    public resetCombo() {
        this.combo = 0;
        this.multiplierCombo = 1;
        this.updateScoreByCombo();
    }

    public calculateScore() {
        this.indexBaseScore = this.scene.colorManager.getLevel();
        if(this.indexBaseScore > 6)
            this.indexBaseScore = 6;
        console.log('The current combo: '+ this.combo);
        console.log('the base score: ' + this.baseScore[this.indexBaseScore]);
    }

    public updateScoreByCombo() {
        if(this.combo < 3) {
            this.multiplierCombo = 1;
            this.indexHoleScore = 0;
        }
        else if(this.combo < 8) {
            this.multiplierCombo = 2;
            this.indexHoleScore = 1;
        }
        else if(this.combo < 12) {
            this.multiplierCombo = 3;
            this.indexHoleScore = 2;
        }
        else if(this.combo < 15) {
            this.multiplierCombo = 4;
            this.indexHoleScore = 3;
        }
        else {
            this.multiplierCombo = 5;
            this.indexHoleScore = 4;
        }
    }

    public getHoleScore(holeNumber:number):number {
        if(holeNumber == 1) {
            return this.firstHoleScore[this.indexHoleScore];
        } else if(holeNumber == 2) {
            return this.secondHoleScore[this.indexHoleScore];
        } else if(holeNumber == 3) {
            return this.thirdHoleScore[this.indexHoleScore];
        } else if(holeNumber == 4) {
            return this.fourthHoleScore[this.indexHoleScore];
        } else if(holeNumber == 5) {
            return this.fifthHoleScore[this.indexHoleScore];
        }
        return 0;
    }

    public increaseScore(score:number) {
        this.score += score;
        console.log(this.baseScore[this.indexBaseScore]*this.multiplierCombo);
    }

    public getBallClusterScore():number {
        return this.baseScore[this.indexBaseScore]*this.multiplierCombo;
    }

}