import { Bee, BeeType, Queen, WorkerBee, Drone } from './Bee';
import { SwarmCapacity } from './SwarmCapacity';

export class Swarm {
    private bees: Bee[] = [];
    private readonly swarmCapacity: SwarmCapacity = {
        queenCapacity: 1,
        workersCapacity: 5,
        dronesCapacity: 8
    };

    initialize() {
        this.bees.push(new Queen());
        this.initializeWorkers();
        this.initializeDrones();
    }

    getBees() {
        return this.bees;
    }

    setBees(bees: Bee[]) {
        this.bees = bees;
    }

    getBee(beeIndex: number) {
        return this.bees[beeIndex];
    }

    removeBee(beeIndex: number) {
        this.bees.splice(beeIndex, 1);
    }

    getSwarmCapacity() {
        return this.swarmCapacity;
    }

    getCountByType() {
        return this.bees.reduce((accumulator: any, bee: Bee) => {
            if (accumulator[bee.type]) {
                accumulator[bee.type] += 1;
            } else {
                accumulator[bee.type] = 1;
            }

            return accumulator;
        }, <any>{});
    }

    public isTheQueenDead(): boolean {
        return (this.getQueen() == null || this.getQueen().hp <= 0);
    }

    private getQueen(): Bee {
        return this.bees.find(bee => bee.type === BeeType.QUEEN);
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