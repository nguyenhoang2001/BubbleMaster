import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { ClusterDetector } from "./ClusterDetector";
import { ClusterHandler } from "./ClusterHandler";

export class Clusters {
    private clusters!: Bubble[];
    private bubblesBoard!: BubblesBoard;
    public scene!: Phaser.Scene;
    public detector!: ClusterDetector;
    private handler!: ClusterHandler;
    public remains!: number;
    public isHavingClusters!: boolean;

    constructor(scene:Phaser.Scene, bubblesBoard: BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
        this.clusters = [];
        this.detector = new ClusterDetector(this.bubblesBoard);
        this.handler = new ClusterHandler(this.scene, this);
        this.remains = 1;
        this.isHavingClusters = false;
    }

    public resetProcess() {
        this.detector.resetProcess();
    }

    public findClusters(targetedBubble: Bubble, reset: boolean, matchType: boolean):Bubble[] {
        let foundClusters = this.detector.find(targetedBubble,reset,matchType);

        return foundClusters;
    }

    public run(targetedBubble: Bubble, reset: boolean, matchType: boolean):Bubble[] {
        this.clusters = this.findClusters(targetedBubble,reset,matchType);
        for(let i = 0; i < this.clusters.length; i++) {
            this.clusters[i].setDepth(1);
        }
        if(this.clusters.length >= 3) {
            this.remains = this.clusters.length;
            this.isHavingClusters = true;
            this.handler.clearClusters(this.clusters);
        } else {
            this.isHavingClusters = false;
        }
        return this.clusters;
    }

    public resetRemains() {
        this.remains = 1;
    }
}