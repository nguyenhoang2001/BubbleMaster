import { AddingBubble } from "./AddingBubble";
import { Bubble } from "./Bubble";
import { ShootedBubble } from "./ShootedBubble";

export class PositionBubbleHandler {
    private parent!: AddingBubble;

    constructor(parent: AddingBubble) {
        this.parent = parent;
    }

    public getPositionNewBubble(hittedBubble:Bubble, shootedBubble:ShootedBubble):any {
        console.log('hitted bubble coordinate: ' + hittedBubble.y);
        console.log('shooted bubble coordinate: ' + shootedBubble.y);
        console.log('difference of heigth: ' + (shootedBubble.y - hittedBubble.y));
        let gridPos = this.parent.bubblesBoard.getIndexBubble(shootedBubble);
        console.log('unProtected bubble position: ' + gridPos.x + '|' + gridPos.y);
        this.protectRow(gridPos,hittedBubble,shootedBubble);
        let newBubbleCoordinate = this.parent.bubblesBoard.getCoordinateBubble(gridPos.x,gridPos.y);
        let distanceOldAndNew = Phaser.Math.Distance.Between(hittedBubble.x,hittedBubble.y,newBubbleCoordinate.x,newBubbleCoordinate.y);
        console.log('distance between two bubbbles: ' + distanceOldAndNew);
        if(distanceOldAndNew >= 57) {
            console.log('detect high distance');
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
        if(shootedBubble.y - hittedBubble.y <= 47) {
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
                console.log('existing bubble position: ' + gridPos.x + '|' + gridPos.y);
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
                console.log('existing bubble position: ' + gridPos.x + '|' + gridPos.y);
                if(hittedBubble.x >= shootedBubble.x) {
                    gridPos.y = hittedBubble.column - 1;
                } else {
                    gridPos.y = hittedBubble.column + 1;
                }
            }
        }
        if(gridPos.y >= this.parent.bubblesBoard.height) {
            gridPos.y = this.parent.bubblesBoard.height - 1;
        } else {
            if(gridPos.y < 0) {
                gridPos.y = 0;
            }
        }
    }

    private protectPosition(gridPos:any, hittedBubble:Bubble,shootedBubble:ShootedBubble) {
        this.parent.bubblesBoard.addNewRow(gridPos.x);
        this.protectColumn(gridPos,hittedBubble,shootedBubble);
    }
}