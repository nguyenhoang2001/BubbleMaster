import DEPTH from "../../../game/constant/Depth";
import { GameScene } from "../../../scenes/GameScene";
import { BubblesBoard } from "../../BubbleBoard/BubblesBoard";
import { CircleGuide } from "../CircleGuide";
import { CircleGuideGroup } from "../CircleGuideGroup";
import { Shooter } from "../Shooter";

export class ShotGuide {
    private shooter: Shooter;
    private scene: GameScene;

    private bubblesBoard: BubblesBoard;

    public circleGuideGroup: CircleGuideGroup;

    // Variables
    private firstDistance: number;
    private offsetDistance:number;
    private gameWidth:number;
    public stopGenrate: boolean;
    private stopPosition:number;
    private maxAmountCircle: number;

    constructor(shooter:Shooter, scene:GameScene) {
        this.shooter = shooter;
        this.scene = scene
        this.bubblesBoard = this.scene.bubblesBoard;
        this.circleGuideGroup = new CircleGuideGroup(this.scene);
        this.firstDistance = 2;
        this.offsetDistance = 40;
        this.stopPosition = this.shooter.rectangleBound.x + this.circleGuideGroup.circleRadius;
        this.maxAmountCircle = 35;
        this.stopGenrate = false;
        this.gameWidth = this.scene.sys.canvas.width;
    }

    private hitBubble(x:number,y:number, hitRange:number):boolean {
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

    public draw() {
        this.hide();

        this.stopGenrate = false;
        this.maxAmountCircle = 35;

        let distance = this.firstDistance;
        let arrowAngle = 180 + (180 + this.shooter.arrowShoot.angle);
        let hitRange = 38;
        let x = this.shooter.shootedBubble.x;
        let y = this.shooter.shootedBubble.y;

        while(!this.stopGenrate) {
            let angle = 0;
            if(arrowAngle >= 270) {
                angle = (360 - arrowAngle) * (Math.PI/180);
            }
            else {
                angle = (arrowAngle - 180) * (Math.PI/180);
            }
            while(y >= 0) {
                let offsetX = (distance + this.offsetDistance)*Math.cos(angle);
                let offsetY = (distance + this.offsetDistance)*Math.sin(angle);
                if(arrowAngle >= 270)
                    x = x + offsetX;
                else 
                    x = x - offsetX;
                y = y - offsetY;
                this.stopGenrate = this.hitBubble(x,y,hitRange);
                if(this.stopGenrate || x <= this.stopPosition || x >= this.gameWidth - this.stopPosition || this.maxAmountCircle == 0) {
                    if(this.maxAmountCircle == 0) {
                        this.stopGenrate = true;
                    }
                    break;
                }
                this.maxAmountCircle--;
                distance = 0;
                this.createCircle(x,y);
            }
            if(this.stopGenrate || y < 0) {
                break;
            }
            else {
                let oldX = 0;
                let oldY = 0;
                if(x >= this.gameWidth - this.stopPosition) {
                    let angle = (360 - arrowAngle) * (Math.PI/180);
                    // get old x and y
                    oldX = x - (this.offsetDistance)*Math.cos(angle);
                    oldY = y + (this.offsetDistance)*Math.sin(angle);
                    // update x and y
                    x = this.gameWidth - this.stopPosition;
                    y = oldY - (x - oldX)*Math.tan(angle);
                    // update new angle
                    arrowAngle = 180 + (360 - arrowAngle);
                } else if(x <= this.stopPosition) {
                    let angle = (arrowAngle - 180) * (Math.PI/180);
                    // get old x and y
                    oldX = x + (this.offsetDistance)*Math.cos(angle);
                    oldY = y + (this.offsetDistance)*Math.sin(angle);
                    // update x and y
                    x = this.stopPosition;
                    y = oldY - (oldX - x)*Math.tan(angle);
                    // update new angle
                    arrowAngle = 360 - (arrowAngle - 180);
                }
                distance = -Phaser.Math.Distance.Between(x,y,oldX,oldY);
            }    
        }
    }

    private createCircle(x:number,y:number):CircleGuide {
        let circle = this.circleGuideGroup.getCircleGuide();
        circle.setPosition(x,y);
        circle.setTexture('circleGuide');
        return circle;
    }

    public hide() {
        this.circleGuideGroup.getChildren().forEach((circle:any) => {
            if(circle.active)
                this.circleGuideGroup.killAndHide(circle);
        });
    }

    public fadeOut() {
        this.circleGuideGroup.getChildren().forEach((circle:any) => {
            if(circle.active) {
                circle.setActive(false);
                this.scene.tweens.add({
                    targets:circle,
                    alpha: 0,
                    duration: 100,
                    ease:'Sine',
                    onComplete: () => {
                        this.circleGuideGroup.killAndHide(circle);
                    }
                })
            }
        });
    }

    public update(delta:number) {
        let deleteCircle = false;
        let hitRange = 38;

        this.firstDistance += 70*(delta/1000);
        if(this.firstDistance > 42) {
            this.firstDistance = 2;
        }

        this.circleGuideGroup.getChildren().some((circle:any) => {
            if(circle.active) {
                if(deleteCircle) {
                    this.circleGuideGroup.killAndHide(circle);
                }
                if(this.hitBubble(circle.x,circle.y,hitRange)) {
                    this.circleGuideGroup.killAndHide(circle);
                    deleteCircle = true;
                }
            }
        });
    }
}