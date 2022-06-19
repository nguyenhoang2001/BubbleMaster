import { GameScene } from "../../../scenes/GameScene";
import { Bubble } from "../../Bubble";
import { ShootedBubble } from "../../ShootedBubble";
import { BubblesBoard } from "../BubblesBoard";

export class ColliderManager {
    public bubblesBoard!: BubblesBoard;
    public scene!: GameScene;
    public isCollide!: boolean;
    private shootedBubble!: ShootedBubble;
    private hittedBubble!: Bubble;

    constructor(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
        this.scene = this.bubblesBoard.scene;
        this.isCollide = false;
    }

    public gridGroupAndBulletGroup() {
        this.scene.physics.add.collider(this.bubblesBoard.gridGroup,this.scene.shooter.bulletGroup,(_bubble:any,_shootedBubble:any) => {
            if(!this.isCollide) {
                this.shootedBubble = _shootedBubble as ShootedBubble;
                this.hittedBubble = _bubble as Bubble;
                let bulletGroup = this.scene.shooter.bulletGroup;
                let gridGroup = this.bubblesBoard.gridGroup;
                // get from the bullet group to the grid group
                bulletGroup.remove(this.shootedBubble);
                gridGroup.add(this.shootedBubble as Bubble);
                this.isCollide = true;
            }
        })
    }

    public runCollide() {
        this.shootedBubble.stopPhysics();
        const newBubble = this.bubblesBoard.addingManager.fromShoot(this.hittedBubble,this.shootedBubble);
        this.bubblesBoard.updateRow();
        // run the clusters
        if(newBubble != undefined) {
            this.bubblesBoard.clusters.run(newBubble,true,true);
        }
        this.isCollide = false;
    }
}