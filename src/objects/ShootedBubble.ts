export class ShootedBubble extends Phaser.GameObjects.Sprite {
    public body!: Phaser.Physics.Arcade.Body;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string) {
        super(scene,x,y,texture);
        this.scene.physics.world.enable(this);
        this.createBouncing();
    }

    public createBouncing() {
        this.body.setBounce(1,1);
        this.body.setCollideWorldBounds(true,undefined,undefined,true);
        this.scene.physics.world.setBoundsCollision(true,true,true,false);
        this.scene.physics.world.on('worldbounds',(e: any)=>{
            if(this.body.velocity.y > 0) {
                this.body.setVelocity(0,0);
            }
        });
    }

    public update(): void {

    }

}