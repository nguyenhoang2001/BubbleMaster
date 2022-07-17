import { GameScene } from "../scenes/GameScene";
import { Bomb } from "./Bomb";

export class BombParticles extends Phaser.GameObjects.Particles.ParticleEmitterManager {
    public scene:GameScene;
    public bomb: Bomb;

    constructor(scene:GameScene,bomb:Bomb,texture:string) {
        super(scene,texture);
        this.bomb = bomb;
        this.scene.add.existing(this);
        this.setUpParticles();
    }

    private setUpParticles() {
        this.createEmitter({
            frame:'effects/star',
            tint: 0xffd712,
            alpha: {start:0.5, end: 0},
            speed: 60,
            gravityY: 100,
            blendMode: 'SCREEN',
            frequency: 10,
            angle: {min: 0, max: 360},
            lifespan: 500
        });
        this.createEmitter({
            frame:'effects/light',
            tint: 0xeb2f2f,
            alpha: 0.5,
            speed: 30,
            blendMode: 'SCREEN',
            lifespan: 1000
        });
    }

    public updatePosition() {
        this.setPosition(this.bomb.x + this.bomb.offsetXParticle,this.bomb.y + this.bomb.offsetYParticle);
        this.emitters.each((emitter:any) => {
            emitter.setPosition(0,0);
        });
    }
}