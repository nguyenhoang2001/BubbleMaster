import { GameScene } from "../../../scenes/GameScene";
import { Bubble } from "../../Bubble";
import { ShootedBubble } from "../../ShootedBubble";
import { BubblesBoard } from "../BubblesBoard";
import { BubbleNeighbors } from "./BubbleNeighbors";

export class ColliderManager {
    public bubblesBoard!: BubblesBoard;
    public scene!: GameScene;
    public isCollide!: boolean;
    private shootedBubble!: ShootedBubble;
    private hittedBubble!: Bubble;
    private neighborsHelper!: BubbleNeighbors;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
        this.isCollide = false;
        this.neighborsHelper = this.bubblesBoard.neighbors;
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

    public gridGroupAndBulletGroup() {
        this.scene.physics.add.collider(this.bubblesBoard.gridGroup,this.scene.shooter.bulletGroup,(_bubble:any,_shootedBubble:any) => {
            if(!this.isCollide) {
                this.shootedBubble = _shootedBubble as ShootedBubble;
                this.shootedBubble.body.checkCollision.none = true;
                
                this.hittedBubble = _bubble as Bubble;
                let bulletGroup = this.scene.shooter.bulletGroup;
                let gridGroup = this.bubblesBoard.gridGroup;
                // this.shootedBubble.body.stop();
                this.handleWrongBubbleHit();
                // get from the bullet group to the grid group
                // bulletGroup.remove(this.shootedBubble);
                // gridGroup.add(this.shootedBubble as Bubble);
                this.isCollide = true;
            }
        });
    }

    public runCollide() {
        this.shootedBubble.clear();
        this.bubblesBoard.updateRow();
        const newBubble = this.bubblesBoard.addingManager.fromShoot(this.hittedBubble,this.shootedBubble);
        this.bubblesBoard.updateRow();
        this.shootedBubble.removeVisualEffect();
        this.shootedBubble.destroy();
        this.isCollide = false;
        if(newBubble == undefined)
            return;
        return newBubble;
    }
}