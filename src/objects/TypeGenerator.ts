import { GameScene } from "../scenes/GameScene";

export class TypeGenerator {
    protected textureKeys: string[];
    public scene!: GameScene;
    private currentTexture!: string[];

    constructor(scene:GameScene) {
        this.scene = scene;
        this.textureKeys = ['blackBubble','grayBubble','blueBubble','cyanBubble','greenBubble','violetBubble',
        'pinkBubble','yellowBubble','redBubble'];
    }

    public resetCurrentType() {
        let board = this.scene.bubblesBoard.board;
        this.currentTexture = [];
        for(let i = 0; i < this.scene.bubblesBoard.row; i++) {
            for(let j = 0; j < this.scene.bubblesBoard.column; j++) {
                const object =  board[i][j];
                if(object == undefined)
                    continue;
                if( this.scene.bubblesBoard.isBublleExisting(i,j) ) {
                    if(this.currentTexture.length > 0) {
                        let texture = object.texture.key;
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
                        this.currentTexture.push(object.texture.key);
                    }
                }
            }
        }
    }

    public getCurrentTexture(): string {
        if(this.currentTexture != undefined && this.currentTexture.length > 0) {
            let randomBubbleType = Phaser.Math.Between(0, this.currentTexture.length - 1);
            let bubbleType =  this.currentTexture[randomBubbleType];
            return bubbleType;
        }
        return 'redBubble';
    }

    public getTexture(): string {
        let randomBubbleType = Phaser.Math.Between(this.textureKeys.length - 4, this.textureKeys.length - 1);
        let bubbleType = this.textureKeys[randomBubbleType];
        return bubbleType;
    }
}