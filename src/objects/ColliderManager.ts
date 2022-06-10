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
                        let newBubble = this.bubblesBoard.addingBubbleManager.addNewBubble(bubble,shootedBubble);
                        // let clusters = this.bubblesBoard.clusterDetector.find(newBubble,true,true);
                        // this.bubblesBoard.clusterHandler.clearClusters(clusters);
                        let clusters =  this.bubblesBoard.clusters.run(newBubble,true,true);
                        console.log(clusters.length);
                        // this.parent.scene.time.addEvent({delay:500, callback: () => {
                        //     let floatingBubbles = this.parent.floatingBubbleDetector.find();
                        //     console.log('Floating bubbles number: ' + floatingBubbles.length);
                        //     if(floatingBubbles.length > 0) {
                        //         for(let k = 0; k < floatingBubbles.length; k++) {
                        //             console.log('floating bubbles position: ' + floatingBubbles[k].row + '|' + floatingBubbles[k].column);
                        //         }
                        //     }
                        //     this.floatingHandler.clearFloating(floatingBubbles);
                        //     this.parent.updateRow();
                        //     console.log('New Width: ' + this.parent.width);
                        //     console.log('Ending point//////////////////////////////////');
                        // }});
                    });
                }
            }
        }
    }
}