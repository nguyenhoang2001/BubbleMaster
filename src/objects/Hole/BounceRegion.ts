export class BounceRegion extends Phaser.GameObjects.Rectangle {
    public body!: Phaser.Physics.Arcade.Body;

    constructor(scene:Phaser.Scene, x:number, y:number,width?:number,height?:number) {
        super(scene,x,y,width,height);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setImmovable(true);
    }
}