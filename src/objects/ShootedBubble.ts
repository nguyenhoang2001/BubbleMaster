export class ShootedBubble extends Phaser.GameObjects.Sprite {
    public body!: Phaser.Physics.Arcade.Body;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string) {
        super(scene,x,y,texture);
        this.scene.physics.world.enable(this);
        this.createCollider();
    }

    public createCollider() {
        this.body.setBounce(1,1);
        this.body.setCollideWorldBounds(true);
        this.scene.physics.world.on('worldbounds', this.onWorldBounds);
    }

    onWorldBounds ()
    {
        if(this.body.touching.up) {
            this.body.stop();
        }
    }

}