import DEPTH from "../game/constant/Depth";
import { GameScene } from "../scenes/GameScene";
import { BombParticles } from "./BombParticles";
import { ShootedBubble } from "./ShootedBubble";

export class Bomb extends ShootedBubble {
    public offsetXParticle:number;
    public offsetYParticle:number;
    private particles: BombParticles;
    public scene: GameScene;

    constructor(scene:GameScene, x:number, y:number, texture:string) {
        super(scene,x,y,texture);
        this.scene.add.existing(this);
        this.body.setCircle(10,20,25);
        this.name = 'Bomb';
        this.setDepth(DEPTH.BULLET);
        this.offsetXParticle = this.width/2 - 10;
        this.offsetYParticle = -(this.height/2 - 5);
        this.setUpParticles();        
    }

    public setUpParticles() {
        this.particles = new BombParticles(this.scene,this,'gamePlay32bit').setDepth(DEPTH.PARTICLE);
        this.particles.updatePosition();
    }

    private removeParticle() {
        this.particles.destroy();
    }

    public removeVisualEffect() {
        this.tail.removeFromDisplayList();
        this.removeParticle();
    }

    public update(...args: any[]): void {
        this.updateTailPosition();
        this.particles.updatePosition();
        if(this.body.velocity.y != 0 && this.tail.visible == false) {
            this.tail.setVisible(true);
        }
    }
}