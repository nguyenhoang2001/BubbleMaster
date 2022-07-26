import { IClearingShotguideBehavior } from "src/interfaces/behaviors/IClearingShotguideBehavior";
import { IShotguide } from "src/interfaces/objects/IShotguide";


export class ClearingShotguideBehavior implements IClearingShotguideBehavior {
    private parent: IShotguide;

    constructor(parent:IShotguide) {
        this.parent = parent;
    }

    public clear() {
        this.parent.circleGuideGroup.getChildren().forEach((circle:any) => {
            if(circle.active)
                this.parent.circleGuideGroup.killAndHide(circle);
        });
    }
}