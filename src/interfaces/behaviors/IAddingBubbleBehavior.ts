import { Bubble } from "src/objects/Bubble";
import { ShootedBubble } from "src/objects/ShootedBubble";

export interface IAddingBubbleBehavior {
    addBubble(row:number, column:number,texture?:string):Bubble|void
    addBubbleFromShoot(hittedBubble:Bubble,shootedBubble:ShootedBubble):Bubble|void;
    addMoreBubbleRows(numberOfRow:number): void;
}