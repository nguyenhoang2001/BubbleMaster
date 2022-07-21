import { IAppearingShotguideBehavior } from "src/interfaces/IAppearingShotguideBehavior";
import { IShotguide } from "src/interfaces/IShotguide";

export class AppearingShotguideBehavior implements IAppearingShotguideBehavior {
    private parent: IShotguide;

    constructor(parent:IShotguide) {
        this.parent = parent;
    }

    private createCircleGuide(x:number,y:number) {
        let circle = this.parent.circleGuideGroup.getCircleGuide();
        circle.setPosition(x,y);
        circle.setTexture('circleGuide');
    }

    public appear(bulletX:number,bulletY:number,arrowAngle:number) {
        this.parent.stopGenerate = false;
        this.parent.maxAmountCircle = 35;

        let distance = this.parent.firstDistance;
        let hitRange = 38;
        let x = bulletX;
        let y = bulletY;

        while(!this.parent.stopGenerate) {
            let angle = 0;
            if(arrowAngle >= 270) {
                angle = (360 - arrowAngle) * (Math.PI/180);
            }
            else {
                angle = (arrowAngle - 180) * (Math.PI/180);
            }
            while(y >= 0) {
                let offsetX = (distance + this.parent.offsetDistance)*Math.cos(angle);
                let offsetY = (distance + this.parent.offsetDistance)*Math.sin(angle);
                if(arrowAngle >= 270)
                    x = x + offsetX;
                else 
                    x = x - offsetX;
                y = y - offsetY;
                this.parent.stopGenerate = this.parent.checkHitGrid(x,y,hitRange);
                if(this.parent.stopGenerate || x <= this.parent.stopPosition || x >= this.parent.gameWidth - this.parent.stopPosition 
                    || this.parent.maxAmountCircle == 0) {
                    if(this.parent.maxAmountCircle == 0) {
                        this.parent.stopGenerate = true;
                    }
                    break;
                }
                this.parent.maxAmountCircle--;
                distance = 0;
                this.createCircleGuide(x,y);
            }
            if(this.parent.stopGenerate || y < 0) {
                break;
            }
            else {
                let oldX = 0;
                let oldY = 0;
                if(x >= this.parent.gameWidth - this.parent.stopPosition) {
                    let angle = (360 - arrowAngle) * (Math.PI/180);
                    // get old x and y
                    oldX = x - (this.parent.offsetDistance)*Math.cos(angle);
                    oldY = y + (this.parent.offsetDistance)*Math.sin(angle);
                    // update x and y
                    x = this.parent.gameWidth - this.parent.stopPosition;
                    y = oldY - (x - oldX)*Math.tan(angle);
                    // update new angle
                    arrowAngle = 180 + (360 - arrowAngle);
                } else if(x <= this.parent.stopPosition) {
                    let angle = (arrowAngle - 180) * (Math.PI/180);
                    // get old x and y
                    oldX = x + (this.parent.offsetDistance)*Math.cos(angle);
                    oldY = y + (this.parent.offsetDistance)*Math.sin(angle);
                    // update x and y
                    x = this.parent.stopPosition;
                    y = oldY - (oldX - x)*Math.tan(angle);
                    // update new angle
                    arrowAngle = 360 - (arrowAngle - 180);
                }
                distance = -Phaser.Math.Distance.Between(x,y,oldX,oldY);
            }    
        }
    }
}