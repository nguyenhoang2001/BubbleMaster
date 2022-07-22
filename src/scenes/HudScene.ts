import Depth from "../game/constant/Depth";
import { HudContainer } from "../ui/HudContainer";
import { GameScene } from "./GameScene";

export class HudScene extends Phaser.Scene {
    private container: HudContainer;
    public score: number;
    private comboText: Phaser.GameObjects.Text;
    private gameZone: Phaser.GameObjects.Zone;
    public checkPointTwoThird: boolean;

    constructor() {
        super({key:'HudScene'});
        this.score = 0;
    }

    public create() {
        this.container = new HudContainer(this,0,0);
        this.score = 0;
        this.checkPointTwoThird = true;
        this.container.setDepth(Depth.HUDCONTAINER);
        this.container.run();
        this.gameZone = this.add.zone(0,0,this.sys.canvas.width, this.sys.canvas.height);
        this.gameZone.setOrigin(0,0);
        this.comboText = this.add.text(0,0,'');
        this.comboText.style.setFontSize('40px');
        this.comboText.style.setFontFamily('Arial');
        this.comboText.setDepth(Depth.TEXT);
    }

    public update(time: number, delta: number): void {
        let isGameOver = this.registry.get('isGameOver');
        if(!isGameOver) {
            let gameScene = this.scene.get('GameScene') as GameScene;
            this.score = gameScene.scoreManager.getScore();
            let combo = gameScene.scoreManager.getCombo();
            if(combo == 0) {
                this.comboText.setText('')
            } else {
                this.comboText.setText('x'+ combo);
            }
            Phaser.Display.Align.In.Center(this.comboText,gameScene.shooter.circle);

            if(gameScene.movingGridManager.getIsShooted()) {
                this.container.update(time,delta);
                if((gameScene.scoreManager.getScore() / this.container.maxPointProgressBar) >= 2/3) {
                    if(this.checkPointTwoThird) {
                        this.checkPointTwoThird = false;
                        gameScene.events.emit('bomb');
                    }
                }
            }
        }
    }
}