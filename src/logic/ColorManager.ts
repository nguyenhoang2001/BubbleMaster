import { GameScene } from "src/scenes/GameScene";
import { BubblesBoard } from "../objects/BubbleBoard/BubblesBoard";

export class ColorManager {
    private scene: GameScene;
    protected textureKeys: string[];
    private currentTexture: string[];
    private timeAddTexture:number;
    private bubblesBoard:BubblesBoard;
    private level:number;

    constructor(scene:GameScene) {
        this.scene = scene;
        this.timeAddTexture = 0;
        this.level = 0;
        this.textureKeys = ['redBubble','yellowBubble','pinkBubble','violetBubble','greenBubble','blueBubble',
        'cyanBubble','grayBubble','blackBubble'];
        this.currentTexture = ['redBubble','greenBubble','blueBubble'];
    }

    public setBubblesBoard(bubblesBoard:BubblesBoard) {
        this.bubblesBoard = bubblesBoard;
    }

    public getTexture(): string {
        let randomBubbleType = Phaser.Math.Between(0, this.currentTexture.length - 1);
        let bubbleType = this.currentTexture[randomBubbleType];
        return bubbleType;
    }

    public getColorToShoot():string {
        let colors:string[] = [];
        for(let i = this.bubblesBoard.row - 1; i >= this.bubblesBoard.row - 3; i--) {
            if(i < 0)
                break;
            for(let j = 0; j <this.bubblesBoard.column; j++) {
                const bubble = this.bubblesBoard.board[i][j];
                if(bubble != undefined) {
                    if(this.bubblesBoard.isBublleExisting(i,j)) {
                        let color = bubble.texture.key;
                        if(color.endsWith('Bubble')) {
                            if(colors.indexOf(color) == -1) {
                                colors.push(color);
                            }
                        }
                    }
                }
            }
        }
        let randomBubbleType = Phaser.Math.Between(0, colors.length - 1);
        let bubbleType:undefined|string = colors[randomBubbleType];
        if(bubbleType != undefined)
            return bubbleType;
        return this.getTexture();
    }

    public getLevel() {
        return this.level;
    }

    public addTexture() {
        this.textureKeys.some((texture:string) => {
            let index = this.currentTexture.indexOf(texture);
            if(index === -1) {
                this.currentTexture.push(texture);
                this.level += 1;
                return true;
            }
            return false;
        });
    }

    public update(delta:number) {
        if(this.scene.movingGridManager.getIsShooted()) {
            this.timeAddTexture += delta;
            if(this.timeAddTexture >= 30000) {
                this.timeAddTexture = 0;
                this.addTexture();
            }
        }
    }
}
