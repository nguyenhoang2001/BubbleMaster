import { Bubble } from "./Bubble";

export class TintGenerator {
    bubble: Bubble;

    constructor(bubble:Bubble) {
        this.bubble = bubble;
    }

    public getTint(texture:string) {
        let textureKey = texture;
        if(textureKey == 'redBubble') {
            return 0xff0000;
        } else if(textureKey == 'yellowBubble') {
            return 0xffd712;
        } else if(textureKey == 'pinkBubble') {
            return 0xFF00FF;
        } else if(textureKey == 'violetBubble') {
            return 0x8A2BE2;
        } else if(textureKey == 'greenBubble') {
            return 0x00FF00;
        } else if(textureKey == 'cyanBubble') {
            return 0x00FFFF;
        } else if(textureKey == 'blueBubble') {
            return 0x2f6aeb;
        } else if(textureKey == 'grayBubble') {
            return 0xc4c8cf;
        } else if(textureKey == 'blackBubble') {
            return 0x3d424a;
        } else if(textureKey == 'fireBubble') {
            return 0xFF00FF;
        }
        return 0xff0000;
    }
}