import { Bubble } from "./Bubble";

export class FloatingHandler {
    private scene!: Phaser.Scene;

    constructor(scene:Phaser.Scene) {
        this.scene = scene;
    }

    public clearFloating(floatingBubbles:Bubble[]) {
        for(let i = 0; i< floatingBubbles.length; i++) {
            this.scene.tweens.add({
                targets:floatingBubbles[i],
                y: floatingBubbles[i].y - 200,
                ease:'Cubic.easeOut',
                delay:50,
                duration: Phaser.Math.Between(250, 500),
                onComplete: () => {
                    this.scene.tweens.add({
                        targets:floatingBubbles[i],
                        y: this.scene.sys.canvas.height + 28,
                        ease:'Cubic.easeIn',
                        duration: Phaser.Math.Between(400, 800),
                        onComplete: () => {
                            floatingBubbles[i].clear();
                        }
                    });
                }
            });

        }
    }
}