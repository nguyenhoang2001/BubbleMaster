import { IFadingShotguideBehavior } from "src/interfaces/behaviors/IFadingShotguideBehavior";
import { IShotguide } from "src/interfaces/objects/IShotguide";


export class FadingShotguideBehavior implements IFadingShotguideBehavior {
    private parent: IShotguide;

    constructor(parent:IShotguide) {
        this.parent = parent;
    }

    public fade() {
        this.parent.circleGuideGroup.getChildren().forEach((circle:any) => {
            if(circle.active) {
                circle.setActive(false);
                this.parent.scene.tweens.add({
                    targets:circle,
                    alpha: 0,
                    duration: 100,
                    ease:'Sine',
                    onComplete: () => {
                        this.parent.circleGuideGroup.killAndHide(circle);
                    }
                })
            }
        });
    }
}