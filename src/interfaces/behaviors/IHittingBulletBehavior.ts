import { Bubble } from "src/objects/Bubble";
import { ShootedBubble } from "src/objects/ShootedBubble";

export interface IHittingBulletBehavior {
    hit(hittedBubble:Bubble,shootedBubble:ShootedBubble): void;
}