// const Swarm = require('../models/Swarm');
import { Swarm} from '../models/Swarm';
import { Queen, WorkerBee, Drone, BeeType } from '../models/Bee';

describe('Swarm', () => {
    it('should initialize the swarm', () => {
        const swarm = new Swarm();
        expect(swarm.getBees()).toEqual([]);

        swarm.initialize();
        const expectedResult = [
            new Queen(),
            new WorkerBee(),
            new WorkerBee(),
            new WorkerBee(),
            new WorkerBee(),
            new WorkerBee(),
            new Drone(),
            new Drone(),
            new Drone(),
            new Drone(),
            new Drone(),
            new Drone(),
            new Drone(),
            new Drone()
        ];

        expect(swarm.getBees()).toEqual(expectedResult);
    });

    it('should set bees and update swarm count', () => {
        const swarm = new Swarm();

        expect(swarm.getBees().length).toBe(0);
        expect(swarm.getSwarmCount()).toEqual({
            [BeeType.QUEEN]: 0,
            [BeeType.WORKER]: 0,
            [BeeType.DRONE]: 0,
        });

        swarm.setBees([
            new Queen(),
            new WorkerBee(),
            new Drone()
        ]);

        expect(swarm.getBees().length).toBe(3);
        expect(swarm.getSwarmCount()).toEqual({
            [BeeType.QUEEN]: 1,
            [BeeType.WORKER]: 1,
            [BeeType.DRONE]: 1,
        })
    });

    it('should remove bee and update swarm count', () => {
        const swarm = new Swarm();
        const bee = new WorkerBee();

        swarm.setBees([
            new Queen(),
            bee,
            new WorkerBee(),
            new Drone()
        ]);

        expect(swarm.getBees().length).toBe(4);
        expect(swarm.getSwarmCount()).toEqual({
            [BeeType.QUEEN]: 1,
            [BeeType.WORKER]: 2,
            [BeeType.DRONE]: 1,
        })

        swarm.removeBee(bee, 1);

        expect(swarm.getBees().length).toBe(3);
        expect(swarm.getSwarmCount()).toEqual({
            [BeeType.QUEEN]: 1,
            [BeeType.WORKER]: 1,
            [BeeType.DRONE]: 1,
        })
    });

    describe('isTheQueenDead' ,() => {
        it('should return true when undefined', () => {
            const swarm = new Swarm();
            swarm.setBees([
                new WorkerBee(),
                new Drone()
            ]);

            expect(swarm.isTheQueenDead()).toEqual(true);
        });

        it('should return true when queen HP is under 0', () => {
            const swarm = new Swarm();
            const queen = new Queen();
            queen.hp = -10;

            swarm.setBees([
                queen
            ]);

            expect(swarm.isTheQueenDead()).toEqual(true);
        });

        it('should return true when queen HP is equal to 0', () => {
            const swarm = new Swarm();
            const queen = new Queen();
            queen.hp = 0;

            swarm.setBees([
                queen
            ]);

            expect(swarm.isTheQueenDead()).toEqual(true);
        });

        it('should return false when queen HP is bigger than 0', () => {
            const swarm = new Swarm();
            const queen = new Queen();
            queen.hp = 80;

            swarm.setBees([
                queen
            ]);

            expect(swarm.isTheQueenDead()).toEqual(false);
        });
    });
})