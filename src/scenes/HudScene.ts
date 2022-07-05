import { HudContainer } from "../ui/HudContainer";
import { GameScene } from "./GameScene";

export class HudScene extends Phaser.Scene {
    private container: HudContainer;
    public score: number;

    constructor() {
        super({key:'HudScene'});
        this.score = 0;
    }

    public create() {
        this.container = new HudContainer(this,0,0);
        this.score = 0;
        this.container.run();
    }

    public update(time: number, delta: number): void {
        let isGameOver = this.registry.get('isGameOver');
        if(!isGameOver) {
            let gameScene = this.scene.get('GameScene') as GameScene;
            this.score = gameScene.scoreManager.getScore();
            this.container.update(time,delta);
        }
    }
}