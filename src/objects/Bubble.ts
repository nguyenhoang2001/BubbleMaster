export class Bubble extends Phaser.GameObjects.Sprite {
    public body!: Phaser.Physics.Arcade.Body;
    public processed!: boolean;
    public row!:number;
    public column!: number;

    constructor(scene:Phaser.Scene, x:number, y:number,row?:number,column?:number, texture?:string) {
        super(scene,x,y,texture!);
        this.row = row!;
        this.column = column!;
        this.processed = false;
        this.scene.physics.world.enable(this);
        this.body.setCircle(28,0,0);
        this.body.setImmovable(true);
        this.name = 'Bubble';
    }

    public clear() {
        this.scene.physics.world.disableBody(this.body);
    }

    public resetPhysics() {
        this.scene.physics.world.enable(this);
        this.body.setCircle(28,0,0);
        this.body.setGravity(0,0);
        this.body.reset(this.x,this.y);
        this.body.setBounce(0,0);
        this.body.setCollideWorldBounds(false);
        this.body.checkCollision.none = false;
    }
}