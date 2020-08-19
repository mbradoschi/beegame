import { StorageState } from "../models/StorageState";
import { Bee, BeeType, Queen, WorkerBee, Drone } from "../models/Bee";

export class StorageService {
    private readonly playerNameKey: string = 'playerName';
    private readonly beesKey: string = 'bees';
    private readonly lastHitKey: string = 'lastHit';
    private readonly swarmCountKey: string = 'swarmCount';
    private readonly swarmCapacityKey: string = 'swarmCapacity';

    getState(): StorageState {
        const playerName = localStorage.getItem(this.playerNameKey) || null;
        const beesJson = JSON.parse(localStorage.getItem(this.beesKey));
        const bees = beesJson ? this.deserializeJsonCollection(beesJson) : [];
        const lastHit = JSON.parse(localStorage.getItem(this.lastHitKey)) || null;
        const swarmCount = JSON.parse(localStorage.getItem(this.swarmCountKey)) || null;
        const swarmCapacity = JSON.parse(localStorage.getItem(this.swarmCapacityKey)) || null;

        return {
            playerName,
            bees,
            lastHit,
            swarmCount,
            swarmCapacity
        }
    }

    setState(storageState: StorageState) {
        const stringifiedBees = JSON.stringify(storageState.bees);
        const stringifiedLastHit = JSON.stringify(storageState.lastHit);
        const stringifiedSwarmCount = JSON.stringify(storageState.swarmCount);
        const stringifiedSwarmCapacity = JSON.stringify(storageState.swarmCapacity);

        localStorage.setItem(this.playerNameKey, storageState.playerName);
        localStorage.setItem(this.beesKey, stringifiedBees);
        localStorage.setItem(this.lastHitKey, stringifiedLastHit);
        localStorage.setItem(this.swarmCountKey, stringifiedSwarmCount);
        localStorage.setItem(this.swarmCapacityKey, stringifiedSwarmCapacity);
    }

    removeState() {
        localStorage.removeItem(this.playerNameKey);
        localStorage.removeItem(this.beesKey);
        localStorage.removeItem(this.lastHitKey);
        localStorage.removeItem(this.swarmCountKey);
        localStorage.removeItem(this.swarmCapacityKey);
    }

    private deserializeJsonCollection(collection: any[]): Bee[] {
        return collection.map(item => {
            let bee: Bee;

            switch (item.type) {
                case BeeType.QUEEN:
                    bee = new Queen();
                    break;
                case BeeType.WORKER:
                    bee = new WorkerBee();
                    break;
                case BeeType.DRONE:
                    bee = new Drone();
                    break;
            }

            bee.hp = item.hp;

            return bee;
        });
    }
}