import { ReloadingBulletSkinBehavior } from "../../Behaviors/ReloadingBulletSkinBehavior";
import { IReloadingBulletSkinBehavior } from "src/interfaces/IReloadingBulletSkinBehavior";
import { IReloadingBulletSkinComponent } from "src/interfaces/IReloadingBulletSkinComponent";
import { IShooter } from "src/interfaces/IShooter";

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