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

export class BubblesBoard {
    // Helpers
    public addingManager!: AddingBubble;
    public colliderBubble!: ColliderManager;
    public clusters!: Clusters;
    public floatingBubbles!: FloatingBubbles;
    public positionManager!: BubblePositionManager;
    public painter!: BubblePainter;
    public neighbors: BubbleNeighbors;
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
        this.addingManager = new AddingBubble(this);
        this.colliderBubble = new ColliderManager(this);
        this.floatingBubbles = new FloatingBubbles(this.scene,this);
        this.clusters = new Clusters(this.scene,this);
        this.positionManager = new BubblePositionManager(this);
        this.painter = new BubblePainter(this);
        this.neighbors = new BubbleNeighbors(this);
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
        if(this.clusters.remains <= 0) {
            this.updateRow();
            this.floatingBubbles.run();
            this.clusters.resetRemains();
            this.clusters.isHavingClusters = false;
        }
        if(this.floatingBubbles.isFloating) {
            if(this.floatingBubbles.remains <= 0) {
                this.updateRow();
                this.floatingBubbles.resetRemains();
                this.floatingBubbles.isFloating = false;
            }
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
            console.log(this.board);
        }
        if(this.colliderBubble.isCollide) {
            this.colliderBubble.runCollide();
        }
        this.checkingClusters();
        this.moveBubbles(0.1);
    }
}