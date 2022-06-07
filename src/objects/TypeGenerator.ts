export class TypeGenerator {
    private textureKeys: string[];

    constructor() {
        this.textureKeys = ['blackBubble','blueBubble','cyanBubble','grayBubble','greenBubble',
        'pinkBubble','redBubble','violetBubble','yellowBubble'];
    }

    public getTexture(): string {
        let randomBubbleType = Phaser.Math.Between(0, this.textureKeys.length - 1);
        let bubbleType = this.textureKeys[randomBubbleType];
        return bubbleType;
    }
}