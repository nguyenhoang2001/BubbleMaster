import { GameScene } from "../scenes/GameScene";
import { ShootedBubble } from "./ShootedBubble";

export class Shooter {
    public shootedBubble!: ShootedBubble;
    public scene!: GameScene;
    private arrowShoot!: Phaser.GameObjects.Line
    private circle!: Phaser.GameObjects.Image;

    constructor(scene:GameScene) {
        this.scene = scene;
        this.shootedBubble = new ShootedBubble(this.scene,28,28,'greenBubble');
        Phaser.Display.Align.In.BottomCenter(this.shootedBubble,this.scene.gameContainer.mainZone);
        this.scene.add.existing(this.shootedBubble);
        this.drawLineAndCircle();
        this.enableInput();
    }

    public drawLineAndCircle() {
        this.createLine();
        this.drawCircle();
    }

    public enableInput() {
        this.scene.input.on('pointerdown',() => {
            this.scene.physics.velocityFromRotation(
                this.shootedBubble.angle*Phaser.Math.DEG_TO_RAD,
                500,
                this.shootedBubble.body.velocity
              );
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
            this.shootedBubble.setAngle(angle);
            this.arrowShoot.setAngle(angle);
        }
    }

    public handleInput() {

    }
    
    public update() {
        this.rotateShooter();
    }
}