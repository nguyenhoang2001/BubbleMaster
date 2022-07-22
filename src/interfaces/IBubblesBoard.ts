import { Bubble } from "src/objects/Bubble";
import { BubblesBoardAnimation } from "src/objects/BubbleBoard/BubblesBoardAnimation";
import { FloatingScoreGroup } from "src/objects/BubbleBoard/FloatingScoreGroup";
import { BubblePositionManager } from "src/objects/BubbleBoard/Helpers/BubblePositionManager";
import { Clusters } from "src/objects/BubbleBoard/Helpers/Clusters/Cluster";
import { ShootedBubble } from "src/objects/ShootedBubble";
import { GameScene } from "src/scenes/GameScene";

export interface IBubblesBoard {
    scene: GameScene;
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
    updateRow(): void;
    invertRowOffset(): void;
    isBublleExisting(row:number,column:number): boolean;
    addBubbleFromShoot(hittedBubble:Bubble,shootedBubble:ShootedBubble):Bubble|void;
}