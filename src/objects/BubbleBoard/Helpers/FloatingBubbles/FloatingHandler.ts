import { Bubble } from "../../../Bubble";
import { FloatingBubbles } from "./FloatingBubbles";

export class FloatingHandler {
    private scene!: Phaser.Scene;
    private floatingBubbles!: FloatingBubbles;

    constructor(scene:Phaser.Scene,floatingBubbles:FloatingBubbles) {
        this.scene = scene;
        this.floatingBubbles = floatingBubbles;
    }

    public clearFloating(floatingBubbles:Bubble[]) {
        for(let i = 0; i< floatingBubbles.length; i++) {
            floatingBubbles[i].body.checkCollision.none = true;
            this.scene.tweens.add({
                targets:floatingBubbles[i],
                y: floatingBubbles[i].y - 200,
                ease:'Cubic.easeOut',
                duration: 300,
                onComplete: () => {
                    this.scene.tweens.add({
                        targets:floatingBubbles[i],
                        y: this.scene.sys.canvas.height + 28,
                        ease:'Cubic.easeIn',
                        duration: Phaser.Math.Between(400, 500),
                        onComplete: () => {
                            this.floatingBubbles.remains -= 1;
                            floatingBubbles[i].clear();
                        }
                    });
                }
            });

        }
    }
}