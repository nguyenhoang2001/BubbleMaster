import { GameScene } from "../scenes/GameScene";

export class TypeGenerator {
    protected textureKeys: string[];
    public scene!: GameScene;
    private currentTexture!: string[];

    constructor(scene:GameScene) {
        this.scene = scene;
        this.textureKeys = ['blackBubble','blueBubble','cyanBubble','grayBubble','greenBubble',
        'pinkBubble','redBubble','violetBubble','yellowBubble'];
    }

    private resetType() {
        let bubblesBoard = this.scene.bubblesBoard.bubblesBoard;
        this.currentTexture = [];
        for(let i = 0; i < this.scene.bubblesBoard.width; i++) {
            for(let j = 0; j < this.scene.bubblesBoard.width; j++) {
                if( this.scene.bubblesBoard.isBublleExisting(i,j) ) {
                    if(this.currentTexture.length > 0) {
                        let texture = bubblesBoard[i][j].texture.key;
                        let allowAdding = true;
                        for(let k = 0; k < this.currentTexture.length; k++) {
                            if(this.currentTexture[k] == texture) {
                                allowAdding = false;
                                break;
                            }
                        }
                        if(allowAdding == true) {
                            this.currentTexture.push(texture);
                        }
                    } else {
                        this.currentTexture.push(bubblesBoard[i][j].texture.key);
                    }
                }
            }
        }
    }

    public getShootTexture(): string {
        this.resetType();
        if(this.currentTexture != undefined && this.currentTexture.length > 0) {
            let randomBubbleType = Phaser.Math.Between(0, this.currentTexture.length - 1);
            let bubbleType =  this.currentTexture[randomBubbleType];
            return bubbleType;
        }
        return 'blackBubble';
    }

    public getTexture(): string {
        let randomBubbleType = Phaser.Math.Between(0, this.textureKeys.length - 5);
        let bubbleType = this.textureKeys[randomBubbleType];
        return bubbleType;
    }
}