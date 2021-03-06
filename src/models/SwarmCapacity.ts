import { BeeType } from "./Bee";

export interface SwarmCapacity {
    [BeeType.QUEEN]: number;
    [BeeType.WORKER]: number;
    [BeeType.DRONE]: number;
}