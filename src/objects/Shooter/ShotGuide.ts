import ShotguideState from "src/game/constant/ShotguideState";
import { IAppearingShotguideBehavior } from "src/interfaces/IAppearingShotguideBehavior";
import { ICheckingShotguideHitGridBehavior } from "src/interfaces/ICheckingShotguideHitGridBehavior";
import { IClearingShotguideBehavior } from "src/interfaces/IClearingShotguideBehavior";
import { IFadingShotguideBehavior } from "src/interfaces/IFadingShotguideBehavior";
import { IShotguide } from "src/interfaces/IShotguide";
import DEPTH from "../../game/constant/Depth";
import { GameScene } from "../../scenes/GameScene";
import { BubblesBoard } from "../BubbleBoard/BubblesBoard";
import { AppearingShotguideBehavior } from "../../Behaviors/AppearingShotguideBehavior";
import { CheckingShotguideHitGridBehavior } from "../../Behaviors/CheckingShotguideHitGridBehavior";
import { ClearingShotguideBehavior } from "../../Behaviors/ClearingShotguideBehavior";
import { FadingShotguideBehavior } from "../../Behaviors/FadingShotguideBehavior";
import { CircleGuideGroup } from "./CircleGuideGroup";
import { Shooter } from "./Shooter";

export class ShotGuide implements IShotguide {

    private shooter: Shooter;
    public scene: GameScene;
    private bubblesBoard: BubblesBoard;
    // State
    public state: ShotguideState;
    // Behaviors
    private appearingShotguideBehavior: IAppearingShotguideBehavior;
    private fadingShotguideBehavior: IFadingShotguideBehavior;
    private clearingShotguideBehavior: IClearingShotguideBehavior;
    private checkingShotguideHitGridBehavior: ICheckingShotguideHitGridBehavior;
    // Properties
    public circleGuideGroup: CircleGuideGroup;
    public firstDistance: number;
    public offsetDistance:number;
    public gameWidth:number;
    public stopGenerate: boolean;
    public stopPosition:number;
    public maxAmountCircle: number;

    constructor(shooter:Shooter, scene:GameScene) {
        this.shooter = shooter;
        this.scene = scene;
        // State
        this.state = ShotguideState.Idle;
        // Behaviors
        this.appearingShotguideBehavior = new AppearingShotguideBehavior(this);
        this.fadingShotguideBehavior = new FadingShotguideBehavior(this);
        this.clearingShotguideBehavior = new ClearingShotguideBehavior(this);
        this.checkingShotguideHitGridBehavior = new CheckingShotguideHitGridBehavior(this);
        // Properties
        this.bubblesBoard = this.scene.bubblesBoard;
        this.circleGuideGroup = new CircleGuideGroup(this.scene);
        this.firstDistance = 2;
        this.offsetDistance = 40;
        this.stopPosition = this.shooter.rectangleBound.x + this.circleGuideGroup.circleRadius;
        this.maxAmountCircle = 35;
        this.stopGenerate = false;
        this.gameWidth = this.scene.sys.canvas.width;
    }

    public checkHitGrid(x:number,y:number, hitRange:number): boolean {
        return this.checkingShotguideHitGridBehavior.check(x,y,hitRange,this.bubblesBoard);
    }

    public clearShotguide() {
        this.clearingShotguideBehavior.clear();
    }

    public update(delta:number) {
        switch(this.state) {
            case ShotguideState.Appearing: {
                this.firstDistance += 70*(delta/1000);
                if(this.firstDistance > 42) {
                    this.firstDistance = 2;
                }
                let arrowAngle = 180 + (180 + this.shooter.arrowShoot.angle);
                this.clearingShotguideBehavior.clear();
                this.appearingShotguideBehavior.appear(this.shooter.shootedBubble.x,this.shooter.shootedBubble.y,arrowAngle);
                this.state = ShotguideState.Idle;
                break;
            }
            case ShotguideState.Fading: {
                this.fadingShotguideBehavior.fade();
                this.state = ShotguideState.Idle;
                break;
            }
            default: {
                this.state = ShotguideState.Idle;
                break;
            }
        }
    }
}