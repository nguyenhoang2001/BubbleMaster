import { HudScene } from "../scenes/HudScene";

export class HudContainer extends Phaser.GameObjects.Container {
    public scene!: HudScene;
    private gameWidth!: number;
    private gameHeight!: number;
    private gameZone!: Phaser.GameObjects.Zone;
    private scoreText!: Phaser.GameObjects.Text;
    private scoreContainer!: Phaser.GameObjects.Image;
    private threeBubbles!: Phaser.GameObjects.Image;
    private rectangle!: Phaser.GameObjects.Rectangle;
    private progressBar!: Phaser.GameObjects.Image;

    constructor(scene:HudScene, x:number,y:number) {
        super(scene,x,y);
        this.gameWidth = this.scene.sys.canvas.width;
        this.gameHeight = this.scene.sys.canvas.height;
        this.scene.add.existing(this);
        this.create();
    }

    private create() {
        console.log('came to create');
        this.gameZone = this.scene.add.zone(0,0,this.scene.sys.canvas.width, this.scene.sys.canvas.height);
        this.gameZone.setOrigin(0,0);

        this.rectangle = this.scene.add.rectangle(0,0,this.gameWidth, this.gameHeight/5 - 150,0x000000);
        this.rectangle.setAlpha(0.5);
        this.rectangle.setOrigin(0,0);

        this.scoreContainer = this.scene.add.image(0,0,'scoreContainer');
        this.threeBubbles = this.scene.add.image(0,0,'threeBubbles');
        this.scoreText = this.scene.add.text(0,0,'');
        this.scoreText.style.setFontSize('30px');
        this.scoreText.style.setFontFamily('Arial')
        this.add(this.gameZone);
        this.add(this.rectangle);
        this.add(this.scoreContainer);
        this.add(this.threeBubbles);
        this.add(this.scoreText);
        Phaser.Display.Align.In.TopLeft(this.scoreContainer,this.rectangle, -20, -20);
        Phaser.Display.Align.In.LeftCenter(this.threeBubbles,this.scoreContainer,-25);
        Phaser.Display.Align.In.Center(this.scoreText,this.scoreContainer, 20);
        this.close();
    }

    private close() {
        this.setVisible(false);
        this.y = -(this.gameHeight/5 - 150);
    }

    public run() {
        this.setVisible(true);
        this.scene.tweens.add({
            targets: this,
            y: 0,
            ease: 'Power1',
            duration: 500,
            delay: 2000
        })
    }

    public update() {
        this.scoreText.setText(this.scene.score.toString());
    }
}