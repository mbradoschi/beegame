import { GameModel } from '../entities/GameModel';
import { StorageService } from '../services/StorageService';
import { Queen, WorkerBee, BeeType, Drone, Bee } from '../models/Bee';
import { Swarm } from '../models/Swarm';
import { StorageState } from '../models/StorageState';

describe('GameModel', () => {
    it('should get state from storage', () => {
        const playerName = 'test';
        const lastHit = new WorkerBee();
        const storageState = {
            playerName,
            bees: [new Queen()],
            lastHit,
            swarmCount: {
                [BeeType.QUEEN]: 1,
                [BeeType.WORKER]: 0,
                [BeeType.DRONE]: 0
            },
            swarmCapacity: {
                [BeeType.QUEEN]: 1,
                [BeeType.WORKER]: 5,
                [BeeType.DRONE]: 8
            }
        }
        jest.spyOn(StorageService.prototype, 'getState').mockReturnValue(storageState);

        const gameModel = new GameModel();

        expect((gameModel as any).swarm.getBees().length).toBe(1);
        expect((gameModel as any).lastHit).toEqual(lastHit);
        expect((gameModel as any).playerName).toBe(playerName);
    });

    it('should initialize state', () => {
        const lastHit = new WorkerBee();
        const storageState = {
            playerName: null,
            bees: [],
            lastHit: null,
            swarmCount: null,
            swarmCapacity: null
        } as any;
        jest.spyOn(StorageService.prototype, 'getState').mockReturnValue(storageState);
        const swarmInitializeSpy = jest.spyOn(Swarm.prototype, 'initialize');
        const swarmSetBeesSpy = jest.spyOn(Swarm.prototype, 'setBees');

        const gameModel = new GameModel();

        expect(swarmInitializeSpy).toHaveBeenCalled();
        expect(swarmSetBeesSpy).not.toHaveBeenCalled();
    });

    describe('initialize', () => {
        let gameModel: any;
        const playerName = 'test';

        beforeEach(() => {
            gameModel = new GameModel();
            gameModel.bindOnModelInitialize((state: StorageState) => {});
        });

        it('should set player name', () => {
            gameModel.initialize(playerName);
            expect(gameModel.playerName).toBe(playerName);
        });

        it('should update the view on the change', () => {
            const mockedState = {};
            jest.spyOn(gameModel, 'getStorageState').mockReturnValue(mockedState);
            const onModelInitializeSpy = jest.spyOn(gameModel, 'onModelInitialize');

            gameModel.initialize(playerName);

            expect(onModelInitializeSpy).toHaveBeenCalledWith(mockedState);
        });
    });

    describe('inflictDamage', () => {
        const gameModel = new GameModel() as any;
        gameModel.bindOnBeeChange((targetBee: Bee) => {});

        const mockedState = {};
        const targetBee = new Queen();

        const setStateSpy = jest.spyOn(StorageService.prototype, 'setState');
        const checkSwarmHealthSpy = jest.spyOn(gameModel, 'checkSwarmHealth');
        const onBeeChangeSpy = jest.spyOn(gameModel, 'onBeeChange');

        jest.spyOn(Swarm.prototype, 'getBee').mockReturnValue(targetBee);
        jest.spyOn((gameModel as any), 'buildStorageState').mockReturnValue(mockedState);

        it('should inflict damage to target bee', () => {
            const initialHp = 100;
            const afterDamageHp = 92
            expect(targetBee.hp).toBe(initialHp);

            gameModel.inflictDamage();

            expect(targetBee.hp).toBe(afterDamageHp);
        });

        it('should set target bee as last hit', () => {
            gameModel.inflictDamage();
            expect(gameModel.lastHit).toEqual(targetBee);
        });

        it('should set new state to storage', () => {
            gameModel.inflictDamage();
            expect(setStateSpy).toHaveBeenCalledWith(mockedState);
        });

        it('should update view on the change', () => {
            gameModel.inflictDamage();
            expect(onBeeChangeSpy).toHaveBeenCalledWith(targetBee);
        });

        it('should check swarm health', () => {
            gameModel.inflictDamage();
            expect(checkSwarmHealthSpy).toHaveBeenCalled();
        });
    });
})