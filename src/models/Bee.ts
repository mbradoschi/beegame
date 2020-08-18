export enum BeeType {
    QUEEN = 'Queen',
    WORKER = 'Worker',
    DRONE = 'Drone'
}

export abstract class Bee {
    type: BeeType;
    hp: number;
    hitDamage: number;

    constructor(type: BeeType, hp: number, hitDamage: number) {
        this.type = type;
        this.hp = hp;
        this.hitDamage = hitDamage;
    }

    inflictDamage() {
        this.hp -= this.hitDamage;
    }
}

export class Queen extends Bee {
    constructor() {
        super(BeeType.QUEEN, 100, 8);
    }
}

export class WorkerBee extends Bee {
    constructor() {
        super(BeeType.WORKER, 75, 10);
    }
}

export class Drone extends Bee {
    constructor() {
        super(BeeType.DRONE, 50, 12);
    }
}