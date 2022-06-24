import { Bubble } from "./Bubble";

export class ShootedBubble extends Bubble {
    public body!: Phaser.Physics.Arcade.Body;
    public checkWorldBounce!: boolean;
    public initialX!:number;
    public initialY!:number;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string) {
        super(scene,x,y,undefined,undefined,texture);
        this.body.setCircle(10,18,18);
        this.createBouncing();
        this.name = 'ShootedBubble';
        this.checkWorldBounce = false;
        this.initialX = 0;
        this.initialY = 0;
    }

    public createBouncing() {
        this.body.setBounce(1,1);
        this.body.setCollideWorldBounds(true,undefined,undefined,true);
        this.scene.physics.world.on('worldbounds', (e:any) => {
            if(this.checkWorldBounce) {
                console.log('when real bubble bounce');
                console.log(this.x,this.y);
                if(this.x > this.initialX) {
                    this.x = this.scene.sys.game.canvas.width - 28;
                } else {
                    this.x = 28;
                }
                let angle = this.body.velocity.angle() * Phaser.Math.RAD_TO_DEG;
                let y = 0;
                if(angle >= 270) {
                    angle = 180 + (360 - angle);
                    angle = angle - 180;
                    angle = angle * (Math.PI/180);
                    y = (this.initialX - this.x)*Math.tan(angle);
                    this.y = this.initialY - y;
                } else {
                    angle = 360 - (angle - 180);
                    angle = 360 - angle;
                    angle = angle * (Math.PI/180);
                    y = (this.x - this.initialX)*Math.tan(angle);
                    this.y = this.initialY - y;
                }
                this.initialX = this.x;
                this.initialY = this.y;
                console.log('when real bubble bounce but refactored position');
                console.log(this.x,this.y);
            }
        });
    }

    public clear() {
        this.scene.physics.world.disableBody(this.body);
        this.body.setCollideWorldBounds(false,undefined,undefined,false);
        this.checkWorldBounce = false;
    }
}