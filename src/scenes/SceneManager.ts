export class SceneManager extends Phaser.Scene {
    private scenes!: Phaser.Scene[];

    constructor() {
        super('SceneManger');
    }

    public init(data:any) {
        this.scenes =  data.scenes;
    }

    public update(time: number, delta: number): void {
        let restart = this.registry.get('restart');
        if(restart) {
            this.scenes.forEach((scene:Phaser.Scene) => {
                scene.scene.restart();
            })
            this.registry.set('restart', false);
            this.registry.set('isGameOver', false);
        }
    }
}