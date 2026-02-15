import { GameScene } from "../../../scenes/GameScene";
import { Bubble } from "../../Bubble";
import { BubblesBoard } from "../BubblesBoard";
import { ClusterDetector } from "./ClusterDetector";
import { ClusterHandler } from "./ClusterHandler";

export class Clusters {
    private clusters: Bubble[];
    private bubblesBoard: BubblesBoard;
    public scene: GameScene;
    public detector: ClusterDetector;
    private handler: ClusterHandler;

    constructor(scene:GameScene, bubblesBoard: BubblesBoard) {
        this.scene = scene;
        this.bubblesBoard = bubblesBoard;
        this.clusters = [];
        this.detector = new ClusterDetector(this.bubblesBoard);
        this.handler = new ClusterHandler(this.scene, this, this.bubblesBoard);
    }

    public findClusters(targetedBubble: Bubble, reset: boolean, matchType: boolean):Bubble[] {
        let foundClusters = this.detector.find(targetedBubble,reset,matchType);
        return foundClusters;
    }

    public checkClusters(targetedBubble: Bubble, reset: boolean, matchType: boolean):Bubble[] {
        this.clusters = this.findClusters(targetedBubble,reset,matchType);
        console.log(JSON.parse(JSON.stringify(this.clusters)));
        if(this.clusters.length >= 3) {
            this.scene.scoreManager.calculateScore();
            this.scene.scoreManager.increaseCombo();
            this.scene.holes.runAnimationScore();
            this.handler.clearClusters(this.clusters);
        } else {
            this.scene.scoreManager.resetCombo();
            this.scene.holes.runAnimationScore();
        }
        return this.clusters;
    }
}