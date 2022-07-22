import { FireBubble } from "src/objects/FireBubble";
import { IBullet } from "./IBullet";

export interface IFireBullet extends IBullet {
    y: number;
    height: number;
    clear(): void;
    removeVisualEffect(): void;
    destroy(): void;
}