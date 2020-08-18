import { Bee, BeeType, Queen, WorkerBee, Drone } from './Bee';

export class Swarm {
    private bees: Bee[] = [];

    private readonly workersCapacity: number = 5;
    private readonly dronesCapacity: number = 8;

    private onSwarmChange: (bees: Bee[]) => void;
    private onBeeChange: (targetBee: Bee) => void;

    initialize() {
        this.bees.push(new Queen());
        this.initializeWorkers();
        this.initializeDrones();
    }

    bindOnSwarmChange(callback: (bees: Bee[]) => void) {
        this.onSwarmChange = callback;
    }

    bindOnBeeChange(callback: (targetBee: Bee) => void) {
        this.onBeeChange = callback;
    }

    inflictDamage() {
        if (!this.bees || this.bees.length === 0) {
            return;
        }

        const maxIndex = this.bees.length - 1;
        const targetBeeIndex = Math.floor(Math.random() * maxIndex);
        
        this.bees[targetBeeIndex].inflictDamage();
        this.onSwarmChange(this.bees);
        this.onBeeChange(this.bees[targetBeeIndex]);
    }

    getBeesOfType(type: BeeType): Bee[] {
        return this.bees.filter(bee => bee.type === type);
    }

    getQueen(): Bee {
        return this.bees.find(bee => bee.type === BeeType.QUEEN);
    }

    private initializeWorkers() {
        for (let i = 0; i < this.workersCapacity; i++) {
            this.bees.push(new WorkerBee());
        }
    }

    private initializeDrones() {
        for (let i = 0; i < this.dronesCapacity; i++) {
            this.bees.push(new Drone());
        }
    }
}