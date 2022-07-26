import { BubblesBoardState } from "../../../game/constant/BubblesBoardState";
import { GameScene } from "../../../scenes/GameScene";
import { Bomb } from "../../Bomb";
import { Bubble } from "../../Bubble";
import { FireBubble } from "../../FireBubble";
import { ShootedBubble } from "../../ShootedBubble";
import { BubblesBoard } from "../BubblesBoard";
import { FireBubbleHandler } from "../FireBubbleHandler";

export class ColliderManager {
    public bubblesBoard: BubblesBoard;
    public scene: GameScene;
    public shootedBubble: ShootedBubble;
    public hittedBubble: Bubble;
    // private neighborsHelper: BubbleNeighbors;
    // private bombHandler: BombHandler;
    private fireBubbleHandler: FireBubbleHandler;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
        // this.neighborsHelper = this.bubblesBoard.neighbors;
        // this.bombHandler = new BombHandler(this.scene, this.bubblesBoard);
        this.fireBubbleHandler = new FireBubbleHandler(this.scene,this.bubblesBoard);
    }

    public enableOverlapBombAndBubble(bomb:Bomb) {
        this.scene.physics.add.overlap(this.bubblesBoard.gridGroup,bomb,(_bubble:any,_bomb:any) => {
            if(_bubble.isOutGrid == false) {
                this.hittedBubble = _bubble as Bubble;
                this.shootedBubble = _bomb as Bomb;
                this.bubblesBoard.hitBomb(this.hittedBubble,this.shootedBubble);
            }
        });
    }

    public enableOverlapFireBallAndBubble(fireBall:FireBubble) {
        this.scene.physics.add.overlap(this.bubblesBoard.gridGroup,fireBall,(_bubble:any,_fireball:any) => {
            if(_bubble.isOutGrid == false) {
                this.hittedBubble = _bubble as Bubble;
                this.shootedBubble = _fireball as FireBubble;
                this.bubblesBoard.hitFireBall(this.hittedBubble,this.shootedBubble);
                // this.scene.scoreManager.calculateScore();
                // this.fireBubbleHandler.clearBubble(this.hittedBubble);
                // this.fireBubbleHandler.showAnimationBubble(this.hittedBubble);
            }
        });
    }

    public gridGroupAndBulletGroup() {
        this.scene.physics.add.overlap(this.bubblesBoard.gridGroup,this.scene.shooter.bulletGroup,(_bubble:any,_shootedBubble:any) => {
            if(_bubble.isOutGrid == false) {
                this.shootedBubble = _shootedBubble as ShootedBubble;
                this.hittedBubble = _bubble as Bubble;
                this.bubblesBoard.hitBullet(this.hittedBubble,this.shootedBubble);
            }
        });
    }
}