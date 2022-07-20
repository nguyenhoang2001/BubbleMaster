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
import { ScoreText } from "../ScoreText";
import { FloatingScoreGroup } from "./FloatingScoreGroup";

export class BubblesBoard {
    // Helpers
    public addingManager: AddingBubble;
    public colliderBubble: ColliderManager;
    public clusters: Clusters;
    public floatingBubbles: FloatingBubbles;
    public positionManager: BubblePositionManager;
    public painter: BubblePainter;
    public neighbors: BubbleNeighbors;
    public hittingAnimation: HittingAnimation;
    // Variables
    public board: (Bubble | undefined)[][];
    public gridGroup: Phaser.GameObjects.Group;
    public scoreGroup: FloatingScoreGroup;
    public row: number; // 27 is max
    public column:number; // 12 is max
    public rowOffSet:number;
    public rowHeight:number;
    public scene: GameScene;
    public x: number;
    public y:number;
    public addSignal: boolean;
    public isUpdating: boolean;
    public offsetDistanceBetweenBubbles: number;
    // public deltaY!: number;

    constructor(scene:GameScene,x:number,y:number,row:number, column:number,rowOffSet:number, rowHeight:number) {
        // Variables
        this.x = x;
        this.y = y;
        this.offsetDistanceBetweenBubbles = 1.5;
        this.addSignal = false;
        this.isUpdating = false;
        this.scene = scene;
        this.row = row;
        this.column = column;
        this.rowOffSet = rowOffSet;
        this.rowHeight = rowHeight;
        this.gridGroup = this.scene.add.group({classType:Bubble});
        this.scoreGroup = new FloatingScoreGroup(this.scene);
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
        for(let i = 0; i < this.row*this.column; i++)
            this.scoreGroup.create(0,0,undefined,undefined,false,false);
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

    public update(time:number,delta:number) {
        let topBubble = this.board[0].find(n=>n);
        if(topBubble != undefined)
            this.y = topBubble.y;

        if(this.addSignal) {
            this.updateRow();
            this.addingManager.moreBubbleRows(1);
            this.addSignal = false;
            this.updateRow();
            console.log(JSON.parse(JSON.stringify(this.board)));
        }
        this.floatingBubbles.update();
        this.updateRow();
    }
}