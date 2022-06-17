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
            let bulletGroup = this.scene.shooter.bulletGroup;
            let gridGroup = this.bubblesBoard.gridGroup;
            shootedBubble.stopPhysics();
            console.log('the before collide check row is: ' + this.bubblesBoard.row);
            const newBubble = this.bubblesBoard.addingManager.fromShoot(bubble,shootedBubble);
            // get from the bullet group to the grid group
            bulletGroup.remove(shootedBubble);
            gridGroup.add(shootedBubble as Bubble);
            // run the clusters
            if(newBubble != undefined)
                this.bubblesBoard.clusters.run(newBubble,true,true);
        })
    }
}