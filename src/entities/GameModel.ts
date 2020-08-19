import { Bee, BeeType } from '../models/Bee';
import { Swarm } from '../models/Swarm';
import { StorageService } from '../services/StorageService';
import { StorageState } from '../models/StorageState';

export class GameModel {
    private playerName: string;
    private swarm: Swarm = new Swarm();
    private lastHit: Bee;

    private readonly storageService: StorageService = new StorageService();

    private onModelInitialize: (storageState: StorageState) => void;
    private onModelChange: (beeType: BeeType) => void;
    private onBeeChange: (targetBee: Bee) => void;
    private onDeadSwarm: () => void;

    constructor() {
        const persistedState = this.storageService.getState();

        const { playerName, bees, lastHit } = persistedState;
        this.playerName = playerName;
        this.lastHit = lastHit;

        if (bees.length > 0) {
            this.swarm.setBees(bees);
        } else {
            this.swarm.initialize();
        }
    }

    initialize(playerName: string) {
        // const persistedState = this.storageService.getState();

        // if (!persistedState) {
        //     this.playerName = playerName;
        //     this.swarm.initialize();
        //     // this.storageService.setState(this.buildStorageState());
        // } else {
        //     const { playerName, bees, lastHit } = persistedState;
        //     this.playerName = playerName;
        //     this.lastHit = lastHit;
        //     this.swarm.setBees(bees);
        // }
        this.playerName = playerName;
        this.storageService.setState(this.buildStorageState());

        this.onModelInitialize(this.getStorageState());
    }

    reset() {
        this.storageService.removeState();
        this.swarm.setBees([]);
        this.swarm.initialize();
        this.onModelInitialize(this.getStorageState());
    }

    getStorageState() {
        return this.storageService.getState();
    }

    hasStorageState() {
        return (this.playerName !== null);
    }

    bindOnModelInitialize(callback: (storageState: StorageState) => void) {
        this.onModelInitialize = callback;
    }

    bindOnModelChange(callback: (beeType: BeeType) => void) {
        this.onModelChange = callback;
    }

    bindOnBeeChange(callback: (targetBee: Bee) => void) {
        this.onBeeChange = callback;
    }

    bindOnDeadSwarm(callback: () => void) {
        this.onDeadSwarm = callback;
    }

    inflictDamage() {
        const bees = this.swarm.getBees();

        if (bees.length === 0) {
            return;
        }

        const maxIndex = bees.length - 1;
        const targetBeeIndex = Math.floor(Math.random() * maxIndex);
        const targetBee = this.swarm.getBee(targetBeeIndex);
        
        targetBee.inflictDamage();
        this.lastHit = targetBee;

        this.storageService.setState(this.buildStorageState());
        this.onBeeChange(targetBee);

        this.checkSwarmHealth(targetBee, targetBeeIndex);
    }

    private checkSwarmHealth(targetBee: Bee, targetBeeIndex: number) {
        if (targetBee.hp <= 0) {
            this.swarm.removeBee(targetBee, targetBeeIndex);
            this.storageService.setState(this.buildStorageState());

            if (this.swarm.isTheQueenDead() || !this.swarm.getBees().length) {
                this.onDeadSwarm();
                return;
            }

            this.onModelChange(targetBee.type);
        }
    }

    private buildStorageState(): StorageState {
        let storageState: StorageState = {
            playerName: this.playerName,
            bees: this.swarm.getBees(),
            lastHit: this.lastHit,
            swarmCount: this.swarm.getSwarmCount(),
            swarmCapacity: this.swarm.getSwarmCapacity()
        };
        
        return storageState;
    }
}