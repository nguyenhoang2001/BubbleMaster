import Depth from "../game/constant/Depth";
import { IBubblesBoard } from "src/interfaces/objects/IBubblesBoard";
import { Bubble } from "src/objects/Bubble";
import { Bomb } from "src/objects/Bomb";
import { ShootedBubble } from "src/objects/ShootedBubble";
import { IHittingBombBehavior } from "src/interfaces/behaviors/IHittingBombBehavior";

export class HittingBombBehavior implements IHittingBombBehavior {
    private parent:IBubblesBoard;

    constructor(parent:IBubblesBoard) {
        this.parent = parent;
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
                explodePos.push(pos);
                const bubble = this.parent.board[pos.i][pos.j];
                if(bubble != undefined) {
                    if(this.parent.isBublleExisting(bubble.row,bubble.column)) {
                        toProcess.push(bubble);
                    }
                }
                
                let arrNeighborPos = this.parent.neighbors.getNeighborPos(pos.i,pos.j);
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
        toProcess[0]?.setVisible(false);
        this.clearBubbles(toProcess);
        this.runAnimation(toProcess,_bomb);
    }

    private clearBubbles(bubbles:Bubble[]) {
        for(let i = 0; i < bubbles.length; i++) {
            bubbles[i].body.checkCollision.none = true;
            let row = bubbles[i].row;
            let column = bubbles[i].column;
            this.parent.board[row][column] = undefined;
            bubbles[i].score = this.parent.scene.scoreManager.getBallClusterScore();
        }
    }

    private showAnimationBubbles(bubbles:Bubble[]) {
        for(let i = 0; i < bubbles.length; i++) {
            if(i == 0 )
                continue;

            let scoreText = this.parent.scoreGroup.getScoreText();
            scoreText.setText(bubbles[i].score.toString());
            scoreText.setPosition(bubbles[i].x,bubbles[i].y);


            let tintColor = bubbles[i].texture.key;
            bubbles[i].on('animationstart', () => {
                bubbles[i].setTintColor(tintColor);
            });
            bubbles[i].setDepth(Depth.ANIMATIONEXPLODE);
            
            bubbles[i].on('animationcomplete', (animation:any,frame:any,obj:any) => {
                bubbles[i].anims.remove('explode');
                bubbles[i].clear();
                this.parent.gridGroup.killAndHide(bubbles[i]);
                bubbles[i].removeAllListeners();
            });

            bubbles[i].on('animationupdate', (animation:any,frame:any,obj:any) => {
                if(frame.index == 5) {
                    if(i == bubbles.length - 1) {
                        this.parent.floatingBubbles.showAnimation();
                    }
                    this.parent.scene.scoreManager.increaseScore(bubbles[i].score);
                }
            });
            this.parent.scene.time.delayedCall(100,()=>{
                scoreText.showAnimation();
                bubbles[i].anims.playAfterDelay('explode',0);
            });
        }
    }

    private runAnimation(bubbles:Bubble[], bomb:Bomb) {
        bomb.setDepth(Depth.ANIMATIONBOMBEXPLODE);
        bomb.on('animationcomplete', () => {
            bomb.destroy();
        });
        bomb.anims.play('bombExplode');
        this.showAnimationBubbles(bubbles);
    }

    public hit(hittedBubble:Bubble,shootedBubble:ShootedBubble) {
        shootedBubble.clear();
        this.parent.scene.scoreManager.calculateScore();
        this.parent.updateRow();
        const bubble = this.parent.addBubbleFromShoot(hittedBubble,shootedBubble);
        this.parent.updateRow();
        shootedBubble.removeVisualEffect();
        if(bubble != undefined)
            this.runBombCollision(bubble,shootedBubble);
    }
}