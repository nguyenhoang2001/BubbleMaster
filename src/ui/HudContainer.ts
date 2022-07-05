import { HudScene } from "../scenes/HudScene";

export class HudContainer extends Phaser.GameObjects.Container {
    public scene: HudScene;
    private gameWidth: number;
    private gameHeight: number;
    private gameZone: Phaser.GameObjects.Zone;
    //
    private scoreText: Phaser.GameObjects.Text;
    private scoreContainer: Phaser.GameObjects.Image;
    //
    private rectangle: Phaser.GameObjects.Rectangle;
    //
    private progressBar: Phaser.GameObjects.Image;
    private progressBarLeft: Phaser.GameObjects.Image;
    private progressBarRight: Phaser.GameObjects.Image;
    private progressBarMid: Phaser.GameObjects.Image;
    //
    private timeLimit:number;
    private timeCounter: number;
    private runProgressBar: boolean;

    constructor(scene:HudScene, x:number,y:number) {
        super(scene,x,y);
        this.gameWidth = this.scene.sys.canvas.width;
        this.gameHeight = this.scene.sys.canvas.height;
        this.scene.add.existing(this);
        this.create();
        this.timeLimit = 30000;
        this.runProgressBar = false;
        this.timeCounter = 0;
    }

    private create() {
        this.timeCounter = 0;
        console.log('came to create');
        this.gameZone = this.scene.add.zone(0,0,this.scene.sys.canvas.width, this.scene.sys.canvas.height);
        this.gameZone.setOrigin(0,0);

        this.rectangle = this.scene.add.rectangle(0,0,this.gameWidth, this.gameHeight/5 - 150,0x000000);
        this.rectangle.setAlpha(0.5);
        this.rectangle.setOrigin(0,0);

        this.scoreContainer = this.scene.add.image(0,0,'scoreContainer');
        this.scoreText = this.scene.add.text(0,0,'0');
        this.scoreText.style.setFontSize('30px');
        this.scoreText.style.setFontFamily('Arial');

        this.progressBar = this.scene.add.image(0,0,'bgProgressBar')
        this.progressBarLeft = this.scene.add.image(0,0,'progressLeft');
        this.progressBarMid = this.scene.add.image(0,0,'progressMid');
        this.progressBarMid.setDisplaySize(431,25);
        this.progressBarMid.setOrigin(0,0);
        this.progressBarRight = this.scene.add.image(0,0,'progressRight');
        this.progressBarRight.setOrigin(0,0);

        this.add(this.gameZone);
        this.add(this.rectangle);

        this.add(this.scoreContainer);
        this.add(this.scoreText);

        this.add(this.progressBar);
        this.add(this.progressBarLeft);
        this.add(this.progressBarMid);
        this.add(this.progressBarRight);
        Phaser.Display.Align.In.TopLeft(this.scoreContainer,this.rectangle, -20, -20);
        Phaser.Display.Align.In.Center(this.scoreText,this.scoreContainer,-10);
        
        Phaser.Display.Align.To.RightCenter(this.progressBar,this.scoreContainer, 15);
        Phaser.Display.Align.In.LeftCenter(this.progressBarLeft,this.progressBar, -10);
        Phaser.Display.Align.To.RightCenter(this.progressBarMid,this.progressBarLeft);
        Phaser.Display.Align.To.RightCenter(this.progressBarRight,this.progressBarMid , this.progressBarMid.displayWidth - this.progressBarMid.width);
        this.close();
    }

    private close() {
        this.setVisible(false);
        this.y = -(this.gameHeight/5 - 150);
        this.runProgressBar = false;
    }

    public run() {
        this.setVisible(true);
        this.scene.tweens.add({
            targets: this,
            y: 0,
            ease: 'Power1',
            duration: 500,
            onComplete: () => {
                this.runProgressBar = true;
            }
        })
    }

    public update(time:number, delta:number) {
        this.scoreText.setText(this.scene.score.toString());
        if(this.runProgressBar) {
            this.timeCounter += delta;
            let scaleBar = this.timeCounter / this.timeLimit;
            if(scaleBar > 1) {
                this.timeCounter = 0;
            } else {
                this.progressBarMid.setDisplaySize(431*(1-scaleBar),25);
                Phaser.Display.Align.To.RightCenter(this.progressBarRight,this.progressBarMid , 
                    this.progressBarMid.displayWidth - this.progressBarMid.width);
            }
        }
    }
}