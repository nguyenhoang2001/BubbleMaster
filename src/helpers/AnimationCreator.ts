import { GameScene } from "../scenes/GameScene";

export class AnimationCreator {
    public scene:GameScene;
    
    constructor(scene:GameScene) {
        this.scene = scene;
    }
    
    public createAnimations() {
        this.scene.anims.create({
            key:'explode',
            frames: this.scene.anims.generateFrameNames('gamePlaySet', 
            {   prefix:'animations/grey-explosive/explosive_grey_',
                end:30, 
                zeroPad: 2
            }),
            frameRate: 40
        });
        this.scene.anims.create({
            key:'bombExplode',
            frames: this.scene.anims.generateFrameNames('gamePlaySet',
            {   prefix:'animations/bomb-explosive/bom_explosive_',
                end:22, 
                zeroPad: 2
            }),
            frameRate: 40
        });
        this.scene.anims.create({
            key:'showBomb',
            frames: this.scene.anims.generateFrameNames('gamePlaySet', 
            {   prefix:'animations/bomb/showing-bomb-',
                end:4, 
                zeroPad: 1
            }),
            frameRate: 15
        });
    }
}