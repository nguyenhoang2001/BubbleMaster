import { Bubble } from "../Bubble";
import { BubblesBoard } from "./BubblesBoard";
import { GameScene } from "../../scenes/GameScene";
import { ShootedBubble } from "src/objects/ShootedBubble";

export class BubblePositionManager {
    private bubblesBoard: BubblesBoard;
    public scene: GameScene;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
    }

    public setPosition(row:number,column:number,bubble:Bubble) {
        let bubbleX = column * bubble.displayWidth + column*this.bubblesBoard.offsetDistanceBetweenBubbles;
        if ((row + this.bubblesBoard.rowOffSet) % 2) {
            bubbleX += bubble.displayWidth/2 ;
        }
        let bubbleY = row * this.bubblesBoard.rowHeight;
        bubble.x = bubbleX + this.bubblesBoard.x;
        bubble.y = bubbleY + this.bubblesBoard.y;
    }

    public setPositionFromShooting(row:number,column:number,bubble:Bubble) {
        let firstBubble = this.bubblesBoard.board[0].find(n => n);
        if(firstBubble == undefined)
            return;
        
        let bubbleX = column * bubble.displayWidth + column*this.bubblesBoard.offsetDistanceBetweenBubbles;
        if ((row + this.bubblesBoard.rowOffSet) % 2) {
            bubbleX += bubble.displayWidth/2 ;
        }
        let bubbleY = row * this.bubblesBoard.rowHeight;
        bubble.y = firstBubble.y;
        bubble.x = bubbleX + this.bubblesBoard.x;
        bubble.y += bubbleY;
    }

    public getCoordinate(row:number, column:number) {
        let firstBubble = this.bubblesBoard.board[0].find(n => n);
        let bubbleWidth = 56;
        if(firstBubble == undefined) 
            return;
        let bubbleX = column * bubbleWidth + column*this.bubblesBoard.offsetDistanceBetweenBubbles;
        if ((row + this.bubblesBoard.rowOffSet) % 2) {
            bubbleX += bubbleWidth/2;
        }
        let bubbleY = row * this.bubblesBoard.rowHeight;
        bubbleY += firstBubble.y;
        bubbleX += this.bubblesBoard.x;
        return {x:bubbleX, y:bubbleY};
    }

    private rePositionShootedBubble(hittedBubble:Bubble, shootBubble:ShootedBubble, offsetDistance:number) {
        let hitBubbleY = hittedBubble.y;

        let y = Math.abs(hitBubbleY - shootBubble.y);
        let x = Math.abs(hittedBubble.x - shootBubble.x);
        let distance = this.getDistance(hittedBubble, shootBubble);
        if(distance >= offsetDistance) {
            if(distance == offsetDistance)
                return;
            const offsetY = Math.abs(y * (1 - (offsetDistance/distance)));
            const offsetX = Math.abs(x * (1 - (offsetDistance/distance)));
            if(shootBubble.y >= hitBubbleY) {
                shootBubble.y -= offsetY;
            } else {
                shootBubble.y += offsetY;
            }

            if(shootBubble.x >= hittedBubble.x) {
                shootBubble.x -= offsetX;
            } else {
                shootBubble.x += offsetX;
            }
        } else {
            const offsetY = Math.abs(y * ((offsetDistance/distance) - 1));
            const offsetX = Math.abs(x * ((offsetDistance/distance) - 1));
            if(shootBubble.y >= hitBubbleY) {
                shootBubble.y += offsetY;
            } else {
                shootBubble.y -= offsetY;
            }
            if(shootBubble.x >= hittedBubble.x) {
                shootBubble.x += offsetX;
            } else {
                shootBubble.x -= offsetX;
            }
        }
    }

    private getNearestBubble(targetBubble:Bubble, hitBubble:Bubble):Bubble|undefined {
        let distance = -1;
        let nearestBubble;
        for(let i = this.bubblesBoard.row - 1; i >= hitBubble.row; i--) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                const bubble = this.bubblesBoard.board[i][j];
                if(bubble != undefined) {
                    if(this.bubblesBoard.isBublleExisting(i,j)) {
                        let distanceCheck = Phaser.Math.Distance.Between(bubble.x,bubble.y,targetBubble.x,targetBubble.y);
                        if(distance == -1) {
                            distance = distanceCheck;
                            nearestBubble = bubble;
                        } else {
                            if(distance > distanceCheck) {
                                distance = distanceCheck;
                                nearestBubble = bubble;
                            }
                        }
                    }
                }
            }
        }
        return nearestBubble;
    }

    public getDistance(objA:any, objB:any):number {
        return Phaser.Math.Distance.Between(objA.x,objA.y,objB.x,objB.y);
    }

    public getPositionNewBubble(hittedBubble:Bubble, shootedBubble:ShootedBubble):any {
        let offsetDistance = 38;
        this.rePositionShootedBubble(hittedBubble,shootedBubble,offsetDistance);
        let nearest = this.getNearestBubble(shootedBubble,hittedBubble);
        if(nearest != undefined) {
            if( this.getDistance(nearest,shootedBubble) <= offsetDistance) {
                hittedBubble = nearest;
            }
        }
        this.bubblesBoard.addNewRow();
        let distanceCalculator = Phaser.Math.Distance;
        let smallestdistance = 0;
        let shootedPosition:any;
        let empties = this.bubblesBoard.neighbors.getEmpty(hittedBubble);
        for(let i = 0; i < empties.length; i++) {
            let gridPos = empties[i];
            let emptyCoordinate = this.bubblesBoard.positionManager.getCoordinate(gridPos.row,gridPos.column);
            if(emptyCoordinate == undefined)
                return;
            let distance = distanceCalculator.Between(emptyCoordinate.x,emptyCoordinate.y,  
                shootedBubble.x, shootedBubble.y);
            if(i == 0) {
                smallestdistance = distance;
                shootedPosition = gridPos;
            } else {
                if(smallestdistance > distance) {
                    smallestdistance = distance;
                    shootedPosition = gridPos;
                }
            }
        }
        return {row:shootedPosition.row, column:shootedPosition.column};
    }
}