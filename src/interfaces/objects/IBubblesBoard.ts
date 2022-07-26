import { Bubble } from "src/objects/Bubble";
import { BubblesBoardAnimation } from "src/objects/BubbleBoard/BubblesBoardAnimation";
import { FloatingScoreGroup } from "src/objects/BubbleBoard/FloatingScoreGroup";
import { BubbleNeighbors } from "src/objects/BubbleBoard/BubbleNeighbors";
import { BubblePositionManager } from "src/objects/BubbleBoard/BubblePositionManager";
import { Clusters } from "src/objects/BubbleBoard/Clusters/Cluster";
import { FloatingBubbles } from "src/objects/BubbleBoard/FloatingBubbles/FloatingBubbles";
import { ShootedBubble } from "src/objects/ShootedBubble";
import { GameScene } from "src/scenes/GameScene";
import { BubblesBoardState } from "src/game/constant/BubblesBoardState";

export interface IBubblesBoard {
    neighbors: BubbleNeighbors;
    scene: GameScene;
    state: BubblesBoardState;
    board: (Bubble | undefined)[][];
    gridGroup: Phaser.GameObjects.Group;
    scoreGroup: FloatingScoreGroup;
    row: number;
    column:number;
    rowOffSet:number;
    rowHeight:number;
    x: number;
    y:number;
    addSignal: boolean;
    isUpdating: boolean;
    offsetDistanceBetweenBubbles: number;
    positionManager: BubblePositionManager;
    animation: BubblesBoardAnimation;
    clusters: Clusters;
    floatingBubbles: FloatingBubbles,
    updateRow(): void;
    invertRowOffset(): void;
    isBublleExisting(row:number,column:number): boolean;
    addBubbleFromShoot(hittedBubble:Bubble,shootedBubble:ShootedBubble):Bubble|void;
}