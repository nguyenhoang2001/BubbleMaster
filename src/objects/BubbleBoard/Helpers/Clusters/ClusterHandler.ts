import DEPTH from "../../../../game/constant/Depth";
import { GameScene } from "../../../../scenes/GameScene";
import { Bubble } from "../../../Bubble";
import { BubblesBoard } from "../../BubblesBoard";
import { Clusters } from "./Cluster";

export class ClusterHandler {
    private scene: GameScene;
    private clusters: Clusters;
    private bubblesBoard: BubblesBoard;

    constructor(scene:GameScene, clusters: Clusters, bubblesBoard: BubblesBoard) {
        this.scene = scene;
        this.clusters = clusters;
        this.bubblesBoard = bubblesBoard;
    }

    public runAnimation(cluster:Bubble[]) {
        let delay = 50;
        for(let i = 0; i < cluster.length; i++) {
            let tintColor = cluster[i].texture.key;
            cluster[i].on('animationstart', () => {
                cluster[i].setDepth(DEPTH.ANIMATIONEXPLODE);
                cluster[i].setTintColor(tintColor);
            });
            cluster[i].anims.playAfterDelay('explode',delay);

            delay += 50;

            cluster[i].on('animationupdate', (animation:any,frame:any,obj:any) => {
                if(frame.index == 15) {
                    if(i == 0) {
                        this.bubblesBoard.floatingBubbles.showAnimation();
                    }
                    this.scene.scoreManager.increaseScore(cluster[i].score);
                }
            });

            cluster[i].on('animationcomplete-explode', () => {
                this.clusters.remains -= 1;
                cluster[i].removeAllListeners();
                cluster[i].anims.remove('explode');
                cluster[i].clear();
                this.bubblesBoard.gridGroup.killAndHide(cluster[i]);
            });
            
        }
    }

    public clearClusters(cluster:Bubble[]) {
        for(let i = 0; i < cluster.length; i++) {
            cluster[i].body.checkCollision.none = true;
            let row = cluster[i].row;
            let column = cluster[i].column;
            this.bubblesBoard.board[row][column] = undefined;
            cluster[i].score = this.scene.scoreManager.getBallClusterScore();
        }
    }
}