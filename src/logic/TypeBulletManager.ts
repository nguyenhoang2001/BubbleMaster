import DEPTH from "../game/constant/Depth";
import { Bomb } from "../objects/Bomb";
import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";
import { Shooter } from "../objects/Shooter/Shooter";
import { GameScene } from "../scenes/GameScene";

export class TypeBulletManager {
    private bubblesBoard: BubblesBoard;
    private shooter: Shooter;
    private scene: GameScene;
    private signalChangeToBomb: boolean;

    constructor(scene:GameScene, bubblesBoard: BubblesBoard, shooter: Shooter) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
        this.shooter = shooter;
        this.signalChangeToBomb = false;
        this.scene.events.addListener('bomb', ()=>{this.signalChangeToBomb = true;});
    }

    private changeToBomb() {
        let oldBullet = this.shooter.shootedBubble;
        this.shooter.shootedBubble = new Bomb(this.scene,oldBullet.x,oldBullet.y,'bomb').setVisible(false);
        this.bubblesBoard.colliderBubble.enableOverlapBombAndBubble(this.shooter.shootedBubble);
        this.shooter.checkAllowShooting = false;
        oldBullet.on('animationcomplete', () => {
            oldBullet.destroy();
            this.shooter.checkAllowShooting = true;
            this.shooter.shootedBubble.setVisible(true);
        });
        oldBullet.setDepth(DEPTH.ANIMATIONBOMBEXPLODE);
        oldBullet.anims.play('showBomb');
    }

    public checkConditionToChangeType() {
        if(this.signalChangeToBomb == true) {
            if(this.shooter.checkAllowShooting == true) {
                this.signalChangeToBomb = false;
                this.changeToBomb();
            }
        }
    }

}