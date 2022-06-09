export class ShootedBubble extends Phaser.GameObjects.Sprite {
    public body!: Phaser.Physics.Arcade.Body;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string) {
        super(scene,x,y,texture);
        this.scene.physics.world.enable(this);
        // this.setScale(0.5);
        // this.body.setSize(this.displayWidth,this.displayHeight);
        this.body.setCircle(28,0,0);
        this.createBouncing();
    }

    public createBouncing() {
        this.body.setBounce(1,1);
        this.body.setCollideWorldBounds(true,undefined,undefined,true);
        this.scene.physics.world.setBoundsCollision(true,true,true,false);
        this.scene.physics.world.on('worldbounds',(e: any)=>{
            if(this.body.velocity != undefined) {
                if(this.body.velocity.y > 0) {
                    this.body.setVelocity(0,0);
                }
            }
        });
    }

    public disablePhysics() {
        this.body.setImmovable();
        this.body.setBounce(0,0);
        this.body.stop();
        this.body.setCollideWorldBounds(false);
        this.setVisible(false);
        this.body.checkCollision.none = true;
        this.scene.physics.world.disableBody(this.body);
    }
}