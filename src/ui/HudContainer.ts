import DEPTH from "../game/constant/Depth";
import { GameScene } from "../scenes/GameScene";
import { HudScene } from "../scenes/HudScene";

export class HudContainer extends Phaser.GameObjects.Container {
    public scene: HudScene;
    private gameWidth: number;
    private gameHeight: number;
    //
    private scoreText: Phaser.GameObjects.Text;
    private scoreContainer: Phaser.GameObjects.Image;
    //
    private rectangle: Phaser.GameObjects.Rectangle;
    //
    public progressBar: Phaser.GameObjects.Image;
    private progressBarLeft: Phaser.GameObjects.Image;
    private progressBarRight: Phaser.GameObjects.Image;
    private progressBarMid: Phaser.GameObjects.Image;
    //
    private runProgressBar: boolean;
    //
    public maxPointProgressBar:number;
    //
    private bombIcon: Phaser.GameObjects.Image;

    constructor(scene:HudScene, x:number,y:number) {
        super(scene,x,y);
        this.gameWidth = this.scene.sys.canvas.width;
        this.gameHeight = this.scene.sys.canvas.height;
        this.scene.add.existing(this);
        this.create();
        this.runProgressBar = false;
        this.maxPointProgressBar = 1000;
    }

    private create() {
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

        this.add(this.rectangle);

        this.add(this.scoreContainer);
        this.add(this.scoreText);

        this.add(this.progressBar);
        this.add(this.progressBarLeft);
        this.add(this.progressBarMid);
        this.add(this.progressBarRight);

        Phaser.Display.Align.In.TopLeft(this.scoreContainer,this.rectangle, -20, -20);
        Phaser.Display.Align.In.Center(this.scoreText,this.scoreContainer);
        
        Phaser.Display.Align.To.RightCenter(this.progressBar,this.scoreContainer, 15);
        Phaser.Display.Align.In.LeftCenter(this.progressBarLeft,this.progressBar, -10);
        Phaser.Display.Align.To.RightCenter(this.progressBarMid,this.progressBarLeft);
        Phaser.Display.Align.To.RightCenter(this.progressBarRight,this.progressBarMid , this.progressBarMid.displayWidth - this.progressBarMid.width);
        this.progressBarMid.setDisplaySize(431*0,25);
        Phaser.Display.Align.To.RightCenter(this.progressBarRight,this.progressBarMid, 
            this.progressBarMid.displayWidth - this.progressBarMid.width);

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
                this.bombIcon = this.scene.add.image(200,300,'bombIcon');
                this.bombIcon.setDepth(DEPTH.ICON);
                Phaser.Display.Align.In.LeftCenter(this.bombIcon,this.progressBar, (-2/3)*this.progressBar.width);
            }
        })
    }

    public update(time:number, delta:number) {
        if(parseInt(this.scoreText.text) != this.scene.score) {
            this.scene.tweens.addCounter({
                from: parseInt(this.scoreText.text),
                to: this.scene.score,
                duration: 50,
                onUpdate: (tween: Phaser.Tweens.Tween, target: any) => {
                    this.scoreText.setText(Math.floor(tween.getValue()).toString());
                    Phaser.Display.Align.In.Center(this.scoreText,this.scoreContainer);
                }
            });
        }        
        if(this.runProgressBar) {
            let gameScene = this.scene.scene.get('GameScene') as GameScene;
            if(gameScene.scoreManager.getScore() > this.maxPointProgressBar) {
                this.scene.checkPointTwoThird = true;
                this.maxPointProgressBar = this.maxPointProgressBar*10;
            }
            let scaleBar = gameScene.scoreManager.getScore() / this.maxPointProgressBar;
            this.progressBarMid.setDisplaySize(431*scaleBar,25);
            Phaser.Display.Align.To.RightCenter(this.progressBarRight,this.progressBarMid, 
                this.progressBarMid.displayWidth - this.progressBarMid.width);
        }
    }
}