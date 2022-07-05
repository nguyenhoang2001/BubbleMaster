import { GameScene } from "../../../scenes/GameScene";
import { BubblesBoard } from "../../BubbleBoard/BubblesBoard";
import { CircleGuide } from "../CircleGuide";
import { Shooter } from "../Shooter";

export class ShotGuide {
    private shooter: Shooter;
    private scene: GameScene;
    public circleGuideGroup: Phaser.GameObjects.Group;
    private distance: number;
    private offsetDistance:number;
    private gameWidth:number;
    private gameHeight:number;
    public stopGenrate: boolean;
    private bubblesBoard: BubblesBoard;

    constructor(shooter:Shooter, scene:GameScene) {
        this.shooter = shooter;
        this.scene = scene
        this.bubblesBoard = this.scene.bubblesBoard;
        this.circleGuideGroup = this.scene.add.group({classType:CircleGuide});
        this.distance = 56 - 30;
        this.offsetDistance = 28;
        this.stopGenrate = false;
        this.gameWidth = this.scene.sys.canvas.width;
        this.gameHeight = this.scene.sys.canvas.height;
    }

    private activateCircle(circle:CircleGuide) {
        this.scene.physics.world.enable(circle);
        circle.body.checkCollision.none = false;
        circle.setTexture('circleGuide');
        circle.setActive(true);
        circle.setVisible(true);
        circle.setScale(1);
        circle.isOverlap = false;
    }

    private hitBubble(x:number,y:number):boolean {
        let hittedBubble = false;
        for(let i = 0; i < this.bubblesBoard.row; i++) {
            for(let j = 0; j < this.bubblesBoard.column; j++) {
                const bubble = this.bubblesBoard.board[i][j];
                if(bubble != undefined) {
                    if(this.bubblesBoard.isBublleExisting(i,j)) {
                        let bubbleY = bubble.y;
                        let distance = Phaser.Math.Distance.Between(x,y,bubble.x,bubbleY);
                        if(distance <= 38) {
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
        while(x < this.gameWidth - 25 && y >= 0) {
            let offsetX = (distance + range)*Math.cos(angle);
            let offsetY = (distance + range)*Math.sin(angle);
            x = x + offsetX;
            y = y - offsetY;
            this.stopGenrate = this.hitBubble(x,y);
            if(this.stopGenrate || x >= this.gameWidth - 25) {
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
        while(x > 25 && y >= 0) {
            let offsetX = (distance + range)*Math.cos(angle);
            let offsetY = (distance + range)*Math.sin(angle);
            x = x - offsetX;
            y = y - offsetY;
            this.stopGenrate = this.hitBubble(x,y);
            if(this.stopGenrate || x <= 25) {
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
        let distance = this.distance;
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
                if(x >= this.gameWidth - 25) {
                    let angle = 360 - arrowAngle;
                    angle = angle * (Math.PI/180);
                    // save old x and y
                    let saveOldX = x - (range)*Math.cos(angle);
                    let saveOldY = y + (range)*Math.sin(angle);
                    // update x and y
                    x = this.gameWidth - 0;
                    y = saveOldY - (x - saveOldX)*Math.tan(angle);
                    let circle = this.circleGuideGroup.get(x,y,'circleGuide',undefined,true);
                    this.activateCircle(circle);
                    // update new angle
                    arrowAngle = 180 + (360 - arrowAngle);
                } else if(x <= 25) {
                    let angle = arrowAngle - 180;
                    angle = angle * (Math.PI/180);
                    // save old x and y
                    let saveOldX = x + (range)*Math.cos(angle);
                    let saveOldY = y + (range)*Math.sin(angle);
                    // update x and y
                    x = 0;
                    y = saveOldY - (saveOldX - x)*Math.tan(angle);
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
            this.circleGuideGroup.killAndHide(circle);
        })
    }

    public update() {
        this.circleGuideGroup.getChildren().forEach((circle:any) => {
            if(this.hitBubble(circle.x,circle.y)) {
                this.circleGuideGroup.killAndHide(circle);
            }
        })
    }
}