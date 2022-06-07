export class Bubble extends Phaser.GameObjects.Sprite {
    public body!: Phaser.Physics.Arcade.Body;
    
    constructor(scene:Phaser.Scene, x:number, y:number, texture:string) {
        super(scene,x,y,texture);
        this.scene.physics.world.enable(this);
    }
}