import { Bubble } from "./Bubble";

export class FloatingHandler {
    public clearFloating(floatingBubbles:Bubble[]) {
        for(let i = 0; i< floatingBubbles.length; i++) {
            floatingBubbles[i].clear();
        }
    }
}