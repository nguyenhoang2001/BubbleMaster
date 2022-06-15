import { GameScene } from "../../scenes/GameScene";
import { AddingBubble } from "./Helpers/AddingBubble/AddingBubble";
import { Bubble } from "../Bubble";
import { BubblePainter } from "./Helpers/BubblePainter";
import { BubblePositionManager } from "./Helpers/BubblePositionManager";
import { Clusters } from "./Helpers/Clusters/Cluster";
import { ColliderManager } from "./Helpers/ColliderManager";
import { FloatingBubbles } from "./Helpers/FloatingBubbles/FloatingBubbles";

export class BubblesBoard {
    // Helpers
    public addingManager!: AddingBubble;
    public colliderBubble!: ColliderManager;
    public clusters!: Clusters;
    public floatingBubbles!: FloatingBubbles;
    public positionManager!: BubblePositionManager;
    public painter!: BubblePainter;
    // Variables
    public board!: Bubble[][];
    public row!: number; // 27 is max
    public column!:number; // 12 is max
    public rowOffSet!:number;
    public rowHeight!:number;
    public scene!: GameScene;
    public x!: number;
    public y!:number;
    public addSignal!: boolean;
    private clustersAndFloatingsRemoved!: boolean;
    private allowAdding!: boolean;
    public isUpdating!: boolean;

    constructor(scene:GameScene,x:number,y:number,row:number, column:number,rowOffSet:number, rowHeight:number) {
        // Variables
        this.x = x;
        this.y = y;
        this.clustersAndFloatingsRemoved = false;
        this.addSignal = false;
        this.allowAdding = false;
        this.isUpdating = false;
        this.scene = scene;
        this.row = row;
        this.column = column;
        this.rowOffSet = rowOffSet;
        this.rowHeight = rowHeight;
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
        // Init board
        this.painter.drawBubblesBoard();
    }

    public isBublleExisting(row:number,column:number):boolean {
        return (this.board[row][column] != undefined && this.board[row][column].visible)
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
        for(let i = this.row - 1; i >= 0; i--) {
            let exit = false;
            for(let j = 0; j < this.column; j++) {
                if(this.isBublleExisting(i,j)) {
                    this.row = this.board[i][j].row + 1;
                    exit = true;
                    break;
                }
            }
            if(exit)
                break;
        }
        this.board.length = this.row;
    }

    private checkingClustersAndFloatings() {
        this.clustersAndFloatingsRemoved = false;
        if(this.clusters.remains <= 0) {
            this.scene.typeGenerator.resetCurrentType();
            this.floatingBubbles.run();
            this.clusters.resetRemains();
            this.clustersAndFloatingsRemoved = true;
            this.updateRow();
        }
        if(this.floatingBubbles.isFloating) {
            this.clustersAndFloatingsRemoved = false;
            if(this.floatingBubbles.remains <= 0) {
                this.scene.typeGenerator.resetCurrentType();
                this.floatingBubbles.resetRemains();
                this.clustersAndFloatingsRemoved = true;
                this.floatingBubbles.isFloating = false
                this.updateRow();
            }
        }
    }

    private moveBubbles(deltaY:number) {
        for(let i = 0; i < this.row; i++) {
            for(let j = 0; j < this.column; j++) {
                if(this.isBublleExisting(i,j)) {
                    this.board[i][j].y += deltaY;
                }
            }
        }
    }

    public update() {
        this.checkingClustersAndFloatings();
        if(this.addSignal) {
            if(!this.clusters.isHavingClusters) {
                this.allowAdding = true;
            } else {
                if(this.clustersAndFloatingsRemoved) {
                    this.allowAdding = true;
                }
            }
            if(this.allowAdding) {
                this.updateRow();
                this.addingManager.moreBubbleRows(3);
                this.addSignal = false;
                this.allowAdding = false;
                this.updateRow();
            }
        }
        this.moveBubbles(0.1);
    }
}