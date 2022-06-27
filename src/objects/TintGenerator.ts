import { Bubble } from "./Bubble";

export class TintGenerator {
    bubble!: Bubble;

    constructor(bubble:Bubble) {
        this.bubble = bubble;
    }

    public getTint() {
        let textureKey = this.bubble.texture.key;

        if(textureKey == 'redBubble') {
            return 0xff0000;
        } else if(textureKey == 'yellowBubble') {
            return 0xFFFF00;
        } else if(textureKey == 'pinkBubble') {
            return 0xFF00FF;
        } else if(textureKey == 'violetBubble') {
            return 0x8A2BE2;
        } else if(textureKey == 'greenBubble') {
            return 0x00FF00;
        } else if(textureKey == 'cyanBubble') {
            return 0x00FFFF;
        } else if(textureKey == 'blueBubble') {
            return 0x0000FF;
        } else if(textureKey == 'grayBubble') {
            return 0xD3D3D3;
        } else if(textureKey == 'blackBubble') {
            return 0x000000;
        }
    }
}