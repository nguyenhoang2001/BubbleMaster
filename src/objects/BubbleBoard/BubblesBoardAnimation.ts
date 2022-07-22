import { GameScene } from "../../scenes/GameScene";
import { Bubble } from "../Bubble";
import { BubblesBoard } from "./BubblesBoard";
import { BubbleNeighbors } from "./Helpers/BubbleNeighbors";

export class BubblesBoardAnimation {
    private bubblesBoard: BubblesBoard;
    private scene: GameScene;
    private neighborsHelper: BubbleNeighbors;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
        this.neighborsHelper = this.bubblesBoard.neighbors;
    }

    private runTween(neighbors:Bubble[], targetBubble: Bubble, delay: number) {
        neighbors.forEach((bubble:Bubble) => {
            let angle = Phaser.Math.Angle.Between(targetBubble.x,targetBubble.y,bubble.x,bubble.y);
            let deltaX = Math.cos(angle) * 0.7;
            let deltaY = Math.sin(angle) * 0.7;
            let count = 0;
            let tween = this.scene.tweens.add({
                targets:bubble,
                runYoyo: 0,
                duration:150,
                delay:delay,
                ease: 'Sine.easeOut',
                yoyo:true,
                loop: 1,
                onUpdate: (tween:Phaser.Tweens.Tween, target:any, param:any[]) => {
                    if(tween.loopCounter == 0) {
                        if(tween.data[0].end == 0) {
                            target.x += deltaX / 4;
                            target.y += deltaY / 4;
                            count += 1;
                        } else {
                            if(count > 0) {
                                target.x -= deltaX / 4;
                                target.y -= deltaY / 4;
                                count -= 1;
                            }
                        }
                    }else {
                        if(tween.data[0].end == 0) {
                            target.x += deltaX;
                            target.y += deltaY;
                            count += 1;
                        } else {
                            if(count > 0) {
                                target.x -= deltaX;
                                target.y -= deltaY;
                                count -= 1;
                            }
                        }
                    }
                    
                },
                onYoyo: (tween: Phaser.Tweens.Tween, target: any) => {
                    tween.data[0].end = 1;
                },
                onComplete: (tween: Phaser.Tweens.Tween, target: any) => {
                    if(count > 0) {
                        target.x -= count*deltaX;
                        target.y -= count*deltaY;
                    }
                }
            });
            bubble.tween = tween;
        })
    }


    public showBouncing(targetBubble:Bubble) {
        this.neighborsHelper.resetProcess();
        let toWork = [];
        toWork.push(targetBubble);
        targetBubble.processed = true;
        let layer = 3;
        let neighbors:Bubble[] = [];
        let delay = 0;
        while(toWork.length > 0 && layer > 0) {
            let obj = toWork.pop();
            if(obj != undefined) {
                const rawNeighbors = this.neighborsHelper.getNeighbors(obj);
                rawNeighbors.some((bubble:Bubble) => {
                    if(!bubble.processed) {
                        bubble.processed = true;
                        // neighbor accepted
                        neighbors.push(bubble);
                    }
                });
            }
            if(toWork.length == 0) {
                //setup neighbors
                this.runTween(neighbors,targetBubble,delay);
                delay += 50;
                toWork = neighbors;
                neighbors = [];
                layer--;
            }

        }
    }
}