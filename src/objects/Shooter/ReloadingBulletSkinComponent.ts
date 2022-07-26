import { ReloadingBulletSkinBehavior } from "../../Behaviors/ReloadingBulletSkinBehavior";
import { IShooter } from "src/interfaces/objects/IShooter";
import { IReloadingBulletSkinComponent } from "src/interfaces/objects/IReloadingBulletSkinComponent";
import { IReloadingBulletSkinBehavior } from "src/interfaces/behaviors/IReloadingBulletSkinBehavior";

export class ReloadingBulletSkinComponent implements IReloadingBulletSkinComponent {
    private parent: IShooter;
    private reloadingBulletSkinBehavior: IReloadingBulletSkinBehavior;

    constructor(parent:IShooter) {
        this.parent = parent;
        this.reloadingBulletSkinBehavior = new ReloadingBulletSkinBehavior(this.parent);
    }
    public reload(): void {
        this.reloadingBulletSkinBehavior.reload();
    }
}