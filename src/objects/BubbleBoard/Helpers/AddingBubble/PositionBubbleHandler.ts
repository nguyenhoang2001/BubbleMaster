import { AddingBubble } from "./AddingBubble";
import { Bubble } from "../../../Bubble";
import { ShootedBubble } from "../../../ShootedBubble";
import { BubblesBoard } from "../../BubblesBoard";

export class PositionBubbleHandler {
    private parent!: AddingBubble;
    private bubblesBoard: BubblesBoard;

    constructor(parent: AddingBubble) {
        this.parent = parent;
        this.bubblesBoard = this.parent.bubblesBoard;
    }

    public getPositionNewBubble(hittedBubble:Bubble, shootedBubble:ShootedBubble):any {
        if(hittedBubble.row == this.bubblesBoard.row - 1) {
            this.parent.bubblesBoard.addNewRow();
        }
        let empties = this.bubblesBoard.neighbors.getEmpty(hittedBubble);
        let distanceCalculator = Phaser.Math.Distance;
        let smallestdistance = 0;
        let shootedPosition:any;
        for(let i = 0; i < empties.length; i++) {
            let gridPos = empties[i];
            let emptyCoordinate = this.bubblesBoard.positionManager.getPosition(gridPos.row,gridPos.column);
            let distance = distanceCalculator.Between(emptyCoordinate.x,emptyCoordinate.y, 
                shootedBubble.x, shootedBubble.y - this.bubblesBoard.y + 28);
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