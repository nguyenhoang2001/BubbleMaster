import { ConstraintFactory } from "matter";
import { Bubble } from "./Bubble";
import { BubblesBoard } from "./BubblesBoard";
import { ShootedBubble } from "./ShootedBubble";

export class ColliderManager {
    public bubblesBoard!: BubblesBoard;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
    }

    public createColliderShootedBubble(shootedBubble:ShootedBubble) {
        let widthRange = this.bubblesBoard.width;
        for(let i = 0; i < widthRange; i++) {
            for(let j = 0; j < this.bubblesBoard.height; j++) {
                if(this.bubblesBoard.isBublleExisting(i,j)) {
                    this.bubblesBoard.scene.physics.add.collider(shootedBubble,this.bubblesBoard.bubblesBoard[i][j],(_shootedBubble:any,_bubble:any) => {
                        console.log('Starting point////////////////////////////////');
                        let bubble = _bubble as Bubble;
                        shootedBubble.clear();
                        let newBubble = this.bubblesBoard.addingBubbleManager.addFromShoot(bubble,shootedBubble);
                        if(this.bubblesBoard.scene.shooter.shootTenTimes) {
                            this.bubblesBoard.addSignal = true;
                        }
                        let clusters =  this.bubblesBoard.clusters.run(newBubble,true,true);
                        console.log(clusters.length);
                    });
                }
            }
        }
    }
}