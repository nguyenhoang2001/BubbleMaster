import DEPTH from "../../../../game/constant/Depth";
import { GameScene } from "../../../../scenes/GameScene";
import { Bubble } from "../../../Bubble";
import { ScoreText } from "../../../ScoreText";
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

    private getDelayAnimation(target:Bubble,bubble:Bubble):number {
        let distance = this.bubblesBoard.addingManager.positionHandler.getDistance(target, bubble);
        let delay = 80*distance/56 + 20;
        return delay;
    }

    public runAnimation(cluster:Bubble[]) {
        let delay = 50;
        let target = cluster[0];

        for(let i = 0; i < cluster.length; i++) {
            cluster[i].score = this.scene.scoreManager.getBallClusterScore();
            let tintColor = cluster[i].texture.key;
            cluster[i].on('animationstart', () => {
                cluster[i].setDepth(DEPTH.ANIMATIONEXPLODE);
                cluster[i].setTintColor(tintColor);
            });
            delay = this.getDelayAnimation(target,cluster[i]);
            if(i != 0) { 
                const neighbors = this.bubblesBoard.neighbors.getNeighbors(cluster[i]);
                neighbors.forEach((bubble:Bubble) => {
                    for(let j = 0; j < i; j++) {
                        if(cluster[j].row == bubble.row && cluster[j].column == bubble.column) {
                            if(bubble.delay > delay) {
                                delay = bubble.delay + 60;
                            }
                            break;
                        }
                    }
                });
            }
            cluster[i].delay = delay;
            let scoreText = this.bubblesBoard.scoreGroup.get(cluster[i].x - 20,cluster[i].y - 20,undefined,undefined,true) as ScoreText;
            scoreText.activate(cluster[i].score.toString(),cluster[i]);
            scoreText.showAnimation(delay);

            cluster[i].anims.playAfterDelay('explode',delay);

            cluster[i].on('animationupdate', (animation:any,frame:any,obj:any) => {
                if(frame.index == 5) {
                    if(i == cluster.length - 1) {
                        this.bubblesBoard.floatingBubbles.showAnimation();
                    }
                    this.scene.scoreManager.increaseScore(cluster[i].score);
                    
                }
            });

            cluster[i].on('animationcomplete-explode', () => {
                this.clusters.remains -= 1;
                cluster[i].anims.remove('explode');
                cluster[i].clear();
                this.bubblesBoard.gridGroup.killAndHide(cluster[i]);
                cluster[i].removeAllListeners();
            });

        }
    }

    public clearClusters(cluster:Bubble[]) {
        for(let i = 0; i < cluster.length; i++) {
            cluster[i].body.checkCollision.none = true;
            let row = cluster[i].row;
            let column = cluster[i].column;
            this.bubblesBoard.board[row][column] = undefined;
        }
    }
}