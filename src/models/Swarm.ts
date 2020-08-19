import { Bee, BeeType, Queen, WorkerBee, Drone } from './Bee';
import { SwarmCount } from './SwarmCount';
import { SwarmCapacity } from './SwarmCapacity';

export class Swarm {
    private bees: Bee[] = [];
    private swarmCount: SwarmCount = {
        [BeeType.QUEEN]: 0,
        [BeeType.WORKER]: 0,
        [BeeType.DRONE]: 0
    };
    private readonly swarmCapacity: SwarmCapacity = {
        [BeeType.QUEEN]: 1,
        [BeeType.WORKER]: 5,
        [BeeType.DRONE]: 8
    };

    initialize() {
        this.initializeQueen();
        this.initializeWorkers();
        this.initializeDrones();
    }

    getBees(): Bee[] {
        return this.bees;
    }

    setBees(bees: Bee[]) {
        this.bees = bees;
        this.updateSwarmCount(this.bees);
    }

    getBee(beeIndex: number): Bee {
        return this.bees[beeIndex];
    }

    removeBee(bee: Bee, beeIndex: number) {
        this.bees.splice(beeIndex, 1);
        this.swarmCount[bee.type] -= 1;
    }

    getSwarmCount(): SwarmCount {
        return this.swarmCount;
    }

    resetSwarmCount() {
        this.swarmCount = {
            [BeeType.QUEEN]: 0,
            [BeeType.WORKER]: 0,
            [BeeType.DRONE]: 0
        }
    }

    getSwarmCapacity(): SwarmCapacity {
        return this.swarmCapacity;
    }

    public isTheQueenDead(): boolean {
        const queen = this.getQueen();
        return (queen == null || queen.hp <= 0);
    }

    private getQueen(): Bee {
        return this.bees.find(bee => bee.type === BeeType.QUEEN);
    }

    private initializeQueen() {
        this.bees.push(new Queen());
        this.swarmCount[BeeType.QUEEN] += 1;
    }

    private initializeWorkers() {
        for (let i = 0; i < this.swarmCapacity[BeeType.WORKER]; i++) {
            this.bees.push(new WorkerBee());
            this.swarmCount[BeeType.WORKER] += 1;
        }
    }

    private initializeDrones() {
        for (let i = 0; i < this.swarmCapacity[BeeType.DRONE]; i++) {
            this.bees.push(new Drone());
            this.swarmCount[BeeType.DRONE] += 1;
        }
    }

    private updateSwarmCount(bees: Bee[]) {
        for (let bee of bees) {
            this.swarmCount[bee.type] += 1;
        }
    }
}