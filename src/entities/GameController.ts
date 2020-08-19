import { GameModel } from "./GameModel";
import { GameView } from "./GameView";
import { StorageState } from "../models/StorageState";
import { BeeType, Bee } from "../models/Bee";

export class GameController {
    private model: GameModel;
    private view: GameView;

    constructor() {
        this.model = new GameModel();
        this.view = new GameView();
    }

    initialize() {
        this.initActions();
        this.onModelInitialize(this.model.getStorageState());
    }

    initActions() {
        this.model.bindOnModelInitialize(this.onModelInitialize);
        this.model.bindOnModelChange(this.onModelChange);
        this.model.bindOnBeeChange(this.onNotificationsChange);
        this.model.bindOnDeadSwarm(this.onGameOver);

        this.view.bindStartAction(this.handleStartAction);
        this.view.bindHitAction(this.handleHitAction);
        this.view.bindResetAction(this.handleResetAction);
    }

    onModelInitialize = (storageState: StorageState) => {
        this.view.initialize(storageState);
    }

    onModelChange = (beeType: BeeType) => {
        this.view.updateStatusBoard(beeType);
    }

    onNotificationsChange = (targetBee: Bee) => {
        this.view.updateNotifications(targetBee);
    }

    onGameOver = () => {
        this.view.endGame();
    }

    handleStartAction = (playerName: string) => {
        this.model.initialize(playerName);
    }

    handleResetAction = () => {
        this.model.reset();
    }

    handleHitAction = () => {
        this.model.inflictDamage();
    }
}