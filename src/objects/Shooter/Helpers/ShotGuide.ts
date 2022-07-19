import DEPTH from "../../../game/constant/Depth";
import { GameScene } from "../../../scenes/GameScene";
import { BubblesBoard } from "../../BubbleBoard/BubblesBoard";
import { CircleGuide } from "../CircleGuide";
import { Shooter } from "../Shooter";

export class ShotGuide {
    private shooter: Shooter;
    private scene: GameScene;
    public circleGuideGroup: Phaser.GameObjects.Group;
    private firstDistance: number;
    private offsetDistance:number;
    private gameWidth:number;
    private gameHeight:number;
    public stopGenrate: boolean;
    private bubblesBoard: BubblesBoard;
    private stopPosition:number;

    constructor(shooter:Shooter, scene:GameScene) {
        this.shooter = shooter;
        this.scene = scene
        this.bubblesBoard = this.scene.bubblesBoard;
        this.circleGuideGroup = this.scene.add.group({classType:CircleGuide});
        this.firstDistance = 26;
        this.offsetDistance = 30;
        this.stopPosition = 30;
        this.stopGenrate = false;
        this.gameWidth = this.scene.sys.canvas.width;
        this.gameHeight = this.scene.sys.canvas.height;
    }

    private activateCircle(circle:CircleGuide) {
        this.scene.physics.world.enable(circle);
        circle.body.checkCollision.none = false;
        circle.setTexture('circleGuide');
        circle.setDepth(DEPTH.GAMEPLAY);
        circle.setOrigin(0.5,0.5);
        circle.setActive(true);
        circle.setAlpha(1);
        circle.setVisible(true);
        circle.setScale(1);
        circle.isOverlap = false;
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

    private rightAngle(arrowAngle:number, x:number, y: number,distance:number,countHitWall:number) {
        let angle = 360 - arrowAngle;
        angle = angle * (Math.PI/180);
        let hitRange = 38;
        let maxCircle = -1;
        let circles = [];
        let beginX = x;
        let beginY = y;
        if(countHitWall == 2) {
            maxCircle = 15;
        }
        while(x < this.gameWidth - this.stopPosition && y >= 0) {
            let offsetX = (distance + this.offsetDistance)*Math.cos(angle);
            let offsetY = (distance + this.offsetDistance)*Math.sin(angle);
            x = x + offsetX;
            y = y - offsetY;
            this.stopGenrate = this.hitBubble(x,y,hitRange);
            if(this.stopGenrate || x >= this.gameWidth - this.stopPosition || maxCircle == 0) {
                if(maxCircle == 0) {
                    this.stopGenrate = true;
                }
                if(x >= this.gameWidth - this.stopPosition) {
                    let posXHitWall = this.gameWidth - 10;
                    let posYHitWall = y - (posXHitWall - x)*Math.tan(angle);
                    let averageDistance = 0;
                    if(countHitWall > 0) {
                        averageDistance = Phaser.Math.Distance.Between(beginX,beginY,posXHitWall,posYHitWall)/circles.length;
                    } else {
                        averageDistance = Phaser.Math.Distance.Between(circles[0].x,circles[0].y,
                            posXHitWall,posYHitWall)/circles.length;
                    }
                    this.resetCirclesPosition(circles,beginX,beginY,countHitWall,averageDistance,angle,false);
                }
                break;
            }
            maxCircle--;
            distance = 0;
            circles.push(this.createCircle(x,y));
        }
        return{x:x,y:y};
    }


    private leftAngle(arrowAngle:number, x:number, y: number,distance:number,countHitWall:number) {
        let angle = arrowAngle - 180;
        angle = angle * (Math.PI/180);
        let hitRange = 38;
        let maxCircle = -1;
        let circles = [];
        let beginX = x;
        let beginY = y;
        if(countHitWall == 2) {
            maxCircle = 15;
        }
        while(x > this.stopPosition && y >= 0) {
            let offsetX = (distance + this.offsetDistance)*Math.cos(angle);
            let offsetY = (distance + this.offsetDistance)*Math.sin(angle);
            x = x - offsetX;
            y = y - offsetY;
            this.stopGenrate = this.hitBubble(x,y,hitRange);
            if(this.stopGenrate || x <= this.stopPosition || maxCircle == 0) {
                if(maxCircle == 0) {
                    this.stopGenrate = true;
                }
                if(x <= this.stopPosition) {
                    let posXHitWall = 10;
                    let posYHitWall = y - (x - posXHitWall)*Math.tan(angle);
                    let averageDistance = 0;
                    if(countHitWall > 0) {
                        averageDistance = Phaser.Math.Distance.Between(beginX,beginY,posXHitWall,posYHitWall)/circles.length;
                    } else {
                        averageDistance = Phaser.Math.Distance.Between(circles[0].x,circles[0].y,
                            posXHitWall,posYHitWall)/circles.length;
                    }
                    this.resetCirclesPosition(circles,beginX,beginY,countHitWall,averageDistance,angle,true);
                }
                break;
            }
            maxCircle--;
            distance = 0;
            circles.push(this.createCircle(x,y));
        }
        return{x:x,y:y};
    }

    private resetCirclesPosition(circles:CircleGuide[],beginX:number,beginY:number,countHitWall:number,averageDistance:number,angle:number,isLeft:boolean) {
        for(let i = 0; i < circles.length; i++) {
            if(i == 0 && countHitWall > 0) {
                if(isLeft)
                    circles[i].x = beginX - averageDistance*Math.cos(angle);
                else 
                    circles[i].x = beginX + averageDistance*Math.cos(angle);
                circles[i].y = beginY - averageDistance*Math.sin(angle);
            } else {
                if(i == 0)
                    continue;
                if(isLeft)
                    circles[i].x = circles[i -1].x - averageDistance*Math.cos(angle);
                else 
                    circles[i].x = circles[i -1].x + averageDistance*Math.cos(angle);
                circles[i].y = circles[i -1].y - averageDistance*Math.sin(angle);
            }
        }
    }

    public run() {
        this.hide();

        this.stopGenrate = false;
        const shooBubble = this.shooter.shootedBubble;
        const arrowShoot = this.shooter.arrowShoot;
        let countHitWall = 0;
        let x = shooBubble.x;
        let y = shooBubble.y;
        let distance = this.firstDistance;
        let arrowAngle = 180 + (180 + arrowShoot.angle);
        let distanceHitWall = 10;

        while(!this.stopGenrate) {
            let postPosition:any;
            if(arrowAngle >= 270) {
                postPosition = this.rightAngle(arrowAngle,x,y,distance,countHitWall);
            }
            else {
                postPosition = this.leftAngle(arrowAngle,x,y,distance,countHitWall);
            }
            x = postPosition.x;
            y = postPosition.y;
            distance = 0;
            if(this.stopGenrate || y < 0) {
                break;
            }
            else {
                if(x >= this.gameWidth - this.stopPosition) {
                    countHitWall++;
                    let angle = 360 - arrowAngle;
                    angle = angle * (Math.PI/180);
                    // save old x and y
                    let saveOldX = x - (this.offsetDistance)*Math.cos(angle);
                    let saveOldY = y + (this.offsetDistance)*Math.sin(angle);
                    // update x and y
                    x = this.gameWidth - distanceHitWall;
                    y = saveOldY - (x - saveOldX)*Math.tan(angle);
                    if(countHitWall == 1)
                        this.createCircle(x,y);
                    // update new angle
                    arrowAngle = 180 + (360 - arrowAngle);
                } else if(x <= this.stopPosition) {
                    countHitWall++;
                    let angle = arrowAngle - 180;
                    angle = angle * (Math.PI/180);
                    // save old x and y
                    let saveOldX = x + (this.offsetDistance)*Math.cos(angle);
                    let saveOldY = y + (this.offsetDistance)*Math.sin(angle);
                    // update x and y
                    x = distanceHitWall;
                    y = saveOldY - (saveOldX - x)*Math.tan(angle);
                    if(countHitWall == 1)
                        this.createCircle(x,y);
                    // update new angle
                    arrowAngle = 360 - (arrowAngle - 180);
                }
            }    
        }
    }

    private createCircle(x:number,y:number):CircleGuide {
        let circle = this.circleGuideGroup.get(x,y,'circleGuide',undefined,true);
        this.activateCircle(circle);
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

    public update() {
        let deleteCircle = false;
        let hitRange = 38;
        let firstCircle = this.circleGuideGroup.getFirst(true);
        if(firstCircle != undefined) {
            if(Phaser.Math.Distance.Between(firstCircle.x,firstCircle.y,this.shooter.shootedBubble.x,this.shooter.shootedBubble.y) > this.firstDistance + this.offsetDistance*2) {
                deleteCircle = true;
            }
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