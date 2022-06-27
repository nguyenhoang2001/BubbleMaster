import { GameScene } from "../../../../scenes/GameScene";
import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { Clusters } from "./Cluster";

export class ClusterHandler {
    private scene!: GameScene;
    private clusters!: Clusters;
    private bubblesBoard!: BubblesBoard;

    constructor(scene:GameScene, clusters: Clusters, bubblesBoard: BubblesBoard) {
        this.scene = scene;
        this.clusters = clusters;
        this.bubblesBoard = bubblesBoard;
    }

    public clearClusters(cluster:Bubble[]) {

        let delay = 100;
        for(let i = 0; i < cluster.length; i++) {
            cluster[i].setDepth(1);
            cluster[i].body.checkCollision.none = true;
            cluster[i].clear();
            let row = cluster[i].row;
            let column = cluster[i].column;
            this.bubblesBoard.board[row][column] = undefined;
            this.scene.tweens.add({
                targets:cluster[i],
                scale: 1.5,
                ease:'Power2',
                duration: 200,
                delay: delay,
                onComplete: () => {
                    cluster[i].setDepth(0);
                    this.clusters.remains -= 1;
                    this.bubblesBoard.gridGroup.killAndHide(cluster[i]);
                    this.scene.score += 1;
                }
            });
            delay += 100;
        }
    }
}