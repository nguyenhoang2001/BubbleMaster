import { Bubble } from "./Bubble";

export class ClusterHandler {
    public clearClusters(cluster:Bubble[]) {
        console.log(cluster.length);
        if(cluster.length >= 3) {
            for(let i = 0; i < cluster.length; i++) {
                console.log(cluster[i].texture.key);
                console.log(cluster[i].row + '|' + cluster[i].column);
                cluster[i].clear();
            }
        }
    }
    public clearFloating(floatingBubbles:Bubble[]) {
        for(let i = 0; i< floatingBubbles.length; i++) {
            floatingBubbles[i].clear();
        }
    }

}