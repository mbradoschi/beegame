import { Swarm } from './Swarm';
import { Bee, BeeType } from './Bee';
import { StorageService } from '../services/Storage';
import { DomService } from '../services/Dom';
import { SwarmCapacity } from './SwarmCapacity';

export class Game {
    private swarm: Swarm;
    private domService: DomService;
    private storageService: StorageService;

    constructor() {
        this.swarm = new Swarm();
        this.domService = new DomService();
        this.storageService = new StorageService();
    }

    initialize() {
        this.initActions();
    }

    initActions() {
        this.swarm.bindOnSwarmInitialize(this.onSwarmInitialize);
        this.swarm.bindOnSwarmChange(this.onStatusBoardChange);
        this.swarm.bindOnBeeChange(this.onNotificationsChange);
        this.swarm.bindOnDeadSwarm(this.onGameOver);

        this.domService.bindStartAction(this.handleStartAction);
        this.domService.bindHitAction(this.handleHitAction);
        this.domService.bindResetAction(this.handleStartAction);
    }

    onSwarmInitialize = (swarmCapacity: SwarmCapacity) => {
        this.domService.startGame(swarmCapacity);
    }

    onStatusBoardChange = (beeType: BeeType) => {
        this.domService.updateStatusBoard(beeType);
    }

    onNotificationsChange = (targetBee: Bee) => {
        this.domService.updateNotifications(targetBee);
    }

    onGameOver = () => {
        this.domService.endGame();
    }

    handleStartAction = () => {
        this.swarm.initialize();
    }

    handleHitAction = () => {
        this.swarm.inflictDamage();
    }
}