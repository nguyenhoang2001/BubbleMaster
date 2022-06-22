import { Bubble } from "./Bubble";

export class ShootedBubble extends Bubble {
    public body!: Phaser.Physics.Arcade.Body;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string) {
        super(scene,x,y,undefined,undefined,texture);
        this.createBouncing();
        this.name = 'ShootedBubble';
        this.body.setCircle(14,14,14);

    }

    public createBouncing() {
        this.body.setBounce(1,1);
        this.body.setCollideWorldBounds(true,undefined,undefined,true);
    }
}