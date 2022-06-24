import { GameScene } from "../../scenes/GameScene";
import { ShootedBubble } from "../ShootedBubble";
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


    constructor(scene:GameScene) {
        this.scene = scene;
        this.allowShooting = false;
        this.isShoot = false;
        this.checkAllowShooting = true;
        this.bulletGroup = this.scene.add.group({classType:ShootedBubble});
        this.bulletCreator = new BulletCreator(this);
        this.bulletSwaper = new BulletSwaper(this);
        this.shotGuide = new ShotGuide(this, this.scene);
        this.bulletCreator.run();
        this.drawLineAndCircle();
        this.enableInput();
        this.InputChangeBubble();
    }

    public drawLineAndCircle() {
        this.createLine();
        this.drawCircle();
    }

    private updateAllowShooting() {
        if(this.checkAllowShooting) {
            if(this.scene.bubblesContainer.isRunning) {
                this.allowShooting = false;
            } else {
                if(this.scene.bubblesBoard.addingManager.finishedAddingBullet) {
                    if(!this.scene.bubblesBoard.clusters.isHavingClusters && !this.scene.bubblesBoard.floatingBubbles.isFloating)
                        this.allowShooting = true;
                }
            }
        }
    }

    private InputChangeBubble() {
        this.scene.input.keyboard.on('keydown-F', (event:any) => {
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
        this.circle.setScale(0.6);
        Phaser.Display.Align.In.Center(this.circle,this.shootedBubble);
        this.scene.tweens.add({
            targets:this.circle,
            scale: 0.7,
            yoyo: true,
            duration:1000,
            repeat: -1,
            ease:'Power1'
        });
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
        this.shootedBubble.body.checkCollision.none = false;
        this.shootedBubble.checkWorldBounce = true;
        this.shootedBubble.initialX = this.shootedBubble.x;
        this.shootedBubble.initialY = this.shootedBubble.y;
        this.scene.physics.velocityFromRotation(
            this.arrowShoot.angle*Phaser.Math.DEG_TO_RAD,
            2500,
            this.shootedBubble.body.velocity
        );
        this.checkAllowShooting = false;
        this.bulletSwaper.afterShooting();
    }

    public makeSecondBullet() {
        this.bulletCreator.createSecondBullet();
    }
    
    public update() {
        this.rotateShooter();
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