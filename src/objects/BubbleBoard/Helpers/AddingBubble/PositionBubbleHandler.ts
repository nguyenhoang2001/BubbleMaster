import { AddingBubble } from "./AddingBubble";
import { Bubble } from "../../../Bubble";
import { ShootedBubble } from "../../../ShootedBubble";
import { BubblesBoard } from "../../BubblesBoard";
import { GameScene } from "../../../../scenes/GameScene";

export class PositionBubbleHandler {
    private parent: AddingBubble;
    private bubblesBoard: BubblesBoard;
    private scene: GameScene;

    constructor(parent: AddingBubble) {
        this.parent = parent;
        this.bubblesBoard = this.parent.bubblesBoard;
        this.scene = this.bubblesBoard.scene;
    }

    private rePositionShootedBubble(hittedBubble:Bubble, shootBubble:ShootedBubble, offsetDistance:number) {
        let hitBubbleY = hittedBubble.y;

        let y = Math.abs(hitBubbleY - shootBubble.y);
        let x = Math.abs(hittedBubble.x - shootBubble.x);
        let distance = Phaser.Math.Distance.Between(hittedBubble.x,hitBubbleY,shootBubble.x, shootBubble.y);
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
        // console.log('The nearest ball is: ');
        // console.log(nearest?.row, nearest?.column,nearest?.texture.key);
        // console.log(hittedBubble.row,hittedBubble.column, hittedBubble.texture.key);
        // console.log(this.getDistance(nearest,shootedBubble))
        if(nearest != undefined) {
            if( this.getDistance(nearest,shootedBubble) <= offsetDistance) {
                hittedBubble = nearest;
            }
        }
        this.parent.bubblesBoard.addNewRow();
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
        return {x:shootedPosition.row, y:shootedPosition.column};
    }
}