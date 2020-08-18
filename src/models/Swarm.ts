import { Bee, BeeType, Queen, WorkerBee, Drone } from './Bee';
import { SwarmCapacity } from './SwarmCapacity';

export class Swarm {
    private bees: Bee[] = [];
    private readonly swarmCapacity: SwarmCapacity = {
        queenCapacity: 1,
        workersCapacity: 5,
        dronesCapacity: 8
    };

    private onSwarmInitialize: (swarmCapacity: SwarmCapacity) => void;
    private onSwarmChange: (beeType: BeeType) => void;
    private onBeeChange: (targetBee: Bee) => void;
    private onDeadSwarm: () => void;

    initialize() {
        this.bees.push(new Queen());
        this.initializeWorkers();
        this.initializeDrones();

        this.onSwarmInitialize(this.swarmCapacity);
    }

    bindOnSwarmInitialize(callback: (swarmCapacity: SwarmCapacity) => void) {
        this.onSwarmInitialize = callback;
    }

    bindOnSwarmChange(callback: (beeType: BeeType) => void) {
        this.onSwarmChange = callback;
    }

    bindOnBeeChange(callback: (targetBee: Bee) => void) {
        this.onBeeChange = callback;
    }

    bindOnDeadSwarm(callback: () => void) {
        this.onDeadSwarm = callback;
    }

    inflictDamage() {
        if (!this.bees || this.bees.length === 0) {
            return;
        }

        const maxIndex = this.bees.length - 1;
        const targetBeeIndex = Math.floor(Math.random() * maxIndex);
        
        this.bees[targetBeeIndex].inflictDamage();
        this.onBeeChange(this.bees[targetBeeIndex]);

        this.checkSwarmHealth(targetBeeIndex);
    }

    checkSwarmHealth(targetBeeIndex: number) {
        if (this.bees[targetBeeIndex].hp <= 0) {
            this.bees.splice(targetBeeIndex, 1);

            if (this.isTheQueenDead() || !this.bees.length) {
                this.onDeadSwarm();
                return;
            }

            this.onSwarmChange(this.bees[targetBeeIndex].type);
        }
    }

    private getQueen(): Bee {
        return this.bees.find(bee => bee.type === BeeType.QUEEN);
    }

    private isTheQueenDead(): boolean {
        return (this.getQueen() == null || this.getQueen().hp <= 0);
    }

    private initializeWorkers() {
        for (let i = 0; i < this.swarmCapacity.workersCapacity; i++) {
            this.bees.push(new WorkerBee());
        }
    }

    private initializeDrones() {
        for (let i = 0; i < this.swarmCapacity.dronesCapacity; i++) {
            this.bees.push(new Drone());
        }
    }
}