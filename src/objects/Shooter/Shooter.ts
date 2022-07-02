import { GameScene } from "../../scenes/GameScene";
import { ShootedBubble } from "../ShootedBubble";
import { AnimationShooter } from "./Helpers/AnimationShooter";
import { BulletCreator } from "./Helpers/BulletCreator";
import { BulletSwaper } from "./Helpers/BulletSwaper";
import { ShotGuide } from "./Helpers/ShotGuide";

export class Shooter {
    public shootedBubble!: ShootedBubble;
    public scene!: GameScene;
    public arrowShoot!: Phaser.GameObjects.Line
    public circle!: Phaser.GameObjects.Image;
    public allowShooting!: boolean;
    public bulletGroup!: Phaser.GameObjects.Group;
    public secondBubllet!: ShootedBubble;
    private bulletCreator!: BulletCreator;
    private bulletSwaper!: BulletSwaper;
    private isShoot!: boolean;
    public checkAllowShooting!: boolean;
    private shotGuide!: ShotGuide;
    public lineShootedBubble!: Phaser.GameObjects.Line;
    public lineSecondBubble!: Phaser.GameObjects.Line;
    public animation!: AnimationShooter;


    constructor(scene:GameScene) {
        this.scene = scene;
        this.allowShooting = false;
        this.isShoot = false;
        this.checkAllowShooting = true;
        this.bulletGroup = this.scene.add.group({classType:ShootedBubble});
        this.bulletCreator = new BulletCreator(this);
        this.bulletSwaper = new BulletSwaper(this);
        this.shotGuide = new ShotGuide(this, this.scene);
        this.animation = new AnimationShooter(this,this.scene);
        this.drawCircle();
        this.bulletCreator.run();
        this.drawLine();
        this.enableInput();
        this.InputChangeBubble();
    }

    private drawLine() {
        this.lineShootedBubble = this.scene.add.line(this.circle.x,this.circle.y,0,0,this.shootedBubble.x - this.circle.x,
            this.shootedBubble.y - this.circle.y,0xff0000).setOrigin(0,0).setVisible(false);
        this.lineSecondBubble = this.scene.add.line(this.circle.x,this.circle.y,0,0,this.secondBubllet.x - this.circle.x,
            this.secondBubllet.y - this.circle.y,0xff0000).setOrigin(0,0).setVisible(false);
        this.createLine();
    }

    public setUpPositionSecond() {
        let line = new Phaser.Geom.Line(this.circle.x - 65,this.circle.y,this.circle.x + 65, this.circle.y);
        Phaser.Geom.Line.Rotate(line, 60 * Phaser.Math.DEG_TO_RAD);
        this.secondBubllet.x = line.x2;
        this.secondBubllet.y = line.y2;
    }

    public setUpPositionFirst() {
        let line = new Phaser.Geom.Line(this.circle.x - 65,this.circle.y,this.circle.x + 65, this.circle.y);
        Phaser.Geom.Line.Rotate(line, -90 * Phaser.Math.DEG_TO_RAD);
        this.shootedBubble.x = line.x2;
        this.shootedBubble.y = line.y2;
    }

    public clearShotGuide() {
        this.shotGuide.hide();
    }

    private updateAllowShooting() {
        if(this.checkAllowShooting) {
            if(this.scene.bubblesBoard.addingManager.finishedAddingBullet) {
                if(!this.scene.bubblesBoard.clusters.isHavingClusters && !this.scene.bubblesBoard.floatingBubbles.isFloating)
                    this.allowShooting = true;
            }
            // if(this.scene.bubblesContainer.isRunning) {
            //     this.allowShooting = false;
            // } else {
            //     if(this.scene.bubblesBoard.addingManager.finishedAddingBullet) {
            //         if(!this.scene.bubblesBoard.clusters.isHavingClusters && !this.scene.bubblesBoard.floatingBubbles.isFloating)
            //             this.allowShooting = true;
            //     }
            // }
        }
    }

    private InputChangeBubble() {
        this.circle.setInteractive();
        this.circle.on('pointerdown', () => {
            if(this.bulletSwaper.finished) {
                this.checkAllowShooting = false;
                this.allowShooting = false;
                this.bulletSwaper.run();
            }
        });
    }

    public enableInput() {
            this.scene.input.on('pointerup',() => {
                if(this.allowShooting) {
                    this.isShoot = true;
                    this.allowShooting = false;
                }
            },this);
    }

    private drawCircle() {
        this.circle = this.scene.add.image(0,0,'circle');
        Phaser.Display.Align.In.BottomCenter(this.circle,this.scene.mainZone,0,-100);
        this.animation.createAnimationForCircle();
    }

    private createLine() {
        this.arrowShoot = this.scene.add.line(this.shootedBubble.x,this.shootedBubble.y,0,0,100,0,0xff0000);
        this.arrowShoot.setOrigin(0,0);
        this.arrowShoot.setVisible(false);
        this.shootedBubble.setDepth(1);
        this.secondBubllet.setDepth(1);
    }

    private rotateShooter() {
        if(this.allowShooting) {
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
            this.shootedBubble.body.checkCollision.none = false;
            this.shootedBubble.checkWorldBounce = true;
            this.shootedBubble.initialX = this.shootedBubble.x;
            this.shootedBubble.initialY = this.shootedBubble.y;
            this.shootedBubble.setScale(1.2,1);
            this.scene.physics.velocityFromRotation (
                this.arrowShoot.angle*Phaser.Math.DEG_TO_RAD,
                2400,
                this.shootedBubble.body.velocity
            );
            this.shootedBubble.tail.setVisible(true);
            this.checkAllowShooting = false;
            this.bulletSwaper.afterShooting();
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
            if(bullet != undefined) {
                bullet.update();
            }
        });
        if(this.isShoot) {
            this.isShoot = false;
            this.scene.bubblesBoard.addingManager.finishedAddingBullet = false;
            this.shootBubble();
        }
        this.bulletSwaper.update();
        if(this.bulletSwaper.finished) {
            this.checkAllowShooting = true;
        }
        if(!this.allowShooting) {
            this.shotGuide.hide();
            this.updateAllowShooting();
        }
    }
}