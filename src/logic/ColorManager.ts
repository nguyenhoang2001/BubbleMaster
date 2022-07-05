export class ColorManager {
    protected textureKeys: string[];
    private currentTexture: string[];
    private timeAddTexture:number;

    constructor() {
        this.timeAddTexture = 0;
        this.textureKeys = ['redBubble','yellowBubble','pinkBubble','violetBubble','greenBubble','blueBubble',
        'cyanBubble','grayBubble','blackBubble'];
        this.currentTexture = ['redBubble','greenBubble','blueBubble'];
    }

    public getTexture(): string {
        let randomBubbleType = Phaser.Math.Between(0, this.currentTexture.length - 1);
        let bubbleType = this.currentTexture[randomBubbleType];
        return bubbleType;
    }

    public addTexture() {
        this.textureKeys.some((texture:string) => {
            let index = this.currentTexture.indexOf(texture);
            if(index === -1) {
                this.currentTexture.push(texture);
                return true;
            }
        });
    }

    public update(delta:number) {
        this.timeAddTexture += delta;
        if(this.timeAddTexture >= 30000) {
            this.timeAddTexture = 0;
            this.addTexture();
        }
    }
}
