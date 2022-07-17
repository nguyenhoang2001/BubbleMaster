import { GameScene } from "../../../scenes/GameScene";
import { Bomb } from "../../Bomb";
import { Bubble } from "../../Bubble";
import { FireBubble } from "../../FireBubble";
import { ShootedBubble } from "../../ShootedBubble";
import { BubblesBoard } from "../BubblesBoard";
import { FireBubbleHandler } from "../FireBubbleHandler";
import { BombHandler } from "./BombHandler";
import { BubbleNeighbors } from "./BubbleNeighbors";

export class ColliderManager {
    public bubblesBoard: BubblesBoard;
    public scene: GameScene;
    private shootedBubble: ShootedBubble | Bomb;
    private hittedBubble: Bubble;
    private neighborsHelper: BubbleNeighbors;
    private bombHandler: BombHandler;
    private fireBubbleHandler: FireBubbleHandler;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
        this.neighborsHelper = this.bubblesBoard.neighbors;
        this.bombHandler = new BombHandler(this.scene, this.bubblesBoard);
        this.fireBubbleHandler = new FireBubbleHandler(this.scene,this.bubblesBoard);
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
                this.shootedBubble = _bomb as Bomb;
                this.handleWrongBubbleHit();
                this.shootedBubble.clear();
                this.scene.scoreManager.calculateScore();
                let bubble = this.runCollide();
                this.shootedBubble.removeVisualEffect();
                // bubble?.setVisible(false);
                if(bubble != undefined)
                    this.runBombCollision(bubble,_bomb);
            }
        });
    }

    public enableOverlapFireBallAndBubble(fireBall:FireBubble) {
        this.scene.physics.add.overlap(this.bubblesBoard.gridGroup,fireBall,(_bubble:any,_fireball:any) => {
            if(_bubble.isOutGrid == false) {
                this.hittedBubble = _bubble as Bubble;
                this.shootedBubble = _fireball as FireBubble;
                this.scene.scoreManager.calculateScore();
                this.fireBubbleHandler.clearBubble(this.hittedBubble);
                this.fireBubbleHandler.showAnimationBubble(this.hittedBubble);
            }
        });
    }

    private runBombCollision(target:Bubble,_bomb:any) {
        let toProcess = [];
        let explodePos: { i: number; j: number; }[] = [];
        let temp: { i: number; j: number; }[] = [];
        let buffer: { i: number; j: number; }[] = [];
        temp.push({i:target.row,j:target.column});
        let count = 4;
        while(temp.length > 0 && count > 0) {
            let pos = temp.shift();
            if(pos != undefined) {
                let existing = false;
                // existing = explodePos.some((exPos:any) => {
                //     if(exPos.i == pos?.i && exPos.j == pos?.j) {
                //         return true;
                //     }
                // });
                if(existing == false) {
                    // console.log(pos);
                    explodePos.push(pos);
                    const bubble = this.bubblesBoard.board[pos.i][pos.j];
                    if(bubble != undefined) {
                        if(this.bubblesBoard.isBublleExisting(bubble.row,bubble.column)) {
                            toProcess.push(bubble);
                        }
                    }
                }
                
                let arrNeighborPos = this.neighborsHelper.getNeighborPos(pos.i,pos.j);
                arrNeighborPos.forEach((neighPos:any) => {
                    let existingExplodePos = false;
                    let existingTemp = false;
                    let existingBuffer = false;
                    existingExplodePos =  explodePos.some((exPos:any) => {
                        if(exPos.i == neighPos?.i && exPos.j == neighPos?.j) {
                            return true;
                        }
                        return false;
                    });
                    if(!existingExplodePos) {
                        existingTemp =  temp.some((tempPos:any) => {
                            if(tempPos.i == neighPos?.i && tempPos.j == neighPos?.j) {
                                return true;
                            }
                            return false;

                        });
                        if(!existingTemp) {
                            existingBuffer = buffer.some((bufferPos:any) => {
                                if(bufferPos.i == neighPos.i && bufferPos.j == neighPos.j) {
                                    return true;
                                }
                                return false;

                            });
                        }
                    }
                    if(!existingExplodePos && !existingTemp && !existingBuffer) {
                        buffer.push(neighPos);
                    }
                });
            }
            if(temp.length == 0) {
                count--;
                buffer.forEach((bufferPos:any) => {
                    temp.push(bufferPos);
                });
                buffer = [];
            }
        }
        // console.log(explodePos);
        toProcess[0]?.setVisible(false);
        this.bombHandler.clearBubbles(toProcess);
        this.bombHandler.runAnimation(toProcess,this.shootedBubble as Bomb);
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