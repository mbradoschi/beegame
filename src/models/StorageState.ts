import { Bee } from "./Bee";

export interface StorageState {
    playerName: string;
    bees: Bee[];
    lastHit: Bee;
}