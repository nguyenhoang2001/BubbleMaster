import DEPTH from "../../game/constant/Depth";
import { GameScene } from "../../scenes/GameScene";
import { BounceRegion } from "./BounceRegion";
import { Hole } from "./Hole";

export class HolesManager {
    public scene: GameScene;
    private backgroundHole: Phaser.GameObjects.Image;
    public bounceRegions: BounceRegion[];
    private holes: Hole[];
    private scoresText: Phaser.GameObjects.Text[];

    constructor(scene:GameScene) {
        this.scene = scene;
        this.bounceRegions = [];
        this.holes = [];
        this.scoresText = [];
        this.create();
    }

    private create() {
        this.createHoles();

        this.createBounceRegions();

        this.createScoreText();

        this.scene.physics.add.collider(this.scene.bubblesBoard.gridGroup,this.bounceRegions);
    }

    private createHoles() {
        this.backgroundHole = this.scene.add.image(0,0,'bgHole').setDepth(DEPTH.HOLES);
        for(let i = 0; i < 5; i++) {
            let texture = 'orangeHole';
            if(i == 0 || i == 4) {
                texture = 'greenHole';

            } else if(i == 1 || i == 3) {
                texture = 'purpleHole';
            }
            this.holes.push(new Hole(this.scene,0,0,texture,i+1).setDepth(DEPTH.GAMEPLAY));
        }
        Phaser.Display.Align.In.BottomCenter(this.backgroundHole,this.scene.mainZone,0,0);

        Phaser.Display.Align.To.TopLeft(this.holes[0],this.backgroundHole,-13,-22);

        Phaser.Display.Align.To.RightCenter(this.holes[1],this.holes[0], 20);

        Phaser.Display.Align.To.RightCenter(this.holes[2],this.holes[1], 19);

        Phaser.Display.Align.To.RightCenter(this.holes[3],this.holes[2], 16);

        Phaser.Display.Align.To.RightCenter(this.holes[4],this.holes[3], 18.3);

        this.holes.forEach((_hole:Hole) => {
            _hole.setUpLight();
        });

    }

    private createScoreText() {
        for(let i = 0; i < 5; i++) {
            this.scoresText.push(this.scene.add.text(0,0,'').setDepth(DEPTH.HOLES));
            this.scoresText[i].style.setFontSize('35px');
            this.scoresText[i].style.setFontFamily('Arial');
            this.scoresText[i].setText(this.scene.scoreManager.getHoleScore(i + 1).toString());
            Phaser.Display.Align.To.BottomCenter(this.scoresText[i],this.holes[i]);
        }
    }

    public runAnimationScore() {
        for(let i = 0; i < 5; i++) {
            this.scene.tweens.addCounter({
                from: parseInt(this.scoresText[i].text),
                to: this.scene.scoreManager.getHoleScore(i + 1),
                duration: 500,
                onUpdate: (tween: Phaser.Tweens.Tween, target: any) => {
                    this.scoresText[i].setText(Math.floor(tween.getValue()).toString());
                    Phaser.Display.Align.To.BottomCenter(this.scoresText[i],this.holes[i]);
                }
            });
        }
    }

    private createBounceRegions() {
        for(let i = 0; i < 4; i++) {
            if(i == 2) {
                this.bounceRegions.push(new BounceRegion(this.scene,0,0,24,100).setOrigin(0,0));

            } else if(i == 1) {
                this.bounceRegions.push(new BounceRegion(this.scene,0,0,27,100).setOrigin(0,0));
            } else if(i == 3) {
                this.bounceRegions.push(new BounceRegion(this.scene,0,0,26,100).setOrigin(0,0));
            } 
            else {
                this.bounceRegions.push(new BounceRegion(this.scene,0,0,28,100).setOrigin(0,0));

            }
            
            Phaser.Display.Align.To.RightTop(this.bounceRegions[i],this.holes[i],-4,-25);
        }
        
    }
}