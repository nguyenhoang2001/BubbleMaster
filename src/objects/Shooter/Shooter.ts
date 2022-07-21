import ShooterState from "src/game/constant/ShooterState";
import { IShooter } from "src/interfaces/IShooter";
import DEPTH from "../../game/constant/Depth";
import { GameScene } from "../../scenes/GameScene";
import { ShootedBubble } from "../ShootedBubble";
import { ShootingBehavior } from "./Behaviors/ShootingBehavior";
import { ShotGuide } from "./ShotGuide";
import { ShooterAnimation } from "./ShooterAnimation";
import { ReloadingBehavior } from "./Behaviors/ReloadingBehavior";
import { SwappingBehavior } from "./Behaviors/SwappingBehavior";
import { SettingAngleBehavior } from "./Behaviors/SettingAngleBehavior";
import { CreatingBubbleBehavior } from "./Behaviors/CreatingBubbleBehavior";
import ShotguideState from "src/game/constant/ShotguideState";
import { IShootingBehavior } from "src/interfaces/IShootingBehavior";
import { IReloadingBehavior } from "src/interfaces/IReloadingBehavior";
import { ISwappingBehavior } from "src/interfaces/ISwappingBehavior";
import { ISettingAngleBehavior } from "src/interfaces/ISettingAngleBehavior";
import { ICreatingBubbleBehavior } from "src/interfaces/ICreatingBubbleBehavior";

export class Shooter implements IShooter {
    // Properties
    public scene: GameScene;

    public bulletGroup: Phaser.GameObjects.Group;

    public rectangleBound: Phaser.Geom.Rectangle;

    public shootedBubble: ShootedBubble;
    public secondBubble: ShootedBubble;

    public animation: ShooterAnimation;
    public circle: Phaser.GameObjects.Image;
    public arrowShoot: Phaser.GameObjects.Line;

    public shotGuide: ShotGuide;

    public isAllowShooting: boolean;
    private pointerOnCircle: boolean;
    public isAnimationFinished:boolean;
    // State
    private state: ShooterState;
    // Behaviors
    private shootingBehavior: IShootingBehavior;
    private reloadingBehavior: IReloadingBehavior;
    private swappingBehavior: ISwappingBehavior;
    private settingAngleBehavior: ISettingAngleBehavior;
    private creatingBubbleBehavior: ICreatingBubbleBehavior;

    constructor(scene:GameScene) {
        this.scene = scene;
        // state
        this.state = ShooterState.Idle;
        // Behaviors
        this.shootingBehavior = new ShootingBehavior(this);
        this.reloadingBehavior = new ReloadingBehavior(this);
        this.swappingBehavior = new SwappingBehavior(this);
        this.settingAngleBehavior = new SettingAngleBehavior(this);
        this.creatingBubbleBehavior = new CreatingBubbleBehavior(this);
        // Properties
        this.bulletGroup = this.scene.add.group({classType:ShootedBubble});
        this.animation = new ShooterAnimation(this,this.scene);
        this.isAllowShooting = true;
        this.pointerOnCircle = false;
        this.isAnimationFinished = true;

        let offsetXBound = 20;
        this.rectangleBound = new Phaser.Geom.Rectangle(offsetXBound,0,this.scene.sys.canvas.width - offsetXBound*2,this.scene.sys.canvas.height);
        this.shotGuide = new ShotGuide(this, this.scene);

        this.drawCircle();
        this.creatingBubbleBehavior.createShootedBubble();
        this.creatingBubbleBehavior.createSecondBubble();
        this.createArrowShoot();
        this.enableInput();
    }
        // dependency , strategy pattern

    public setUpPositionSecondBubble() {
        let x = 65*Math.cos(60*Phaser.Math.DEG_TO_RAD) + this.circle.x;
        let y = 65*Math.sin(60*Phaser.Math.DEG_TO_RAD) + this.circle.y;
        this.secondBubble.x = x;
        this.secondBubble.y = y;
    }

    public setUpPositionShootedBubble() {
        let x = 65*Math.cos(-90*Phaser.Math.DEG_TO_RAD) + this.circle.x;
        let y = 65*Math.sin(-90*Phaser.Math.DEG_TO_RAD) + this.circle.y;
        this.shootedBubble.x = x;
        this.shootedBubble.y = y;
    }

    public clearShotGuide() {
        this.shotGuide.clear();
    }

    public removeInput() {
        this.circle.removeInteractive();
        this.scene.input.removeAllListeners();
    }

    private enableInput() {
            this.scene.input.on('pointerup',(pointer:Phaser.Input.Pointer) => {
                if(pointer.leftButtonReleased()) {
                    if(this.isAllowShooting && this.isAnimationFinished && !this.pointerOnCircle && this.shotGuide.circleGuideGroup.countActive(true) > 0) {
                        this.state = ShooterState.Shooting;
                    } else {
                        this.state = ShooterState.Idle;
                    }
                } 
                else if (pointer.rightButtonReleased()) {
                    if(this.isAnimationFinished) {
                        this.state = ShooterState.Swapping;
                    }
                }
            },this);
            this.circle.setInteractive();
            this.circle.on('pointerdown', (pointer:Phaser.Input.Pointer) => {
                if(pointer.leftButtonDown()) {
                    if(this.isAnimationFinished) {
                        this.state = ShooterState.Swapping;
                    }
                }
            });
            this.circle.on('pointerover', () => {
                this.pointerOnCircle = true;
            });
            this.circle.on('pointerout', () => {
                this.pointerOnCircle = false;
            });
    }

    private drawCircle() {
        this.circle = this.scene.add.image(0,0,'circle');
        this.circle.setDepth(DEPTH.GAMEPLAY);
        Phaser.Display.Align.In.BottomCenter(this.circle,this.scene.mainZone,0,-85);
        this.animation.showRotatingCircle();
    }

    private createArrowShoot() {
        this.arrowShoot = this.scene.add.line(this.shootedBubble.x,this.shootedBubble.y,0,0,100,0,0xff0000);
        this.arrowShoot.setOrigin(0,0);
        this.arrowShoot.setVisible(false);
    }

    public createSecondBullet() {
        this.creatingBubbleBehavior.createSecondBubble();
    }
    
    public update(delta:number) {
        switch(this.state) {
            case ShooterState.Shooting: {
                this.shootingBehavior.shoot();
                this.scene.addToFlyingBulletGroup(this.shootedBubble);
                this.state = ShooterState.Reloading;
                break;
            }
            case ShooterState.Reloading: {
                this.reloadingBehavior.reload();
                this.state = ShooterState.Idle;
                break;
            }
            case ShooterState.Swapping: {
                this.swappingBehavior.swap();
                this.state = ShooterState.Idle;
                break;
            }
            default: {
                this.state = ShooterState.Idle;
                this.shotGuide.update(delta);
                this.settingAngleBehavior.setAngle(this.scene.input.activePointer);
                break;
            }
        }
        if(!this.isAllowShooting || !this.isAnimationFinished) {
            this.shotGuide.state = ShotguideState.Fading;
        }
    }
}