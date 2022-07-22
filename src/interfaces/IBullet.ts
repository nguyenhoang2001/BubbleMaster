import { ShootedBubble } from "src/objects/ShootedBubble";
import { Tail } from "src/objects/Tail";

export interface IBullet {
    body: Phaser.Physics.Arcade.Body;
    tail: Tail;
    setScale(x:number,y:number): void;
    setRotation(radian:number): void;
}