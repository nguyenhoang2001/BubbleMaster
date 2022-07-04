import { GameScene } from "../../../scenes/GameScene";
import { Shooter } from "../Shooter";

export class AnimationShooter {
    public scene!: GameScene;
    private shooter!: Shooter;


    constructor(shooter:Shooter, scene:GameScene) {
        this.shooter = shooter;
        this.scene = scene;
    }

    public createAnimationForCircle() {
        let arrows = this.scene.add.image(0,0,'arrows').setAlpha(0);
        Phaser.Display.Align.In.Center(arrows,this.shooter.circle);
        this.scene.tweens.add({
            targets:arrows,
            angle: '-= 160',
            repeatDelay: 4000,
            duration: 2000,
            ease: 'Sine',
            repeat: -1
        });
        this.scene.tweens.add({
            targets: arrows,
            repeat: -1,
            repeatDelay: 4000,
            yoyo:true,
            alpha: 1,
            ease:'Sine',
            duration: 1000
        });
    }
}