import { GameScene } from "../../scenes/GameScene";
import { AddingBubble } from "./Helpers/AddingBubble/AddingBubble";
import { Bubble } from "../Bubble";
import { BubblePainter } from "./Helpers/BubblePainter";
import { BubblePositionManager } from "./Helpers/BubblePositionManager";
import { Clusters } from "./Helpers/Clusters/Cluster";
import { ColliderManager } from "./Helpers/ColliderManager";
import { FloatingBubbles } from "./Helpers/FloatingBubbles/FloatingBubbles";
import { ShootedBubble } from "../ShootedBubble";
import { BubbleNeighbors } from "./Helpers/BubbleNeighbors";
import { HittingAnimation } from "./HittingAnimation";

export class BubblesBoard {
    // Helpers
    public addingManager!: AddingBubble;
    public colliderBubble!: ColliderManager;
    public clusters!: Clusters;
    public floatingBubbles!: FloatingBubbles;
    public positionManager!: BubblePositionManager;
    public painter!: BubblePainter;
    public neighbors: BubbleNeighbors;
    public hittingAnimation!: HittingAnimation;
    // Variables
    public board!: (Bubble | undefined)[][];
    public gridGroup!: Phaser.GameObjects.Group;
    public row!: number; // 27 is max
    public column!:number; // 12 is max
    public rowOffSet!:number;
    public rowHeight!:number;
    public scene!: GameScene;
    public x!: number;
    public y!:number;
    public addSignal!: boolean;
    public isUpdating!: boolean;
    public deltaY!: number;

    constructor(scene:GameScene,x:number,y:number,row:number, column:number,rowOffSet:number, rowHeight:number) {
        // Variables
        this.x = x;
        this.y = y;
        this.deltaY = 0;
        this.addSignal = false;
        this.isUpdating = false;
        this.scene = scene;
        this.row = row;
        this.column = column;
        this.rowOffSet = rowOffSet;
        this.rowHeight = rowHeight;
        this.gridGroup = this.scene.add.group({classType:Bubble});
        this.board = [];
        for(let i = 0; i < this.row; i++) {
            this.board[i] = []
        }
        // Game Objects
        this.neighbors = new BubbleNeighbors(this);
        this.addingManager = new AddingBubble(this);
        this.colliderBubble = new ColliderManager(this);
        this.floatingBubbles = new FloatingBubbles(this.scene,this);
        this.clusters = new Clusters(this.scene,this);
        this.positionManager = new BubblePositionManager(this);
        this.painter = new BubblePainter(this);
        this.hittingAnimation = new HittingAnimation(this);
        // Init board
        this.painter.drawBubblesBoard();
    }

    public isBublleExisting(row:number,column:number):boolean {
        const object = this.board[row][column]
        return (object != undefined && object.visible && object.active)
    }

    public addNewRow() {
        this.board[this.row] = [];
        this.row += 1;
    }

    public invertRowOffset() {
        if(this.rowOffSet == 0)
            this.rowOffSet = 1;
        else
            this.rowOffSet = 0;
    }

    public updateRow() {
        let maxRow = 0;
        for(let i = 0; i < this.row; i++) {
            for(let j = 0; j < this.column; j++) {
                const object = this.board[i][j];
                if (object == undefined) 
                    continue;
                if(this.isBublleExisting(i,j)) {
                    if(maxRow < object.row) {
                        maxRow = object.row;
                    }
                }
            }
        }
        this.row = maxRow + 1;
        this.board.length = this.row;
    }

    private checkingClusters() {
        if(this.clusters.isHavingClusters && this.clusters.clustersFinish) {
            this.floatingBubbles.run();
            this.clusters.checkingFinish = true;
            this.updateRow();
        }
    }

    private moveBubbles(delta:number) {
        this.scene.bubblesContainer.y += delta;
        this.y += delta;
        this.deltaY += delta;
    }

    public update() {
        if(this.addSignal) {
            this.updateRow();
            this.addingManager.moreBubbleRows(3);
            this.addSignal = false;
            this.updateRow();
            console.log(JSON.parse(JSON.stringify(this.board)));
        }
        if(this.colliderBubble.isCollide) {
            const bubble = this.colliderBubble.runCollide();
            if(bubble != undefined) {
                this.hittingAnimation.run(bubble);
                this.clusters.run(bubble,true,true);
            }
        }
        this.clusters.update();
        this.floatingBubbles.update();
        this.checkingClusters();
        this.moveBubbles(0.1);
    }
}