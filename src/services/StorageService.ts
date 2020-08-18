import { StorageState } from "../models/StorageState";

export class StorageService {
    private readonly playerNameKey: string = 'playerName';
    private readonly beesKey: string = 'bees';
    private readonly lastHitKey: string = 'lastHit';

    getState(): StorageState {
        const playerName = localStorage.getItem(this.playerNameKey);
        const bees = JSON.parse(localStorage.getItem(this.beesKey));
        const lastHit = JSON.parse(localStorage.getItem(this.lastHitKey));
        
        if (!playerName) {
            return null;
        }

        return {
            playerName,
            bees,
            lastHit
        }
    }

    setState(storageState: StorageState) {
        const stringifiedBees = JSON.stringify(storageState.bees);
        const stringifiedLastHit = JSON.stringify(storageState.lastHit);

        localStorage.setItem(this.playerNameKey, storageState.playerName);
        localStorage.setItem(this.beesKey, stringifiedBees);
        localStorage.setItem(this.lastHitKey, stringifiedLastHit);
    }

    removeState() {
        localStorage.removeItem(this.playerNameKey);
        localStorage.removeItem(this.beesKey);
        localStorage.removeItem(this.lastHitKey);
    }
}