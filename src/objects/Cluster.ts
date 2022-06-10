import { Bubble } from "./Bubble";
import { BubblesBoard } from "./BubblesBoard";
import { ClusterDetector } from "./ClusterDetector";
import { ClusterHandler } from "./ClusterHandler";

export class Clusters {
    private clusters!: Bubble[];
    private bubblesBoard!: BubblesBoard;
    public scene!: Phaser.Scene;
    public detector!: ClusterDetector;
    private handler!: ClusterHandler;
    public remains!: number;

    constructor(scene:Phaser.Scene, bubblesBoard: BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
        this.clusters = [];
        this.detector = new ClusterDetector(this.bubblesBoard);
        this.handler = new ClusterHandler(this.scene, this);
        this.remains = 1;
    }

    public resetProcess() {
        this.detector.resetProcess();
    }

    public run(targetedBubble: Bubble, reset: boolean, matchType: boolean):Bubble[] {
        this.clusters = this.detector.find(targetedBubble,reset,matchType);
        if(this.clusters.length >= 3) {
            this.remains = this.clusters.length;
            this.handler.clearClusters(this.clusters);
        }
        return this.clusters;
    }

    public resetRemains() {
        this.remains = 1;
    }
}