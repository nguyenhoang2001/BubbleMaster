import DEPTH from "../game/constant/Depth";
import { Bubble } from "./Bubble";

export class ShootedBubble extends Bubble {
    public body: Phaser.Physics.Arcade.Body;
    public checkWorldBounce: boolean;
    public initialX:number;
    public initialY:number;
    public tail: Phaser.GameObjects.Image;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string) {
        super(scene,x,y,texture,undefined,undefined);
        this.body.setCircle(10,18,18);
        this.createBouncing();
        this.name = 'ShootedBubble';
        this.checkWorldBounce = false;
        this.initialX = 0;
        this.initialY = 0;
        this.tail = this.scene.add.image(x,y,'tail').setAlpha(0.4).setScale(0.9).setOrigin(0.5,0);
        this.tail.setDepth(DEPTH.TAIL);
        this.tail.setVisible(false);
    }

    public setTailTint() {
        this.tail.setTint(this.tintGenerator.getTint(this.texture.key));
    }

    public removeVisualEffect() {
        this.tail.removeFromDisplayList();
    }

    public createBouncing() {
        this.body.setCollideWorldBounds(true,1,1,true);
        this.scene.physics.world.on('worldbounds', (e:any) => {
            if(this.checkWorldBounce) {
                // console.log('when real bubble bounce');
                // console.log(this.x,this.y);
                // if(this.x > this.initialX) {
                //     this.x = this.scene.sys.game.canvas.width - 28;
                // } else {
                //     this.x = 28;
                // }
                // let angle = this.body.velocity.angle() * Phaser.Math.RAD_TO_DEG;
                // let y = 0;
                // if(angle >= 270) {
                //     angle = 180 + (360 - angle);
                //     angle = angle - 180;
                //     angle = angle * (Math.PI/180);
                //     y = (this.initialX - this.x)*Math.tan(angle);
                //     this.y = this.initialY - y;
                // } else {
                //     angle = 360 - (angle - 180);
                //     angle = 360 - angle;
                //     angle = angle * (Math.PI/180);
                //     y = (this.x - this.initialX)*Math.tan(angle);
                //     this.y = this.initialY - y;
                // }
                // this.initialX = this.x;
                // this.initialY = this.y;
                // console.log('when real bubble bounce but refactored position');
                // console.log(this.x,this.y);
            }
        });
    }

    public clear() {
        this.scene.physics.world.disableBody(this.body);
        this.body.setCollideWorldBounds(false,undefined,undefined,false);
        this.checkWorldBounce = false;
    }

    public update(...args: any[]): void {
        let angle = this.body.velocity.angle() * Phaser.Math.RAD_TO_DEG;        
        this.setRotation(this.body.velocity.angle());
        if(angle >= 270) {
            angle = 90 - (360 - angle);
        } else {
            angle = 360 - (90 - (angle - 180));
        }
        this.tail.setRotation(angle * Phaser.Math.DEG_TO_RAD);
        this.tail.x = this.x;
        this.tail.y = this.y;
        if(angle >= 0 && angle <= 90) {
            let angleOffset = 90 - angle;
            let offsetY = 30 * Math.sin(angleOffset * Phaser.Math.DEG_TO_RAD);
            let offsetX = 30 * Math.cos(angleOffset * Phaser.Math.DEG_TO_RAD);
            this.tail.x = this.tail.x + offsetX;
            this.tail.y = this.tail.y - offsetY;
        } else {
            let angleOffset = 90 - (360 - angle);
            let offsetY = 30 * Math.sin(angleOffset * Phaser.Math.DEG_TO_RAD);
            let offsetX = 30 * Math.cos(angleOffset * Phaser.Math.DEG_TO_RAD);
            this.tail.x = this.tail.x - offsetX;
            this.tail.y = this.tail.y - offsetY;
        }
        if(this.body.velocity.y != 0 && this.tail.visible == false)
            this.tail.setVisible(true);
    }
}