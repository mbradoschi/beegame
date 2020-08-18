import { Swarm } from './Swarm';
import { Bee } from './Bee';
import { StorageService } from '../services/Storage';
import { DomService } from '../services/Dom';

export class Game {
    private playerName: string;
    private hasGameStarted: boolean = false;
    private isGameOver: boolean = false;
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
        this.swarm.initialize();
    }

    initActions() {
        this.swarm.bindOnSwarmChange(this.onStatusBoardChange);
        this.swarm.bindOnBeeChange(this.onNotificationsChange);
        this.domService.bindHitAction(this.handleHitAction);
    }

    onStatusBoardChange = (bees: Bee[]) => {
        this.domService.updateStatusBoard(bees);
    }

    onNotificationsChange = (targetBee: Bee) => {
        this.domService.updateNotifications(targetBee);
    }

    handleHitAction = () => {
        this.swarm.inflictDamage();
    }
}