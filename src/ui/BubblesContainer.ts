import { Bubble } from "../objects/Bubble";
import { GameScene } from "../scenes/GameScene";

export class BubblesContainer extends Phaser.GameObjects.Container {
    public mainZone!: Phaser.GameObjects.Zone;
    public scene!: GameScene;

    constructor(scene:GameScene,x:number,y:number) {
        super(scene,x,y);
        this.create();
    }

    private create() {
        this.mainZone = this.scene.add.zone(0,0,this.scene.sys.canvas.width, this.scene.sys.canvas.height);
        this.mainZone.setOrigin(0,0);
        this.add(this.mainZone);
        this.turnOff();
    }

    public addBubbles(bubbles:Bubble[]) {
        this.add(bubbles);
    }


    private turnOff() {
        this.setVisible(false);
        this.y = this.scene.sys.canvas.height;
    }

    public open() {
        this.setVisible(true);
        this.scene.shooter.allowShooting = false;
        this.scene.tweens.add({
            targets:this,
            y: 0,
            ease:'Power1',
            duration: 2000,
            onComplete: () => {
                this.scene.bubblesBoard.colliderBubble.gridGroupAndBulletGroup();
                this.scene.shooter.allowShooting = true;
            }
        })
    }

    public pullDown(positionY:number) {
        this.scene.shooter.allowShooting = false;
        this.scene.tweens.add({
            targets:this,
            y: positionY,
            ease:'Power1',
            duration: 1000,
            onComplete: () => {
                this.scene.shooter.allowShooting = true;
            }
        })
    }

    public close() {
        this.scene.shooter.allowShooting = false;
        this.scene.tweens.add({
            targets:this,
            y: this.scene.sys.canvas.height,
            ease: 'Power1',
            duration: 2000,
            onComplete: () => {
                this.setVisible(false);
            }
        });
    }
}