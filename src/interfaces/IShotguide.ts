import { CircleGuideGroup } from "src/objects/Shooter/CircleGuideGroup";
import { GameScene } from "src/scenes/GameScene";

export interface IShotguide {
    scene:GameScene;
    stopGenerate: boolean;
    maxAmountCircle: number;
    firstDistance: number;
    offsetDistance: number;
    gameWidth: number;
    stopPosition: number;
    circleGuideGroup:CircleGuideGroup;
    clear(): void;
    checkHitBubble(x:number,y:number, hitRange:number): boolean;
    createCircleGuide(x:number,y:number): void;
}