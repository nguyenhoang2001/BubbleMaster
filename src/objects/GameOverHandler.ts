import { GameScene } from "../scenes/GameScene";

export class GameOverHandler {
    public scene!: GameScene;
    private rope!: Phaser.Physics.Arcade.Image;
    private gridGroup!: Phaser.GameObjects.Group;
    public isGameOver!: boolean;

    constructor(scene: GameScene) {
        this.scene = scene;
        this.rope = this.scene.physics.add.image(0,0,'rope');
        this.gridGroup = this.scene.bubblesBoard.gridGroup;
        this.isGameOver = false;
        this.drawRope();
    }


    private drawRope() {
        let zone = new Phaser.GameObjects.Zone(this.scene,0,0,this.scene.sys.canvas.width,this.scene.sys.canvas.height);
        zone.setOrigin(0,0);
        Phaser.Display.Align.In.BottomCenter(this.rope,zone,0,-150);
        this.rope.setDisplaySize(this.rope.width + 204, this.rope.height);
        this.enableOverlapRope();
    }


    private enableOverlapRope() {
        this.rope.body.checkCollision.none = true;
        this.scene.physics.add.overlap(this.gridGroup,this.rope, () => {
            if(!this.isGameOver) {
                this.isGameOver = true;
                this.scene.registry.set('isGameOver', true);
            }
        });
    }

    public update() {
        if(!this.scene.bubblesContainer.isRunning) {
            this.rope.body.checkCollision.none = false;
        }
    }
}