import DEPTH from "../game/constant/Depth";
import { GameScene } from "../scenes/GameScene";
import { ShootedBubble } from "./ShootedBubble";

export class Bomb extends ShootedBubble {
    private yellowFire: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private redFire: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private emiter1: Phaser.GameObjects.Particles.ParticleEmitter;
    private emiter2: Phaser.GameObjects.Particles.ParticleEmitter;
    private offsetXParticle:number;
    private offsetYParticle:number;


    constructor(scene:GameScene, x:number, y:number, texture:string) {
        super(scene,x,y,texture);
        this.scene.add.existing(this);
        this.name = 'Bomb';
        this.setDepth(DEPTH.BULLET);
        this.offsetXParticle = this.width/2 - 10;
        this.offsetYParticle = -(this.height/2 - 5);
        this.setUpParticles();        
    }

    public setUpParticles() {
        this.yellowFire = this.scene.add.particles('star').setDepth(DEPTH.PARTICLE);
        this.emiter1 = this.yellowFire.createEmitter({
            tint: 0xffd712,
            alpha: {start:0.5, end: 0},
            speed: 60,
            gravityY: 100,
            blendMode: 'SCREEN',
            frequency: 10,
            angle: {min: 0, max: 360},
            lifespan: 500
        });
        this.redFire = this.scene.add.particles('light').setDepth(DEPTH.PARTICLE);
        this.emiter2 = this.redFire.createEmitter({
            tint: 0xeb2f2f,
            alpha: 0.5,
            speed: 30,
            blendMode: 'SCREEN',
            lifespan: 1000
        });
        this.updateParticlePosition();
    }

    private removeParticle() {
        this.yellowFire.destroy();
        this.redFire.destroy();
    }

    public removeVisualEffect() {
        this.tail.removeFromDisplayList();
        this.removeParticle();
    }

    private updateParticlePosition() {
        this.yellowFire.setPosition(this.x + this.offsetXParticle,this.y + this.offsetYParticle);
        this.emiter1.setPosition(0,0);
        this.redFire.setPosition(this.x + this.offsetXParticle,this.y + this.offsetYParticle);
        this.emiter2.setPosition(0,0);
    }

    public update(...args: any[]): void {
        this.updateTailPosition();
        this.updateParticlePosition();
        if(this.body.velocity.y != 0 && this.tail.visible == false) {
            this.tail.setVisible(true);
            this.setScale(1.1,1);
        }
    }
}