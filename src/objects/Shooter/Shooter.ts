import DEPTH from "../../game/constant/Depth";
import { GameScene } from "../../scenes/GameScene";
import { Bomb } from "../Bomb";
import { FireBubble } from "../FireBubble";
import { ShootedBubble } from "../ShootedBubble";
import { AnimationShooter } from "./Helpers/AnimationShooter";
import { BulletCreator } from "./Helpers/BulletCreator";
import { BulletSwaper } from "./Helpers/BulletSwaper";
import { ShotGuide } from "./Helpers/ShotGuide";

export class Shooter {
    public scene: GameScene;

    public bulletGroup: Phaser.GameObjects.Group;
    private flyingBulletGroup:Phaser.GameObjects.Group;

    private bulletCreator: BulletCreator;
    public bulletSwaper: BulletSwaper;

    public rectangleBound: Phaser.Geom.Rectangle;

    public shootedBubble: ShootedBubble | Bomb | FireBubble;
    public secondBubllet: ShootedBubble;

    public animation: AnimationShooter;
    public circle: Phaser.GameObjects.Image;
    public arrowShoot: Phaser.GameObjects.Line

    private shotGuide: ShotGuide;

    private isShoot: boolean;
    public checkAllowShooting: boolean;
    private pointerOnCircle: boolean;

    constructor(scene:GameScene) {
        this.scene = scene;

        this.bulletGroup = this.scene.add.group({classType:ShootedBubble});
        this.flyingBulletGroup = this.scene.add.group({});

        this.bulletCreator = new BulletCreator(this);
        this.bulletSwaper = new BulletSwaper(this);
        this.animation = new AnimationShooter(this,this.scene);

        let offsetXBound = 20;
        this.rectangleBound = new Phaser.Geom.Rectangle(offsetXBound,0,this.scene.sys.canvas.width - offsetXBound*2,this.scene.sys.canvas.height);

        this.drawCircle();
        this.bulletCreator.createTwoBullets();
        this.drawLine();

        this.shotGuide = new ShotGuide(this, this.scene);

        this.enableInput();
        this.enableChangeBubble();

        this.isShoot = false;
        this.checkAllowShooting = true;
        this.pointerOnCircle = false;
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
        this.scene.input.removeAllListeners();
    }

    private enableChangeBubble() {
        this.circle.setInteractive();
        this.circle.on('pointerdown', (pointer:Phaser.Input.Pointer) => {
            if(pointer.leftButtonDown()) {
                if(this.bulletSwaper.finished) {
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
                    if(this.checkAllowShooting && this.bulletSwaper.finished && !this.pointerOnCircle && this.shotGuide.circleGuideGroup.countActive(true) > 0) {
                        this.isShoot = true;
                    }else {
                        this.isShoot = false;
                    }
                } 
                else if (pointer.rightButtonReleased()) {
                    if(this.bulletSwaper.finished) {
                        this.bulletSwaper.startSwaping();
                    }
                }
            },this);

            this.scene.input.on('pointermove', (pointer:any) => {
                // console.log('when pointer is moving we rotate');
                this.rotateShooter(pointer);
            });
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

    private rotateShooter(pointer: Phaser.Input.Pointer) {
        if(this.checkAllowShooting && this.bulletSwaper.finished) {
            let angle = Phaser.Math.RAD_TO_DEG * 
            Phaser.Math.Angle.Between(this.shootedBubble.x,this.shootedBubble.y, pointer.x, pointer.y);
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
                this.shotGuide.draw();
            } else {
                // console.log('fade out in angle');
                this.shotGuide.fadeOut();
            }
        }
    }

    private shootBubble() {
        if(this.arrowShoot.angle != 0) {
            this.scene.events.emit('shooted');
            this.shootedBubble.body.checkCollision.none = false;
            this.shootedBubble.checkWorldBounce = true;
            this.scene.physics.velocityFromRotation (
                this.arrowShoot.angle*Phaser.Math.DEG_TO_RAD,
                2400,
                this.shootedBubble.body.velocity
            );
            this.flyingBulletGroup.add(this.shootedBubble);
            this.bulletSwaper.swapBulletAfterShooting();
        }
    }

    public makeSecondBullet() {
        this.bulletCreator.createSecondBullet();
    }
    
    public update() {
        this.shotGuide.update();
        this.flyingBulletGroup.getChildren().forEach((_bullet:any) => {
            const bullet = _bullet as ShootedBubble;
            if(bullet?.body.speed > 0) {
                bullet.update();
            }
        });
        if(this.isShoot) {
            this.isShoot = false;
            this.shootBubble();
        }
        if(!this.checkAllowShooting || !this.bulletSwaper.finished) {
            // console.log('fadeOut in update');
            this.shotGuide.fadeOut();
        } 
        if(this.checkAllowShooting && this.bulletSwaper.finished && this.shotGuide.circleGuideGroup.countActive(true) == 0) {
            // console.log(this.shotGuide.circleGuideGroup.countActive(false));
            this.rotateShooter(this.scene.input.activePointer);
        }
    }
}