import { GameScene } from "../../scenes/GameScene";
import { BounceRegion } from "./BounceRegion";

export class Hole {
    public scene: GameScene;
    private backgroundHole!: Phaser.GameObjects.Image;
    private greenHoles!: Phaser.GameObjects.Image[];
    private purpleHoles!: Phaser.GameObjects.Image[];
    private orangeHoles!: Phaser.GameObjects.Image[];
    private bounceRegions!: BounceRegion[];

    constructor(scene:GameScene) {
        this.scene = scene;
        this.greenHoles = [];
        this.purpleHoles = [];
        this.orangeHoles = [];
        this.bounceRegions = [];
        this.create();
    }

    private create() {
        this.backgroundHole = this.scene.add.image(0,0,'bgHole').setDepth(2);
        Phaser.Display.Align.In.BottomCenter(this.backgroundHole,this.scene.mainZone);

        this.greenHoles.push(this.scene.add.image(0,0,'greenHole').setDepth(0));
        Phaser.Display.Align.To.TopLeft(this.greenHoles[0],this.backgroundHole,-13,-22);
        //
        this.bounceRegions.push(new BounceRegion(this.scene,0,0,19,100).setOrigin(0,0));
        Phaser.Display.Align.To.RightTop(this.bounceRegions[0],this.greenHoles[0],0,-25);

        this.purpleHoles.push(this.scene.add.image(0,0,'purpleHole').setDepth(0));
        Phaser.Display.Align.To.RightCenter(this.purpleHoles[0],this.greenHoles[0], 20);
        //
        this.bounceRegions.push(new BounceRegion(this.scene,0,0,19,100).setOrigin(0,0));
        Phaser.Display.Align.To.RightTop(this.bounceRegions[1],this.purpleHoles[0],0,-25);

        this.orangeHoles.push(this.scene.add.image(0,0,'orangeHole').setDepth(0));
        Phaser.Display.Align.To.RightCenter(this.orangeHoles[0],this.purpleHoles[0], 19);
        //
        this.bounceRegions.push(new BounceRegion(this.scene,0,0,19,100).setOrigin(0,0));
        Phaser.Display.Align.To.RightTop(this.bounceRegions[2],this.orangeHoles[0],0,-25);

        this.purpleHoles.push(this.scene.add.image(0,0,'purpleHole').setDepth(0));
        Phaser.Display.Align.To.RightCenter(this.purpleHoles[1],this.orangeHoles[0], 16);
        //
        this.bounceRegions.push(new BounceRegion(this.scene,0,0,19,100).setOrigin(0,0));
        Phaser.Display.Align.To.RightTop(this.bounceRegions[3],this.purpleHoles[1],0,-25);

        this.greenHoles.push(this.scene.add.image(0,0,'greenHole').setDepth(0));
        Phaser.Display.Align.To.RightCenter(this.greenHoles[1],this.purpleHoles[1], 16);

        this.scene.physics.add.collider(this.scene.bubblesBoard.gridGroup,this.bounceRegions);
    }
}