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
        this.offsetDistance = 28;
        this.stopPosition = 17;
        this.stopGenrate = false;
        this.gameWidth = this.scene.sys.canvas.width;
        this.gameHeight = this.scene.sys.canvas.height;
    }

    private activateCircle(circle:CircleGuide) {
        this.scene.physics.world.enable(circle);
        circle.body.checkCollision.none = false;
        circle.setTexture('circleGuide');
        circle.setDepth(DEPTH.GAMEPLAY);
        circle.setActive(true);
        circle.setAlpha(1);
        circle.setVisible(true);
        circle.setScale(1);
        circle.isOverlap = false;
    }

    private hitBubble(x:number,y:number, hitRange:number):boolean {
        let hittedBubble = false;
        for(let i = 0; i < this.bubblesBoard.row; i++) {
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

    private rightAngle(arrowAngle:number, x:number, y: number,distance:number, range:number) {
        let angle = 360 - arrowAngle;
        angle = angle * (Math.PI/180);
        let hitRange = 38;

        while(x < this.gameWidth - this.stopPosition && y >= 0) {
            let offsetX = (distance + range)*Math.cos(angle);
            let offsetY = (distance + range)*Math.sin(angle);
            x = x + offsetX;
            y = y - offsetY;
            this.stopGenrate = this.hitBubble(x,y,hitRange);
            if(this.stopGenrate || x >= this.gameWidth - this.stopPosition) {
                break;
            }
            distance = 0;
            let circle = this.circleGuideGroup.get(x,y,'circleGuide',undefined,true);
            this.activateCircle(circle);
        }
        return{x:x,y:y};
    }


    private leftAngle(arrowAngle:number, x:number, y: number,distance:number, range:number) {
        let angle = arrowAngle - 180;
        angle = angle * (Math.PI/180);
        let hitRange = 38;

        while(x > this.stopPosition && y >= 0) {
            let offsetX = (distance + range)*Math.cos(angle);
            let offsetY = (distance + range)*Math.sin(angle);
            x = x - offsetX;
            y = y - offsetY;
            this.stopGenrate = this.hitBubble(x,y,hitRange);
            if(this.stopGenrate || x <= this.stopPosition) {
                break;
            }
            distance = 0;
            let circle = this.circleGuideGroup.get(x,y,'circleGuide',undefined,true);
            this.activateCircle(circle);
        }
        return{x:x,y:y};
    }


    public run() {
        this.hide();
        this.stopGenrate = false;
        const shooBubble = this.shooter.shootedBubble;
        const arrowShoot = this.shooter.arrowShoot;
        let x = shooBubble.x;
        let y = shooBubble.y;
        let range = this.offsetDistance;
        let distance = this.firstDistance;
        let arrowAngle = 180 + (180 + arrowShoot.angle);
        while(!this.stopGenrate) {
            let postPosition:any;
            if(arrowAngle >= 270) {
                postPosition = this.rightAngle(arrowAngle,x,y,distance,range);
            }
            else {
                postPosition = this.leftAngle(arrowAngle,x,y,distance,range);
            }
            x = postPosition.x;
            y = postPosition.y;
            distance = 0;
            if(this.stopGenrate || y < 0) {
                break;
            }
            else {
                if(x >= this.gameWidth - this.stopPosition) {
                    let angle = 360 - arrowAngle;
                    angle = angle * (Math.PI/180);
                    // save old x and y
                    let saveOldX = x - (range)*Math.cos(angle);
                    let saveOldY = y + (range)*Math.sin(angle);
                    // update x and y
                    x = this.gameWidth - 10;
                    y = saveOldY - (x - saveOldX)*Math.tan(angle);
                    distance = Phaser.Math.Distance.Between(x,y,saveOldX,saveOldY) - this.offsetDistance;
                    let circle = this.circleGuideGroup.get(x,y,'circleGuide',undefined,true);
                    this.activateCircle(circle);
                    // update new angle
                    arrowAngle = 180 + (360 - arrowAngle);
                } else if(x <= this.stopPosition) {
                    let angle = arrowAngle - 180;
                    angle = angle * (Math.PI/180);
                    // save old x and y
                    let saveOldX = x + (range)*Math.cos(angle);
                    let saveOldY = y + (range)*Math.sin(angle);
                    // update x and y
                    x = 10;
                    y = saveOldY - (saveOldX - x)*Math.tan(angle);
                    distance = Phaser.Math.Distance.Between(x,y,saveOldX,saveOldY) - this.offsetDistance;
                    let circle = this.circleGuideGroup.get(x,y,'circleGuide',undefined,true);
                    this.activateCircle(circle);
                    // update new angle
                    arrowAngle = 360 - (arrowAngle - 180);
                }
            }    
        }
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
        let hitRange = 40;
        let firstCircle = this.circleGuideGroup.getFirst(true);
        if(firstCircle != undefined) {
            if(Phaser.Math.Distance.Between(firstCircle.x,firstCircle.y,this.shooter.shootedBubble.x,this.shooter.shootedBubble.y) > this.firstDistance + this.offsetDistance) {
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