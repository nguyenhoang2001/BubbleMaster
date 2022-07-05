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
        let delay = 50;
        for(let i = 0; i < cluster.length; i++) {
            cluster[i].clear();

            let tintColor = cluster[i].texture.key;

            cluster[i].on('animationstart', () => {
                cluster[i].setTintColor(tintColor);

            })
            cluster[i].on('animationupdate', () => {
                if(cluster[i].frame.name == 'animations/grey-explosive/explosive_grey_10') {
                    let row = cluster[i].row;
                    let column = cluster[i].column;
                    this.bubblesBoard.board[row][column] = undefined;   
                    this.clusters.remains -= 1;
                    this.scene.score += 1;
                }
            });

            cluster[i].on('animationcomplete-explode', () => {
                cluster[i].removeAllListeners();
                cluster[i].anims.remove('explode');
                this.bubblesBoard.gridGroup.killAndHide(cluster[i]);
            });

            cluster[i].anims.playAfterDelay('explode',delay);

            delay += 50;
        }
    }
}