import { Bubble } from "./Bubble";

export class ShootedBubble extends Bubble {
    public body!: Phaser.Physics.Arcade.Body;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string) {
        super(scene,x,y,undefined,undefined,texture);
        this.createBouncing();
        this.name = 'ShootedBubble';
    }

    public createBouncing() {
        this.body.setBounce(1,1);
        this.body.setCollideWorldBounds(true,undefined,undefined,true);
        this.scene.physics.world.setBoundsCollision(true,true,false,false);
        // this.scene.physics.world.on('worldbounds',(e: any)=>{
        //     if(this.body.velocity != undefined) {
        //         if(this.body.velocity.y > 0) {
        //             this.body.setVelocity(0,0);
        //         }
        //     }
        // });
    }

    public stopPhysics() {
        this.scene.physics.world.disableBody(this.body);
    }

    public resetPhysics() {
        this.scene.physics.world.enable(this);
        this.body.reset(this.x,this.y);
        this.body.setBounce(0,0);
        this.body.setCollideWorldBounds(false);
    }
}