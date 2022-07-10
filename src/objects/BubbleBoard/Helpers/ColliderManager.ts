import { GameScene } from "../../../scenes/GameScene";
import { Bomb } from "../../Bomb";
import { Bubble } from "../../Bubble";
import { ShootedBubble } from "../../ShootedBubble";
import { BubblesBoard } from "../BubblesBoard";
import { BombHandler } from "./BombHandler";
import { BubbleNeighbors } from "./BubbleNeighbors";

export class ColliderManager {
    public bubblesBoard: BubblesBoard;
    public scene: GameScene;
    private shootedBubble: ShootedBubble;
    private hittedBubble: Bubble;
    private bomb: Bomb;
    private neighborsHelper: BubbleNeighbors;
    private bombHandler: BombHandler;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
        this.neighborsHelper = this.bubblesBoard.neighbors;
        this.bombHandler = new BombHandler(this.scene, this.bubblesBoard);
    }

    private handleWrongBubbleHit() {
        if((this.hittedBubble.row + this.bubblesBoard.rowOffSet) % 2) {
            if(this.hittedBubble.column == 11) {
               if(this.hittedBubble.row + 1 < this.bubblesBoard.row) {
                    const bubble = this.bubblesBoard.board[this.hittedBubble.row + 1][11];
                    if(bubble != undefined) {
                        if(this.bubblesBoard.isBublleExisting(this.hittedBubble.row + 1,11)) {
                            console.log('we handle it');
                            this.hittedBubble = bubble;
                        }
                    }
               }
            }
        } else {
            if(this.hittedBubble.column == 0) {
                if(this.hittedBubble.row + 1 < this.bubblesBoard.row) {
                     const bubble = this.bubblesBoard.board[this.hittedBubble.row + 1][0];
                     if(bubble != undefined) {
                         if(this.bubblesBoard.isBublleExisting(this.hittedBubble.row + 1,0)) {
                             console.log('we handle it');
                             this.hittedBubble = bubble;
                         }
                     }
                }
            }
        }
    }


    public enableOverlapBombAndBubble(bomb:Bomb) {
        this.scene.physics.add.overlap(this.bubblesBoard.gridGroup,bomb,(_bubble:any,_bomb:any) => {
            if(_bubble.isOutGrid == false) {
                this.hittedBubble = _bubble as Bubble;
                this.bomb = _bomb as Bomb;
                this.handleWrongBubbleHit();
                this.bomb.clear();
                this.scene.scoreManager.calculateScore();
                let bubble = this.runCollide();
                this.bomb.removeVisualEffect();
                this.bomb.destroy();
                bubble?.setVisible(false);
                if(bubble != undefined)
                    this.runBombCollision(bubble,_bomb);
            }
        });
    }

    private runBombCollision(target:Bubble,_bomb:any) {
        this.neighborsHelper.resetProcess();
        let toWork = [];
        toWork.push(target);
        target.processed = true;
        let layer = 3;
        let neighbors:Bubble[] = [];
        let toProcess:Bubble[] = [];
        toProcess.push(target);
        while(toWork.length > 0 && layer > 0) {
            let obj = toWork.pop();
            if(obj != undefined) {
                const rawNeighbors = this.neighborsHelper.getNeighbors(obj);
                rawNeighbors.some((bubble:Bubble) => {
                    if(!bubble.processed) {
                        bubble.processed = true;
                        toProcess.push(bubble);
                        neighbors.push(bubble);
                    }
                });
            }
            if(toWork.length == 0) {
                toWork = neighbors;
                neighbors = [];
                layer--;
            }

        }
        this.bombHandler.clearBubbles(toProcess,_bomb);
        this.bombHandler.runAnimation(toProcess,_bomb);
    }

    public gridGroupAndBulletGroup() {
        this.scene.physics.add.overlap(this.bubblesBoard.gridGroup,this.scene.shooter.bulletGroup,(_bubble:any,_shootedBubble:any) => {
            if(_bubble.isOutGrid == false) {
                this.shootedBubble = _shootedBubble as ShootedBubble;
                this.hittedBubble = _bubble as Bubble;
                
                this.handleWrongBubbleHit();
                this.shootedBubble.clear();

                let bubble = this.runCollide();
                this.shootedBubble.removeVisualEffect();
                this.shootedBubble.destroy();
                if(bubble != undefined) {
                    this.bubblesBoard.hittingAnimation.showAnimation(bubble);
                    this.bubblesBoard.clusters.checkClusters(bubble,true,true);
                }
            }
        });
    }

    public runCollide() {
        this.bubblesBoard.updateRow();
        const newBubble = this.bubblesBoard.addingManager.fromShoot(this.hittedBubble,this.shootedBubble);
        this.bubblesBoard.updateRow();
        if(newBubble == undefined)
            return;
        return newBubble;
    }
}