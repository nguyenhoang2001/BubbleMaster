import { GameScene } from "../../../../scenes/GameScene";
import { Bubble } from "../../../Bubble";
import { Clusters } from "./Cluster";

export class ClusterHandler {
    private scene!: GameScene;
    private clusters!: Clusters;

    constructor(scene:GameScene, clusters: Clusters) {
        this.scene = scene;
        this.clusters = clusters;
    }

    public clearClusters(cluster:Bubble[]) {
        for(let i = 0; i < cluster.length; i++) {
            console.log(cluster[i].texture.key);
            console.log(cluster[i].row + '|' + cluster[i].column);
            this.scene.tweens.add({
                targets:cluster[i],
                scale: 1.5,
                ease:'Power2',
                duration: 500,
                onComplete: () => {
                    cluster[i].clear();
                    this.clusters.remains -= 1;
                }
            });
        }
        
    }
}