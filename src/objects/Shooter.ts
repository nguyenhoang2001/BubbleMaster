import { GameScene } from "../scenes/GameScene";
import { ShootedBubble } from "./ShootedBubble";

export class Shooter {
    public shootedBubble!: ShootedBubble;
    public scene!: GameScene;
    private arrowShoot!: Phaser.GameObjects.Line
    private circle!: Phaser.GameObjects.Image;
    private numberOfShooting!: number;
    public shootTenTimes!: boolean;
    public allowShooting!: boolean;
    public bulletGroup!: Phaser.GameObjects.Group;

    constructor(scene:GameScene) {
        this.scene = scene;
        this.numberOfShooting = 5;
        this.allowShooting = true;
        this.bulletGroup = this.scene.add.group({});
        this.createShootedBubble();
        this.drawLineAndCircle();
        this.enableInput();
    }

    public createShootedBubble() {
        this.shootedBubble = new ShootedBubble(this.scene,28,28,this.scene.typeGenerator.getCurrentTexture());
        Phaser.Display.Align.In.BottomCenter(this.shootedBubble,this.scene.bubblesContainer.mainZone);
        this.scene.add.existing(this.shootedBubble);
        this.bulletGroup.add(this.shootedBubble);
        // this.scene.bubblesBoard.colliderBubble.createColliderShootedBubble(this.shootedBubble);
    }

    public drawLineAndCircle() {
        this.createLine();
        this.drawCircle();
    }

    public isShootTenTimes():boolean {
        if(this.numberOfShooting <= 0) {
            this.numberOfShooting = 5;
            return true;
        }
        return false;
    }

    private updateAllowShooting() {
        if(this.scene.bubblesBoard.addingManager.finishedAdding) {
            if(!this.scene.bubblesBoard.clusters.isHavingClusters) {
                this.allowShooting = true;
                this.scene.bubblesBoard.addingManager.finishedAdding = false;
            } else {
                if(this.scene.bubblesBoard.clusters.clustersFinish) {
                    if(!this.scene.bubblesBoard.floatingBubbles.isFloating) {
                        this.scene.bubblesBoard.addingManager.finishedAdding = false;
                        this.allowShooting = true;
                    } else {
                        if(this.scene.bubblesBoard.floatingBubbles.floatingFinish) {
                            this.scene.bubblesBoard.addingManager.finishedAdding = false;
                            this.allowShooting = true;
                        }
                    }
                }
            }
        }
    }

    public enableInput() {
            this.scene.input.on('pointerup',() => {
                if(this.allowShooting) {
                    this.allowShooting = false;
                    this.scene.physics.velocityFromRotation(
                        this.arrowShoot.angle*Phaser.Math.DEG_TO_RAD,
                        2000,
                        this.shootedBubble.body.velocity
                    );
                    this.numberOfShooting -= 1;
                    this.shootTenTimes = this.isShootTenTimes();
                    this.createShootedBubble();
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
        this.shootedBubble.setDepth(1);
    }

    private rotateShooter() {
        let angle = Phaser.Math.RAD_TO_DEG * 
            Phaser.Math.Angle.Between(this.arrowShoot.x,this.arrowShoot.y, this.scene.input.mousePointer.x, this.scene.input.mousePointer.y);
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
        }
    }
    
    public update() {
        this.rotateShooter();
        if(!this.allowShooting) {
            this.updateAllowShooting();
            if(this.allowShooting) {
                console.log('reset allow success');
            }
        }
    }
}