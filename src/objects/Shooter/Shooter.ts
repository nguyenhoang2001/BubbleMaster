import DEPTH from "../../game/constant/Depth";
import { GameScene } from "../../scenes/GameScene";
import { ShootedBubble } from "../ShootedBubble";
import { AnimationShooter } from "./Helpers/AnimationShooter";
import { BulletCreator } from "./Helpers/BulletCreator";
import { BulletSwaper } from "./Helpers/BulletSwaper";
import { ShotGuide } from "./Helpers/ShotGuide";

export class Shooter {
    public shootedBubble: ShootedBubble;
    public scene: GameScene;
    public arrowShoot: Phaser.GameObjects.Line
    public circle: Phaser.GameObjects.Image;
    public bulletGroup: Phaser.GameObjects.Group;
    public secondBubllet: ShootedBubble;
    private bulletCreator: BulletCreator;
    private bulletSwaper: BulletSwaper;
    private isShoot: boolean;
    public checkAllowShooting: boolean;
    private shotGuide: ShotGuide;
    public animation: AnimationShooter;
    private pointerOnCircle: boolean;

    constructor(scene:GameScene) {
        this.scene = scene;
        this.isShoot = false;
        this.checkAllowShooting = true;
        this.pointerOnCircle = false;
        this.bulletGroup = this.scene.add.group({classType:ShootedBubble});
        this.bulletCreator = new BulletCreator(this);
        this.bulletSwaper = new BulletSwaper(this);
        this.shotGuide = new ShotGuide(this, this.scene);
        this.animation = new AnimationShooter(this,this.scene);
        this.drawCircle();
        this.bulletCreator.run();
        this.drawLine();
        this.enableInput();
        this.enableChangeBubble();
    }

    private drawLine() {
        this.createLine();
    }

    public setUpPositionSecond() {
        let x = 65*Math.cos(60*Phaser.Math.DEG_TO_RAD) + this.circle.x;
        let y = 65*Math.sin(60*Phaser.Math.DEG_TO_RAD) + this.circle.y;
        this.secondBubllet.x = x;
        this.secondBubllet.y = y;
    }

    public setUpPositionFirst() {
        let x = 65*Math.cos(-90*Phaser.Math.DEG_TO_RAD) + this.circle.x;
        let y = 65*Math.sin(-90*Phaser.Math.DEG_TO_RAD) + this.circle.y;
        this.shootedBubble.x = x;
        this.shootedBubble.y = y;
    }

    public clearShotGuide() {
        this.shotGuide.hide();
    }

    public removeInput() {
        this.circle.removeInteractive();
    }

    private enableChangeBubble() {
        this.circle.setInteractive();
        this.circle.on('pointerdown', (pointer:Phaser.Input.Pointer) => {
            if(pointer.leftButtonDown()) {
                if(this.bulletSwaper.finished) {
                    this.checkAllowShooting = false;
                    this.bulletSwaper.startSwaping();
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

    public enableInput() {
            this.scene.input.on('pointerup',(pointer:Phaser.Input.Pointer) => {
                if(pointer.leftButtonReleased()) {
                    if(this.checkAllowShooting && !this.pointerOnCircle && this.shotGuide.circleGuideGroup.countActive(true) > 0) {
                        this.isShoot = true;
                    }
                } 
                else if (pointer.rightButtonReleased()) {
                    if(this.bulletSwaper.finished) {
                        this.checkAllowShooting = false;
                        this.bulletSwaper.startSwaping();
                    }
                }
            },this);
    }

    private drawCircle() {
        this.circle = this.scene.add.image(0,0,'circle');
        this.circle.setDepth(DEPTH.GAMEPLAY);
        Phaser.Display.Align.In.BottomCenter(this.circle,this.scene.mainZone,0,-85);
        this.animation.createAnimationForCircle();
    }

    private createLine() {
        this.arrowShoot = this.scene.add.line(this.shootedBubble.x,this.shootedBubble.y,0,0,100,0,0xff0000);
        this.arrowShoot.setOrigin(0,0);
        this.arrowShoot.setVisible(false);
    }

    private rotateShooter() {
        if(this.checkAllowShooting) {
            let angle = Phaser.Math.RAD_TO_DEG * 
            Phaser.Math.Angle.Between(this.shootedBubble.x,this.shootedBubble.y, this.scene.input.mousePointer.x, this.scene.input.mousePointer.y);
            if (angle < 0) {
                angle = 180 + (180 + angle);
            }
            if(angle >= 180 && angle <= 360) {
                if(angle < 190) {
                    angle = 190;
                }
                else {
                    if(angle > 350) {
                        angle = 350;
                    }
                }
                this.arrowShoot.setAngle(angle);
                this.shotGuide.run();
            }
        }
    }

    private shootBubble() {
        if(this.arrowShoot.angle != 0) {
            this.scene.events.emit('shooted');
            this.shootedBubble.body.checkCollision.none = false;
            this.shootedBubble.checkWorldBounce = true;
            this.shootedBubble.initialX = this.shootedBubble.x;
            this.shootedBubble.initialY = this.shootedBubble.y;
            this.shootedBubble.setScale(1.1,1);
            this.scene.physics.velocityFromRotation (
                this.arrowShoot.angle*Phaser.Math.DEG_TO_RAD,
                2400,
                this.shootedBubble.body.velocity
            );
            this.checkAllowShooting = false;
            this.bulletSwaper.swapBulletAfterShooting();
        }
    }

    public makeSecondBullet() {
        this.bulletCreator.createSecondBullet();
    }
    
    public update() {
        this.rotateShooter();
        this.shotGuide.update();
        this.bulletGroup.getChildren().forEach((_bullet:any) => {
            const bullet = _bullet as ShootedBubble;
            if(bullet?.body.speed > 0) {
                bullet.update();
            }
        });
        if(this.isShoot) {
            this.isShoot = false;
            this.shootBubble();
        }
        if(this.bulletSwaper.finished) {
            this.checkAllowShooting = true;
        }
        if(!this.checkAllowShooting) {
            this.shotGuide.hide();
        }
    }
}