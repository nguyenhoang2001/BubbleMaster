import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { BubbleNeighbors } from "../BubbleNeighbors";

export class ClusterDetector {
    private parent!: BubblesBoard;

    constructor(parent:BubblesBoard) {
        this.parent = parent;
    }

    public find(targetedBubble:Bubble, reset:boolean, matchType:boolean):Bubble[] {
        if(reset) {
            this.parent.neighbors.resetProcess();
        }
        let toProcess = [targetedBubble];
        targetedBubble.processed = true;
        let foundCluster = [];
        while(toProcess.length > 0) {
            let currentBubble = toProcess.pop();
            if(currentBubble == undefined) {
                continue;
            } else {
                if(currentBubble.visible) {
                    if(!matchType || currentBubble.texture.key == targetedBubble.texture.key) {
                        foundCluster.push(currentBubble);
                        const neighbors = this.parent.neighbors.getNeighbors(currentBubble);
                        if(neighbors == undefined)
                            continue;
                        for(let i = 0; i < neighbors.length; i++) {
                            if(!neighbors[i].processed) {
                                neighbors[i].processed = true;
                                toProcess.push(neighbors[i]);
                            }
                        }
                    }
                }
            }
        }
        return foundCluster;
    }
}