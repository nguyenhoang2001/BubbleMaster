import { GameScene } from "../../scenes/GameScene";
import { Bubble } from "../Bubble";
import { BubblePositionManager } from "./Helpers/BubblePositionManager";
import { Clusters } from "./Helpers/Clusters/Cluster";
import { ColliderManager } from "./Helpers/ColliderManager";
import { FloatingBubbles } from "./Helpers/FloatingBubbles/FloatingBubbles";
import { BubbleNeighbors } from "./Helpers/BubbleNeighbors";
import { BubblesBoardAnimation } from "./BubblesBoardAnimation";
import { FloatingScoreGroup } from "./FloatingScoreGroup";
import { IBubblesBoard } from "src/interfaces/IBubblesBoard";
import { IAddingBubbleBehavior } from "src/interfaces/IAddingBubbleBehavior";
import { AddingBubbleBehavior } from "../../Behaviors/AddingBubbleBehavior";
import { ShootedBubble } from "../ShootedBubble";
import { BubblesBoardState } from "../../game/constant/BubblesBoardState";

export class BubblesBoard implements IBubblesBoard {
    // Helpers
    public colliderManager: ColliderManager;
    public clusters: Clusters;
    public floatingBubbles: FloatingBubbles;
    public positionManager: BubblePositionManager;
    public neighbors: BubbleNeighbors;
    public animation: BubblesBoardAnimation;
    // State
    public state: BubblesBoardState;
    // Behaviors
    private addingBubbleBehavior: IAddingBubbleBehavior;
    // Properties
    public board: (Bubble | undefined)[][];
    public gridGroup: Phaser.GameObjects.Group;
    public scoreGroup: FloatingScoreGroup;
    public row: number;
    public column:number;
    public rowOffSet:number;
    public rowHeight:number;
    public scene: GameScene;
    public x: number;
    public y:number;
    public addSignal: boolean;
    public isUpdating: boolean;
    public offsetDistanceBetweenBubbles: number;

    constructor(scene:GameScene,x:number,y:number,row:number, column:number,rowOffSet:number, rowHeight:number) {
        // Properties
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
        // State
        this.state = BubblesBoardState.Idle;
        // Behaviors
        this.addingBubbleBehavior = new AddingBubbleBehavior(this);
        // Game Objects
        this.neighbors = new BubbleNeighbors(this);
        this.colliderManager = new ColliderManager(this);
        this.floatingBubbles = new FloatingBubbles(this.scene,this);
        this.clusters = new Clusters(this.scene,this);
        this.positionManager = new BubblePositionManager(this);
        this.animation = new BubblesBoardAnimation(this);
        // Init board
        this.drawBubblesBoard();
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

    public drawBubblesBoard() {
        for(let i = 0; i < this.row; i++) {
            for(let j = 0; j < this.column; j++) {
                this.addingBubbleBehavior.addBubble(i,j);
            }
        }
    }

    public addBubbleFromShoot(hittedBubble:Bubble,shootedBubble:ShootedBubble):Bubble|void {
        return this.addingBubbleBehavior.addBubbleFromShoot(hittedBubble,shootedBubble);
    }

    public update(time:number,delta:number) {
        switch(this.state) {
            case BubblesBoardState.AddingBubbleRows: {
                this.updateRow();
                this.addingBubbleBehavior.addMoreBubbleRows(1);
                this.updateRow();
                console.log(JSON.parse(JSON.stringify(this.board)));
                this.state = BubblesBoardState.Idle;
                break;
            }
            default: {
                this.state = BubblesBoardState.Idle;
                let topBubble = this.board[0].find(n=>n);
                if(topBubble != undefined)
                    this.y = topBubble.y;
                this.floatingBubbles.update();
                // this.updateRow();
                break;
            }
        }
    }
}