import { Bubble } from "./Bubble";
import { BubblesBoard } from "./BubblesBoard";
import { ClusterHandler } from "./ClusterHandler";
import { ShootedBubble } from "./ShootedBubble";

export class ColliderManager {
    private parent!: BubblesBoard;
    private clusterHandler!: ClusterHandler;

    constructor(parent:BubblesBoard) {
        this.parent = parent;
        this.clusterHandler = new ClusterHandler();
    }

    public createColliderShootedBubble(shootedBubble:ShootedBubble) {
        let widthRange = this.parent.width;
        for(let i = 0; i < widthRange; i++) {
            for(let j = 0; j < this.parent.height; j++) {
                if(this.parent.bubblesBoard[i][j] != undefined && this.parent.bubblesBoard[i][j].visible) {
                    this.parent.scene.physics.add.collider(shootedBubble,this.parent.bubblesBoard[i][j],(_shootedBubble:any,_bubble:any) => {
                        let bubble = _bubble as Bubble;
                        shootedBubble.disablePhysics();
                        let newBubble = this.parent.addingBubble.addNewBubble(bubble,shootedBubble);
                        let clusters = this.parent.clusterDetector.find(newBubble,true);
                        this.clusterHandler.clearClusters(clusters);
                    });
                }
            }
        }
    }
}