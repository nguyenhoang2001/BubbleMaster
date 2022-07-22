import Depth from "../../game/constant/Depth";

export class CircleGuide extends Phaser.GameObjects.Sprite {
    public body: Phaser.Physics.Arcade.Body;

    constructor(scene:Phaser.Scene,x:number,y:number,texture:string) {
        super(scene,x,y,texture);
        this.scene.add.existing(this);
        this.scene.physics.world.enable(this);
    }

    public activate(radius:number) {
        this.scene.physics.world.enable(this);
        let initialRadius = 15;
        this.setScale(1);
        this.body.setCircle(radius,initialRadius - radius,initialRadius - radius);
        this.body.checkCollision.none = false;
        this.setDepth(Depth.GAMEPLAY);
        this.setOrigin(0.5,0.5);
        this.setActive(true);
        this.setAlpha(1);
        this.setVisible(true);
    }

}