import { Bubble } from "./Bubble";

export class ShootedBubble extends Bubble {
    public body!: Phaser.Physics.Arcade.Body;
    public checkWorldBounce!: boolean;
    public initialX!:number;
    public initialY!:number;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string) {
        super(scene,x,y,undefined,undefined,texture);
        this.body.setCircle(20,8,8);
        this.createBouncing();
        this.name = 'ShootedBubble';
        this.checkWorldBounce = false;
        this.initialX = 0;
        this.initialY = 0;
    }

    public createBouncing() {
        this.body.setBounce(1,1);
        this.body.setCollideWorldBounds(true,undefined,undefined,true);
        this.scene.physics.world.on('worldbounds', (e:any) => {
            if(this.checkWorldBounce) {
                
            }
        });
    }

    public clear() {
        this.scene.physics.world.disableBody(this.body);
        this.body.setCollideWorldBounds(false,undefined,undefined,false);
        this.checkWorldBounce = false;
    }
}