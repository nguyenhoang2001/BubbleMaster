import { AddingBubble } from "./AddingBubble";
import { Bubble } from "../../../Bubble";
import { ShootedBubble } from "../../../ShootedBubble";
import { BubblesBoard } from "../../BubblesBoard";
import { GameScene } from "../../../../scenes/GameScene";

export class PositionBubbleHandler {
    private parent!: AddingBubble;
    private bubblesBoard: BubblesBoard;
    private scene!: GameScene;

    constructor(parent: AddingBubble) {
        this.parent = parent;
        this.bubblesBoard = this.parent.bubblesBoard;
        this.scene = this.bubblesBoard.scene;
    }

    private rePositionShootedBubble(hittedBubble:Bubble, shootBubble:ShootedBubble) {
        let hitBubbleY = hittedBubble.y;

        let y = Math.abs(hitBubbleY - shootBubble.y);
        let x = Math.abs(hittedBubble.x - shootBubble.x);
        let distance = Phaser.Math.Distance.Between(hittedBubble.x,hitBubbleY,shootBubble.x, shootBubble.y);
        if(distance >= 56) {
            if(distance == 56)
                return;
            const offsetY = Math.abs(y * (1 - (56/distance)));
            const offsetX = Math.abs(x * (1 - (56/distance)));
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
            const offsetY = Math.abs(y * ((56/distance) - 1));
            const offsetX = Math.abs(x * ((56/distance) - 1));
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

    public getPositionNewBubble(hittedBubble:Bubble, shootedBubble:ShootedBubble):any {
        this.parent.bubblesBoard.addNewRow();
        let empties = this.bubblesBoard.neighbors.getEmpty(hittedBubble);
        let distanceCalculator = Phaser.Math.Distance;
        let smallestdistance = 0;
        let shootedPosition:any;
        this.rePositionShootedBubble(hittedBubble,shootedBubble);
        for(let i = 0; i < empties.length; i++) {
            let gridPos = empties[i];
            let emptyCoordinate = this.bubblesBoard.positionManager.getPosition(gridPos.row,gridPos.column);
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