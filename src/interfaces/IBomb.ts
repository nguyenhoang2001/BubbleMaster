import { BombParticles } from "src/objects/BombParticles";
import { IBullet } from "./IBullet";

export interface IBomb extends IBullet {
    particles: BombParticles;
}