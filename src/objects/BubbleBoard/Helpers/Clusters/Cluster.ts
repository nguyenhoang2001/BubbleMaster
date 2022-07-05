import { GameScene } from "../../../../scenes/GameScene";
import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { ClusterDetector } from "./ClusterDetector";
import { ClusterHandler } from "./ClusterHandler";

export class Clusters {
    private clusters: Bubble[];
    private bubblesBoard: BubblesBoard;
    public scene: GameScene;
    public detector: ClusterDetector;
    private handler: ClusterHandler;
    public remains: number;
    public isHavingClusters: boolean;
    public clustersFinish: boolean;
    public checkingFinish: boolean;

    constructor(scene:GameScene, bubblesBoard: BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
        this.clusters = [];
        this.detector = new ClusterDetector(this.bubblesBoard);
        this.handler = new ClusterHandler(this.scene, this, this.bubblesBoard);
        this.remains = 0;
        this.isHavingClusters = false;
        this.clustersFinish = true;
        this.checkingFinish = true;
    }

    public findClusters(targetedBubble: Bubble, reset: boolean, matchType: boolean):Bubble[] {
        let foundClusters = this.detector.find(targetedBubble,reset,matchType);
        return foundClusters;
    }

    public run(targetedBubble: Bubble, reset: boolean, matchType: boolean):Bubble[] {
        this.clusters = this.findClusters(targetedBubble,reset,matchType);
        console.log(JSON.parse(JSON.stringify(this.clusters)));
        if(this.clusters.length >= 3) {
            this.remains = this.clusters.length;
            this.isHavingClusters = true;
            this.clustersFinish = false;
            this.checkingFinish = false;
            this.handler.clearClusters(this.clusters);
        }
        return this.clusters;
    }

    public resetState() {
        this.isHavingClusters = false;
        this.clustersFinish = true;
    }

    public update() {
        if(this.isHavingClusters) {
            if(this.remains == 0) {
                this.clustersFinish = true;
                if(this.checkingFinish) {
                    this.resetState();
                }
            } else {
                this.clustersFinish = false;
            }
        }
    }
}