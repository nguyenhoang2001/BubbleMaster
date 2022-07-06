import { TintGenerator } from "./TintGenerator";

export class Bubble extends Phaser.Physics.Arcade.Sprite {
    public body: Phaser.Physics.Arcade.Body;
    public processed: boolean;
    public row:number;
    public column: number;
    public tintGenerator: TintGenerator;
    public isOutGrid:boolean;
    public score:number;

    constructor(scene:Phaser.Scene, x:number, y:number,texture:string,row?:number,column?:number) {
        super(scene,x,y,texture);
        if(row != undefined && column != undefined) {
            this.row = row;
            this.column = column;
        }
        this.processed = false;
        this.isOutGrid = false;
        this.scene.physics.world.enable(this);
        this.body.setCircle(28,0,0);
        this.body.setImmovable(true);
        this.name = 'Bubble';
        this.score = 0;
        this.tintGenerator = new TintGenerator(this);
    }

    public clear() {
        this.scene.physics.world.disableBody(this.body);
        this.body.checkCollision.none = true;
        this.body.stop();
        this.body.setGravity(0,0);
        this.body.onWorldBounds = false;
        this.body.setCollideWorldBounds(false,undefined,undefined,false);
    }

    public resetPhysics() {
        this.scene.physics.world.enable(this);
        this.body.checkCollision.none = false;
        this.body.onWorldBounds = false;
        this.isOutGrid = false;
        this.score = 0;
        this.body.setImmovable(true);
        this.body.setCircle(28,0,0);
        this.body.setGravity(0,0);
        this.body.reset(this.x,this.y);
        this.body.setBounce(0,0);
        this.body.setCollideWorldBounds(false);
    }

    public setTintColor(textureKey:string) {
        this.setTint(this.tintGenerator.getTint(textureKey));
    }
}