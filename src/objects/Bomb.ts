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

    private setUpParticles() {
        this.yellowFire = this.scene.add.particles('gamePlay32bit','effects/circle-1').setDepth(DEPTH.PARTICLE)
        let emitter1 = this.yellowFire.createEmitter({
            tint: 0xffd712,
            speed: 20,
            blendMode: 'ADD',
            lifespan: 1000
        });
        emitter1.startFollow(this,this.width/2 - 10,-(this.height/2 - 5));
        this.redFire = this.scene.add.particles('gamePlay32bit','effects/light');
        let emitter2 = this.redFire.createEmitter({
            // tint: 0xff0000,
            speed: 50,
            blendMode: 'ADD',
            lifespan: 1000
        });
        emitter2.startFollow(this,this.width/2 - 10,-(this.height/2 - 5));
    }

    public removeParticle() {
        this.yellowFire.destroy();
        this.redFire.destroy();
    }

    public update(...args: any[]): void {
        this.updateTailPosition();
        this.setRotation(this.body.velocity.angle());
        if(this.body.velocity.y != 0 && this.tail.visible == false) {
            this.tail.setVisible(true);
            this.setScale(1.1,1);
        }
    }
}