import { SwapingBulletSkinBehavior } from "../../Behaviors/SwappingBulletSkinBehavior";
import { IShooter } from "src/interfaces/IShooter";
import { ISwappingBulletSkinBehavior } from "src/interfaces/ISwappingBulletSkinBehavior";
import { ISwappingBulletSkinComponent } from "src/interfaces/ISwappingBulletSkinComponent";

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