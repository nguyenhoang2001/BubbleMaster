import { Bubble } from "src/objects/Bubble";
import { ShootedBubble } from "src/objects/ShootedBubble";

export interface IHittingFireBallBehavior {
    hit(hittedBubble:Bubble,shootedBubble:ShootedBubble): void;
}