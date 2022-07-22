import { BombFlyBehavior } from "../Behaviors/BombFlyBehavior";
import { IBullet } from "src/interfaces/IBullet";
import Depth from "../game/constant/Depth";
import { GameScene } from "../scenes/GameScene";
import { BombParticles } from "./BombParticles";
import { ShootedBubble } from "./ShootedBubble";
import { IBomb } from "src/interfaces/IBomb";

export class Bomb extends ShootedBubble implements IBomb {
    public offsetXParticle:number;
    public offsetYParticle:number;
    public particles: BombParticles;
    public scene: GameScene;

    constructor(scene:GameScene, x:number, y:number, texture:string) {
        super(scene,x,y,texture);
        this.flyBehavior = new BombFlyBehavior(this);
        this.scene.add.existing(this);
        this.body.setCircle(10,20,25);
        this.name = 'Bomb';
        this.setDepth(Depth.BULLET);
        this.offsetXParticle = this.width/2 - 10;
        this.offsetYParticle = -(this.height/2 - 5);
        this.setUpParticles();        
    }

    public setUpParticles() {
        this.particles = new BombParticles(this.scene,this,'gamePlay32bit').setDepth(Depth.PARTICLE);
        this.particles.updatePosition();
    }

    private removeParticle() {
        this.particles.destroy();
    }

    public removeVisualEffect() {
        this.tail.removeFromDisplayList();
        this.removeParticle();
    }
}