export class Bubble extends Phaser.GameObjects.Sprite {
    public body!: Phaser.Physics.Arcade.Body;
    public processed!: boolean;
    public row!:number;
    public column!: number;

    constructor(scene:Phaser.Scene, x:number, y:number,row:number,column:number, texture:string) {
        super(scene,x,y,texture);
        this.row = row;
        this.column = column;
        this.processed = false;
        this.scene.physics.world.enable(this);
        // this.setScale(0.5);
        // this.body.setSize(this.displayWidth,this.displayHeight);
        this.body.setCircle(28,0,0);
        this.body.setImmovable();
    }

    public clear() {
        this.setVisible(false);
        this.body.checkCollision.none = true;
        this.scene.physics.world.disableBody(this.body);
        // this.destroy();
    }
}