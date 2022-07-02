import { GameScene } from "../../../scenes/GameScene";
import { Shooter } from "../Shooter";

export class BulletSwaper {
    private shooter!: Shooter;
    private scene!: GameScene;
    public finished!: boolean;
    private countingFinish!: number;

    constructor(shooter:Shooter) {
        this.shooter = shooter;
        this.scene = this.shooter.scene;
        this.finished = true;
        this.countingFinish = 0;
    }

    public run() {
        this.finished = false;
        this.tweenFirstBubble();
        this.tweenSecondBubble();
    }

    private tweenFirstBubble() {
        this.scene.tweens.add({
            targets: this.shooter.lineShootedBubble,
            angle: '-=210',
            duration: 500,
            ease: 'Power2',
            onUpdate: (tween: Phaser.Tweens.Tween, target: any) => {
                let line = new Phaser.Geom.Line(this.shooter.circle.x - 65,this.shooter.circle.y,this.shooter.circle.x + 65, 
                    this.shooter.circle.y);
                let angle = target.angle;
                Phaser.Geom.Line.Rotate(line, (-90 + angle) * Phaser.Math.DEG_TO_RAD);
                this.shooter.shootedBubble.x = line.x2;
                this.shooter.shootedBubble.y = line.y2;
            },
            onComplete: () => {
                this.countingFinish += 1;
            }
        });
        this.scene.tweens.add({
            targets:this.shooter.shootedBubble,
            scale: 0.8,
            duration: 500,
            ease: 'Power2'
        });
    }

    private tweenSecondBubble() {
        this.scene.tweens.add({
            targets:this.shooter.secondBubllet,
            scale: 1,
            duration: 500,
            ease: 'Power2'
        });
        this.scene.tweens.add({
            targets: this.shooter.lineSecondBubble,
            angle: '-=150',
            duration: 500,
            ease: 'Power2',
            onUpdate: (tween: Phaser.Tweens.Tween, target: any) => {
                let line = new Phaser.Geom.Line(this.shooter.circle.x - 65,this.shooter.circle.y,this.shooter.circle.x + 65, 
                    this.shooter.circle.y);
                let angle = target.angle;
                Phaser.Geom.Line.Rotate(line, (60 + angle) * Phaser.Math.DEG_TO_RAD);
                this.shooter.secondBubllet.x = line.x2;
                this.shooter.secondBubllet.y = line.y2;
            },
            onComplete: (tween: Phaser.Tweens.Tween, target: any) => {
                this.countingFinish += 1;
            }
        });
    }

    public afterShooting() {
        this.finished = false;
        this.scene.tweens.add({
            targets:this.shooter.secondBubllet,
            scale: 1,
            duration: 500,
            ease: 'Power2'
        });
        this.scene.tweens.add({
            targets: this.shooter.lineSecondBubble,
            angle: '-=150',
            duration: 500,
            ease: 'Power2',
            onUpdate: (tween: Phaser.Tweens.Tween, target: any) => {
                let line = new Phaser.Geom.Line(this.shooter.circle.x - 65,this.shooter.circle.y,this.shooter.circle.x + 65, 
                    this.shooter.circle.y);
                let angle = target.angle;
                Phaser.Geom.Line.Rotate(line, (60 + angle) * Phaser.Math.DEG_TO_RAD);
                this.shooter.secondBubllet.x = line.x2;
                this.shooter.secondBubllet.y = line.y2;
            },
            onComplete: (tween: Phaser.Tweens.Tween, target: any) => {
                this.shooter.lineSecondBubble.setAngle(0);
                this.shooter.shootedBubble = this.shooter.secondBubllet;
                this.shooter.makeSecondBullet();
                this.shooter.secondBubllet.setScale(0);
                this.scene.tweens.add({
                    targets:this.shooter.secondBubllet,
                    scale: 0.8,
                    duration: 200,
                    ease: 'Power2',
                    onComplete: () => {
                        this.finished = true;
                    }
                });
            }
        });
    }

    private resetLine() {
        this.shooter.lineShootedBubble.setAngle(0);
        this.shooter.lineSecondBubble.setAngle(0);
    }

    public update() {
        if(this.countingFinish >= 2) {
            this.countingFinish = 0;
            const secondBullet = this.shooter.secondBubllet;
            const shootBullet = this.shooter.shootedBubble;
            let saveCurrentBullet = shootBullet;
            this.shooter.shootedBubble = secondBullet;
            this.shooter.secondBubllet = saveCurrentBullet;
            this.resetLine();
            this.finished = true;
        }
    }
}