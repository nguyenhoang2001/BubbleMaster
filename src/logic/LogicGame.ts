import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { Shooter } from "../objects/Shooter/Shooter";
import { ColorManager } from "./ColorManger";
import { ScoreManager } from "./ScoreManager";

export class LogicGame {
    private colorManager:ColorManager;
    private scoreManager:ScoreManager;

    constructor() {
        this.colorManager = new ColorManager();
        this.scoreManager = new ScoreManager();
    }

    public update(time:number,delta:number) {
        this.colorManager.update(delta);
    }

    public getColor():string {
        return this.colorManager.getTexture();
    }
}