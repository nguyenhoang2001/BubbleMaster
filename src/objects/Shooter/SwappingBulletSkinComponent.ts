import { SwapingBulletSkinBehavior } from "../../Behaviors/SwappingBulletSkinBehavior";
import { IShooter } from "src/interfaces/objects/IShooter";
import { ISwappingBulletSkinComponent } from "src/interfaces/objects/ISwappingBulletSkinComponent";
import { ISwappingBulletSkinBehavior } from "src/interfaces/behaviors/ISwappingBulletSkinBehavior";

export class SwappingBulletSkinComponent implements ISwappingBulletSkinComponent {
    private parent: IShooter;
    private swappingSkinBehavior: ISwappingBulletSkinBehavior;

    constructor(parent:IShooter) {
        this.parent = parent;
        this.swappingSkinBehavior = new SwapingBulletSkinBehavior(this.parent);
    }

    public swap() {
        this.swappingSkinBehavior.swap();
    }
}