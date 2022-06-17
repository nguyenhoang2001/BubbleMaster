import { AddingBubble } from "./AddingBubble";
import { Bubble } from "../../../Bubble";
import { ShootedBubble } from "../../../ShootedBubble";

export class PositionBubbleHandler {
    private parent!: AddingBubble;

    constructor(parent: AddingBubble) {
        this.parent = parent;
    }

    public getPositionNewBubble(hittedBubble:Bubble, shootedBubble:ShootedBubble):any {
        let gridPos = this.parent.bubblesBoard.positionManager.getPositionFromShooting(shootedBubble);
        this.protectRow(gridPos,hittedBubble,shootedBubble);
        let newBubbleCoordinate = this.parent.bubblesBoard.positionManager.getPosition(gridPos.x,gridPos.y);
        let distanceOldAndNew = Phaser.Math.Distance.Between(hittedBubble.x,hittedBubble.y,newBubbleCoordinate.x,newBubbleCoordinate.y);
        if(distanceOldAndNew >= 57) {
            this.rePositionBubble(hittedBubble,newBubbleCoordinate,gridPos);
        }
        this.protectPosition(gridPos,hittedBubble,shootedBubble);
        console.log('hitted bubble position: ' + hittedBubble.row + '|' + hittedBubble.column);
        console.log('new bubble position: ' + gridPos.x + '|' + gridPos.y);
        return {x:gridPos.x, y:gridPos.y};
    }

    private rePositionBubble(hittedBubble:Bubble, bubbleCoordinate:any, gridPos:any):any {
        if(gridPos.x == hittedBubble.row) {
            if(bubbleCoordinate.x <= hittedBubble.x) {
                gridPos.y = hittedBubble.column - 1;
            } else {
                gridPos.y = hittedBubble.column + 1;
            }
        } else {
            if((hittedBubble.row + this.parent.bubblesBoard.rowOffSet)% 2) {
                if(bubbleCoordinate.x <= hittedBubble.x) {
                    gridPos.y = hittedBubble.column;
                } else {
                    gridPos.y = hittedBubble.column + 1;
                }
            } else {
                if(bubbleCoordinate.x <= hittedBubble.x) {
                    gridPos.y = hittedBubble.column - 1;
                } else {
                    gridPos.y = hittedBubble.column;
                }
            }
        }
        return {x:gridPos.x, y:gridPos.y};
    }

    private protectRow(gridPos:any, hittedBubble:Bubble, shootedBubble:ShootedBubble) {
        if(shootedBubble.y - hittedBubble.y <= 46) {
            gridPos.x = hittedBubble.row;
        } else {
            if(gridPos.x > hittedBubble.row + 1) {
                gridPos.x = hittedBubble.row + 1;
            } else {
                if(gridPos.x < hittedBubble.row - 1) {
                    gridPos.x = hittedBubble.row - 1;
                }
            }
        }
        if(gridPos.x < 0) {
            gridPos.x = 0;
        }
    }

    private protectColumn(gridPos:any, hittedBubble:Bubble, shootedBubble:ShootedBubble) {
        if(gridPos.x != hittedBubble.row) {
            if(this.parent.bubblesBoard.isBublleExisting(gridPos.x, gridPos.y)) {
                if((hittedBubble.row + this.parent.bubblesBoard.rowOffSet) % 2) {
                    if(gridPos.y > hittedBubble.column) {
                        gridPos.y = hittedBubble.column;
                    } else {
                        gridPos.y = hittedBubble.column + 1;
                    }
                } else {
                    if(gridPos.y < hittedBubble.column) {
                        gridPos.y = hittedBubble.column;
                    } else {
                        gridPos.y = hittedBubble.column - 1;
                    }
                }
            }
        } else {
            if(this.parent.bubblesBoard.isBublleExisting(gridPos.x, gridPos.y)) {
                if(hittedBubble.x >= shootedBubble.x) {
                    gridPos.y = hittedBubble.column - 1;
                } else {
                    gridPos.y = hittedBubble.column + 1;
                }
            }
        }
        if(gridPos.y >= this.parent.bubblesBoard.column) {
            gridPos.y = this.parent.bubblesBoard.column - 1;
        } else {
            if(gridPos.y < 0) {
                gridPos.y = 0;
            }
        }
    }

    private protectPosition(gridPos:any, hittedBubble:Bubble,shootedBubble:ShootedBubble) {
        this.parent.bubblesBoard.addNewRow();
        this.protectColumn(gridPos,hittedBubble,shootedBubble);
        if(this.parent.bubblesBoard.isBublleExisting(gridPos.x, gridPos.y)) {
            if(gridPos.x == hittedBubble.row) {
                if(shootedBubble.y >= hittedBubble.y) {
                    gridPos.x = hittedBubble.row + 1;
                } else {
                    gridPos.x = hittedBubble.row - 1;
                } 
            }
        }
    }
}