import { Bubble } from "../../Bubble";
import { ShootedBubble } from "../../ShootedBubble";
import { BubblesBoard } from "../BubblesBoard";


export class ColliderManager {
    public bubblesBoard!: BubblesBoard;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
    }

    public createColliderShootedBubble(shootedBubble:ShootedBubble) {
        let widthRange = this.bubblesBoard.row;
        for(let i = 0; i < widthRange; i++) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                if(this.bubblesBoard.isBublleExisting(i,j)) {
                    this.bubblesBoard.scene.physics.add.collider(shootedBubble,this.bubblesBoard.board[i][j],(_shootedBubble:any,_bubble:any) => {
                        console.log('Starting point////////////////////////////////');
                        let bubble = _bubble as Bubble;
                        shootedBubble.clear();
                        let newBubble = this.bubblesBoard.addingManager.addFromShoot(bubble,shootedBubble);
                        if(this.bubblesBoard.scene.shooter.shootTenTimes) {
                            this.bubblesBoard.addSignal = true;
                        }
                        this.bubblesBoard.clusters.run(newBubble,true,true);
                    });
                }
            }
        }
    }
}