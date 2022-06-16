import { GameScene } from "../../../scenes/GameScene";
import { Bubble } from "../../Bubble";
import { ShootedBubble } from "../../ShootedBubble";
import { BubblesBoard } from "../BubblesBoard";


export class ColliderManager {
    public bubblesBoard!: BubblesBoard;
    public scene!: GameScene;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
    }

    public gridGroupAndBulletGroup() {
        this.scene.physics.add.collider(this.bubblesBoard.gridGroup,this.scene.shooter.bulletGroup,(_bubble:any,_shootedBubble:any) => {
            let bubble = _bubble as Bubble;
            let shootedBubble = _shootedBubble as ShootedBubble;
            shootedBubble.stopPhysics();
            let bulletGroup = this.scene.shooter.bulletGroup;
            let gridGroup = this.bubblesBoard.gridGroup;
            let newBubble = this.bubblesBoard.addingManager.fromShoot(bubble,shootedBubble);
            // get from the bullet group to the grid group
            bulletGroup.remove(shootedBubble);
            gridGroup.add(shootedBubble);
            // check adding signal but need to change this
            if(this.bubblesBoard.scene.shooter.shootTenTimes) {
                this.bubblesBoard.addSignal = true;
            }
            // run the clusters
            this.bubblesBoard.clusters.run(newBubble,true,true);
        })
    }
}