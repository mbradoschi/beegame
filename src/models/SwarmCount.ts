import { BeeType } from "./Bee";

export interface SwarmCount {
    [BeeType.QUEEN]: number;
    [BeeType.WORKER]: number;
    [BeeType.DRONE]: number;
}