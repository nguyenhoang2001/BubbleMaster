import { GameScene } from "src/scenes/GameScene";
import { CircleGuide } from "./CircleGuide";

export class CircleGuideGroup extends Phaser.GameObjects.Group {
    public scene: GameScene;
    public circleRadius: number;

    constructor(scene:GameScene) {
        super(scene);
        this.classType = CircleGuide;
        this.maxSize = -1;
        this.circleRadius = 10;
        this.scene.add.existing(this);
    }

    public getCircleGuide():CircleGuide {
        let circleGuide = this.get() as CircleGuide;
        circleGuide.activate(this.circleRadius);
        return circleGuide;
    }
}