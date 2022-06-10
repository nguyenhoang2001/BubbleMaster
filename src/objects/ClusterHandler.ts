import { Bubble } from "./Bubble";
import { Clusters } from "./Cluster";

export class ClusterHandler {
    private scene!: Phaser.Scene;
    private clusters!: Clusters;

    constructor(scene:Phaser.Scene, clusters: Clusters) {
        this.scene = scene;
        this.clusters = clusters;
    }

    public clearClusters(cluster:Bubble[]) {
        console.log(cluster.length);
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