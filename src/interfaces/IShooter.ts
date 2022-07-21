import { ShootedBubble } from "src/objects/ShootedBubble";
import { ShooterAnimation } from "src/objects/Shooter/ShooterAnimation";
import { ShotGuide } from "src/objects/Shooter/ShotGuide";
import { GameScene } from "src/scenes/GameScene";

export interface IShooter {
    scene:GameScene;
    arrowShoot:Phaser.GameObjects.Line;
    shootedBubble: ShootedBubble;
    secondBubble: ShootedBubble;
    animation: ShooterAnimation;
    shotGuide: ShotGuide;
    rectangleBound: Phaser.Geom.Rectangle;
    bulletGroup: Phaser.GameObjects.Group;
    isAnimationFinished: boolean;
    isAllowShooting: boolean;
    createSecondBullet(): void;
    setUpPositionShootedBubble(): void;
    setUpPositionSecondBubble(): void;
}