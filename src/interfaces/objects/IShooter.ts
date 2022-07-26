import { ShootedBubble } from "src/objects/ShootedBubble";
import { ShotGuide } from "src/objects/Shooter/ShotGuide";
import { GameScene } from "src/scenes/GameScene";
import { IReloadingBulletSkinComponent } from "../behaviors/IReloadingBulletSkinComponent";
import { ISwappingBulletSkinComponent } from "../behaviors/ISwappingBulletSkinComponent";


export interface IShooter {
    scene:GameScene;
    arrowShoot:Phaser.GameObjects.Line;
    shootedBubble: ShootedBubble;
    secondBubble: ShootedBubble;
    shotGuide: ShotGuide;
    rectangleBound: Phaser.Geom.Rectangle;
    bulletGroup: Phaser.GameObjects.Group;
    circle: Phaser.GameObjects.Image;
    isAnimationFinished: boolean;
    isAllowShooting: boolean;
    swappingBulletSkinComponent: ISwappingBulletSkinComponent;
    reloadingBulletSkinComponent: IReloadingBulletSkinComponent;
    createSecondBullet(): void;
    setUpPositionShootedBubble(): void;
    setUpPositionSecondBubble(): void;
}