import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { BubbleNeighbors } from "../BubbleNeighbors";

export class ClusterDetector {
    private parent: BubblesBoard;

    constructor(parent:BubblesBoard) {
        this.parent = parent;
    }

    public find(targetedBubble:Bubble, reset:boolean, matchType:boolean):Bubble[] {
        if(reset) {
            this.parent.neighbors.resetProcess();
        }
        let toProcess = [targetedBubble];
        // next neightbors
        targetedBubble.processed = true;
        let foundCluster = [];
        // current cluster = []
        while(toProcess.length > 0) {
            let currentBubble = toProcess.shift();
            if(currentBubble == undefined) {
                continue;
            } else {
                if(currentBubble.visible) {
                    if(!matchType || currentBubble.texture.key == targetedBubble.texture.key) {
                        // push vao current cluster
                        foundCluster.push(currentBubble);
                        const neighbors = this.parent.neighbors.getNeighbors(currentBubble);
                        if(neighbors == undefined)
                            continue;
                        for(let i = 0; i < neighbors.length; i++) {
                            if(!neighbors[i].processed) {
                                neighbors[i].processed = true;
                                // next neightbors
                                toProcess.push(neighbors[i]);
                            }
                        }
                    }
                }
            }
            // if (toProcess.length ==0)
            // toProcess.push(next neightbors)
            // push current vao found
        }
        return foundCluster;
    }
}