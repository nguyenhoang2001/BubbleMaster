export class BootScene extends Phaser.Scene {
    private loadingBar: Phaser.GameObjects.Graphics;
    private progressBar: Phaser.GameObjects.Graphics;

    constructor() {
        super({
            key: 'BootScene'
        });
    }

    preload() {
        this.createLoadingGraphics();
        this.load.on(
            'progress',
            (value: number) => {
              this.progressBar.clear();
              this.progressBar.fillStyle(0x88e453, 1);
              this.progressBar.fillRect(
                this.cameras.main.width / 4,
                this.cameras.main.height / 2 - 16,
                (this.cameras.main.width / 2) * value,
                16
              );
            },
            this
        );
        this.load.on(
            'complete',
            () => {
              this.progressBar.destroy();
              this.loadingBar.destroy();

            },
            this
        );
        this.load.pack('preload', './assets/pack.json', 'preload');
    }

    private createLoadingGraphics(): void {
        this.loadingBar = this.add.graphics();
        this.loadingBar.fillStyle(0xffffff, 1);
        this.loadingBar.fillRect(
          this.cameras.main.width / 4 - 2,
          this.cameras.main.height / 2 - 18,
          this.cameras.main.width / 2 + 4,
          20
        );
        this.progressBar = this.add.graphics();
    }


    create() {
      this.registry.set('isGameOver',false);
      this.registry.set('restart',false);
    }

    update (time:number, delta:number): void {
        this.scene.start('GameScene');
        this.scene.start('HudScene');
        this.scene.start('SceneManger', {scenes: [this.scene.get('HudScene'),this.scene.get('GameScene')]});
        this.scene.bringToTop('HudScene');
    }
}