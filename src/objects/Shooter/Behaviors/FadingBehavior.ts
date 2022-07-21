import { IShotguide } from "src/interfaces/IShotguide";

export class FadingBehavior {
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