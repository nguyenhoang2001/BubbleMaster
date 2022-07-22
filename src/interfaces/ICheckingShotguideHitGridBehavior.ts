import { BubblesBoard } from "src/objects/BubbleBoard/BubblesBoard";

export interface ICheckingShotguideHitGridBehavior {
    check(x:number,y:number, hitRange:number,bubblesBoard:BubblesBoard): boolean;
}