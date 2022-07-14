import DEPTH from "../game/constant/Depth";
import { GameScene } from "../scenes/GameScene";
import { ShootedBubble } from "./ShootedBubble";

export class Bomb extends ShootedBubble {
    private yellowFire: Phaser.GameObjects.Particles.ParticleEmitterManager;
    private redFire: Phaser.GameObjects.Particles.ParticleEmitterManager;

    constructor(scene:GameScene, x:number, y:number, texture:string) {
        super(scene,x,y,texture);
        this.scene.add.existing(this);
        this.name = 'Bomb';
        this.setDepth(DEPTH.BULLET);
        this.setUpParticles();        
    }

    public setUpParticles() {
        this.yellowFire = this.scene.add.particles('star').setDepth(DEPTH.PARTICLE)
        let emiter1 = this.yellowFire.createEmitter({
            tint: 0xffd712,
            alpha: {start:0.5, end: 0},
            speed: 60,
            gravityY: 100,
            blendMode: 'SCREEN',
            frequency: 10,
            angle: {min: 0, max: 360},
            lifespan: 500
        });
        emiter1.startFollow(this,this.width/2 - 10,-(this.height/2 - 5));
        this.redFire = this.scene.add.particles('light').setDepth(DEPTH.PARTICLE);
        let emiter2 = this.redFire.createEmitter({
            tint: 0xeb2f2f,
            alpha: 0.5,
            speed: 30,
            blendMode: 'SCREEN',
            lifespan: 1000,
        });
        emiter2.startFollow(this,this.width/2 - 10,-(this.height/2 - 5));
    }

    private removeParticle() {
        this.yellowFire.destroy();
        this.redFire.destroy();
    }

    public removeVisualEffect() {
        this.tail.removeFromDisplayList();
        this.removeParticle();
    }

    public update(...args: any[]): void {
        this.updateTailPosition();
        // this.setRotation(this.body.velocity.angle());
        if(this.body.velocity.y != 0 && this.tail.visible == false) {
            this.tail.setVisible(true);
            this.setScale(1.1,1);
        }
    }
}