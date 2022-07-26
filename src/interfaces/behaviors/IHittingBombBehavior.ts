import { Bubble } from "src/objects/Bubble";
import { ShootedBubble } from "src/objects/ShootedBubble";

export interface IHittingBombBehavior {
    hit(hittedBubble:Bubble,shootedBubble:ShootedBubble): void;
}