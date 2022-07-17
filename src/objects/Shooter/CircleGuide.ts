export class CircleGuide extends Phaser.GameObjects.Sprite {
    public body: Phaser.Physics.Arcade.Body;
    public isOverlap: boolean;

    constructor(scene:Phaser.Scene,x:number,y:number,texture:string) {
        super(scene,x,y,texture);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
        this.body.setCircle(10,5,5);
        this.isOverlap = false;
    }

}