import { Bee } from "./Bee";
import { SwarmCount } from "./SwarmCount";
import { SwarmCapacity } from "./SwarmCapacity";

export interface StorageState {
    playerName: string;
    bees: Bee[];
    lastHit: Bee;
    swarmCount: SwarmCount;
    swarmCapacity: SwarmCapacity;
}