import { Bubble } from "./Bubble";
import { BubblesBoard } from "./BubblesBoard";
import { ClusterDetector } from "./ClusterDetector";
import { ClusterHandler } from "./ClusterHandler";
import { FloatingHandler } from "./FloatingHandler";
import { ShootedBubble } from "./ShootedBubble";

export class ColliderManager {
    private parent!: BubblesBoard;
    private clusterHandler!: ClusterHandler;
    private floatingHandler!: FloatingHandler;

    constructor(parent:BubblesBoard) {
        this.parent = parent;
        this.clusterHandler = new ClusterHandler();
        this.floatingHandler = new FloatingHandler();
    }

    public createColliderShootedBubble(shootedBubble:ShootedBubble) {
        let widthRange = this.parent.width;
        for(let i = 0; i < widthRange; i++) {
            for(let j = 0; j < this.parent.height; j++) {
                if(this.parent.isBublleExisting(i,j)) {
                    this.parent.scene.physics.add.collider(shootedBubble,this.parent.bubblesBoard[i][j],(_shootedBubble:any,_bubble:any) => {
                        console.log('Starting point////////////////////////////////');
                        let bubble = _bubble as Bubble;
                        shootedBubble.clear();
                        let newBubble = this.parent.addingBubble.addNewBubble(bubble,shootedBubble);
                        let clusters = this.parent.clusterDetector.find(newBubble,true,true);
                        this.clusterHandler.clearClusters(clusters);
                        let floatingBubbles = this.parent.floatingBubbleDetector.find();
                        console.log('Floating bubbles number: ' + floatingBubbles.length);
                        if(floatingBubbles.length > 0) {
                            for(let k = 0; k < floatingBubbles.length; k++) {
                                console.log('floating bubbles position: ' + floatingBubbles[k].row + '|' + floatingBubbles[k].column);
                            }
                        }
                        this.floatingHandler.clearFloating(floatingBubbles);
                        this.parent.updateRow();
                        console.log('New Width: ' + this.parent.width);
                        console.log('Ending point//////////////////////////////////');
                    });
                }
            }
        }
    }
}