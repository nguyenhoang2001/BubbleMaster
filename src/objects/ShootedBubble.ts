import DEPTH from "../game/constant/Depth";
import { Bubble } from "./Bubble";

export class ShootedBubble extends Bubble {
    public body: Phaser.Physics.Arcade.Body;
    public checkWorldBounce: boolean;
    public tail: Phaser.GameObjects.Image;

    constructor(scene:Phaser.Scene, x:number, y:number, texture:string) {
        super(scene,x,y,texture,undefined,undefined);
        this.body.setCircle(10,18,18);
        this.name = 'ShootedBubble';
        this.checkWorldBounce = false;
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

    public createWorldBounds(rectangleBound: Phaser.Geom.Rectangle) {
        this.body.setBoundsRectangle(rectangleBound);
        this.body.setCollideWorldBounds(true,1,1,true);
    }

    public clear() {
        this.scene.physics.world.disableBody(this.body);
        this.body.setCollideWorldBounds(false,undefined,undefined,false);
        this.checkWorldBounce = false;
    }

    public updateTailPosition() {
        let angle = this.body.velocity.angle() * Phaser.Math.RAD_TO_DEG;        
        if(angle >= 270) {
            angle = 90 - (360 - angle);
        } else {
            angle = 360 - (90 - (angle - 180));
        }
        this.tail.setRotation(angle * Phaser.Math.DEG_TO_RAD);
        this.tail.x = this.x;
        this.tail.y = this.y;
        let angleOffset = 0;
        let offsetX = 0;
        let offsetY = 0;
        if(angle >= 0 && angle <= 90) {
            angleOffset = 90 - angle;
            offsetX = 1;
        } else {
            angleOffset = 90 - (360 - angle);
            offsetX = -1;
        }
        offsetY = 30 * Math.sin(angleOffset * Phaser.Math.DEG_TO_RAD);
        offsetX *= 30 * Math.cos(angleOffset * Phaser.Math.DEG_TO_RAD);
        this.tail.y = this.tail.y - offsetY;
        this.tail.x = this.tail.x + offsetX;
    }

    public update(...args: any[]): void {
        this.updateTailPosition();
        this.setRotation(this.body.velocity.angle());
        if(this.body.velocity.y != 0 && this.tail.visible == false) {
            this.tail.setVisible(true);
            this.setScale(1.1,1);
        }
    }
}