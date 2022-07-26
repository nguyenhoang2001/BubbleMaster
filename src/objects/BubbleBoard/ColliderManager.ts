import { HittingBombBehavior } from "../../Behaviors/HittingBombBehavior";
import { HittingBulletBehavior } from "../../Behaviors/HittingBulletBehavior";
import { HittingFireBallBehavior } from "../../Behaviors/HittingFireBallBehavior";
import { IHittingBombBehavior } from "src/interfaces/IHittingBombBehavior";
import { IHittingBulletBehavior } from "src/interfaces/IHittingBulletBehavior";
import { IHittingFireBallBehavior } from "src/interfaces/IHittingFireBallBehavior";
import { GameScene } from "../../scenes/GameScene";
import { Bomb } from "../Bomb";
import { FireBubble } from "../FireBubble";
import { BubblesBoard } from "./BubblesBoard";

export class ColliderManager {
    public bubblesBoard: BubblesBoard;
    public scene: GameScene;
    private hittingBulletBehavior: IHittingBulletBehavior;
    private hittingBombBehavior: IHittingBombBehavior;
    private hittingFireBallBehavior: IHittingFireBallBehavior;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
        this.hittingBulletBehavior = new HittingBulletBehavior(this.bubblesBoard);
        this.hittingBombBehavior = new HittingBombBehavior(this.bubblesBoard);
        this.hittingFireBallBehavior = new HittingFireBallBehavior(this.bubblesBoard);
    }

    public enableOverlapBombAndBubble(bomb:Bomb) {
        this.scene.physics.add.overlap(this.bubblesBoard.gridGroup,bomb,(_bubble:any,_bomb:any) => {
            if(_bubble.isOutGrid == false) {
                this.hittingBombBehavior.hit(_bubble,_bomb);
            }
        });
    }

    public enableOverlapFireBallAndBubble(fireBall:FireBubble) {
        this.scene.physics.add.overlap(this.bubblesBoard.gridGroup,fireBall,(_bubble:any,_fireball:any) => {
            if(_bubble.isOutGrid == false) {
                this.hittingFireBallBehavior.hit(_bubble,_fireball);
            }
        });
    }

    public enableOverlapGridGroupAndBulletGroup() {
        this.scene.physics.add.overlap(this.bubblesBoard.gridGroup,this.scene.shooter.bulletGroup,(_bubble:any,_shootedBubble:any) => {
            if(_bubble.isOutGrid == false) {
                this.hittingBulletBehavior.hit(_bubble,_shootedBubble);
            }
        });
    }
}