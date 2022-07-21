import ShotguideState from "src/game/constant/ShotguideState";
import { IShotguide } from "src/interfaces/IShotguide";
import DEPTH from "../../game/constant/Depth";
import { GameScene } from "../../scenes/GameScene";
import { BubblesBoard } from "../BubbleBoard/BubblesBoard";
import { AppearingBehavior } from "./Behaviors/AppearingBehavior";
import { FadingBehavior } from "./Behaviors/FadingBehavior";
import { CircleGuideGroup } from "./CircleGuideGroup";
import { Shooter } from "./Shooter";

export class ShotGuide implements IShotguide {

    private shooter: Shooter;
    public scene: GameScene;
    private bubblesBoard: BubblesBoard;
    // State
    public state: ShotguideState;
    // Behaviors
    private appearingBehavior: AppearingBehavior;
    private fadingBehavior: FadingBehavior;
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
        this.appearingBehavior = new AppearingBehavior(this);
        this.fadingBehavior = new FadingBehavior(this);
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

    public checkHitBubble(x:number,y:number, hitRange:number):boolean {
        let hittedBubble = false;
        for(let i = this.bubblesBoard.row - 1; i >= 0; i--) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                const bubble = this.bubblesBoard.board[i][j];
                if(bubble != undefined) {
                    if(this.bubblesBoard.isBublleExisting(i,j)) {
                        let bubbleY = bubble.y;
                        let distance = Phaser.Math.Distance.Between(x,y,bubble.x,bubbleY);
                        if(distance <= hitRange) {
                            hittedBubble = true;
                            break;
                        }
                    }
                }
            }
            if(hittedBubble)
                break;
        }
        return hittedBubble;
    }

    public createCircleGuide(x:number,y:number) {
        let circle = this.circleGuideGroup.getCircleGuide();
        circle.setPosition(x,y);
        circle.setTexture('circleGuide');
    }

    public clear() {
        this.circleGuideGroup.getChildren().forEach((circle:any) => {
            if(circle.active)
                this.circleGuideGroup.killAndHide(circle);
        });
    }

    public update(delta:number) {
        switch(this.state) {
            case ShotguideState.Appearing: {
                this.firstDistance += 70*(delta/1000);
                if(this.firstDistance > 42) {
                    this.firstDistance = 2;
                }
                let arrowAngle = 180 + (180 + this.shooter.arrowShoot.angle);
                this.appearingBehavior.appear(this.shooter.shootedBubble.x,this.shooter.shootedBubble.y,arrowAngle);
                this.state = ShotguideState.Idle;
                break;
            }
            case ShotguideState.Fading: {
                this.fadingBehavior.fade();
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