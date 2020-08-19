import { BeeType, Bee } from "../models/Bee";
import { StorageState } from "../models/StorageState";

export class GameView {
    private introElement: HTMLElement;
    private gameElement: HTMLElement;
    private statusBoardElement: HTMLElement;
    private notificationsElement: HTMLElement;
    private hitElement: HTMLElement;
    private resetElement: HTMLElement;
    private gameOverElement: HTMLElement;

    constructor() {
        this.introElement = document.querySelector('.intro');
        this.gameElement = document.querySelector('.game');
        this.statusBoardElement = document.querySelector('.status-board');
        this.notificationsElement = document.querySelector('.notifications');
        this.hitElement = document.getElementById('hit');
        this.resetElement = document.getElementById('reset');
        this.gameOverElement = document.querySelector('.game-over');
    }

    initialize(storageState: StorageState) {
        if (storageState.playerName) {
            this.restoreGame(storageState);
        } else {
            this.startGame();
        }
    }

    updateStatusBoard(beeType: BeeType) {
        let element: HTMLElement;

        switch (beeType) {
            case BeeType.QUEEN:
                element = document.querySelector('#queen .count');
                break;
            case BeeType.WORKER:
                element = document.querySelector('#worker .count');
                break;
            case BeeType.DRONE:
                element = document.querySelector('#drone .count');
                break;
            default:
                element = null;
        }

        if (element) {
            element.textContent = String(Number(element.textContent) - 1);
        }
    }

    updateNotifications(targetBee: Bee) {
        if (!this.notificationsElement.classList.contains('active')) {
            this.notificationsElement.classList.add('active')
        }

        const beeTypeElement = document.getElementById('bee-type');
        const beeDamageElement = document.getElementById('bee-damage');

        beeTypeElement.textContent = targetBee.type;
        beeDamageElement.textContent = String(targetBee.hitDamage);
    }

    endGame() {
        this.gameOverElement.classList.add('active');
        this.resetElement.classList.add('active');
        this.hitElement.classList.remove('active');
        this.statusBoardElement.classList.remove('active');
    }

    bindStartAction(handler: (playerName: string) => void) {
        const startButton = document.getElementById('start-game');
        startButton.onclick = () => {
            const playerNameInput = document.getElementById('player-name-input');
            const playerNameValue = (<HTMLInputElement>playerNameInput).value;

            if (playerNameValue && playerNameValue.trim().length > 2) {
                handler(playerNameValue);
            } else {
                const errorElement = document.getElementById('player-name-error');
                errorElement.classList.add('active');
            }
        };
    }

    bindHitAction(handler: () => void) {
        this.hitElement.onclick = () => handler();
    }

    bindResetAction(handler: () => void) {
        this.resetElement.onclick = () => handler();
    }

    private restoreGame(storageState: StorageState) {
        const playerNameElement = document.getElementById('player-name');
        playerNameElement.textContent = storageState.playerName;

        const playerDetailsElement = document.querySelector('.player');
        playerDetailsElement.classList.add('active');

        this.introElement.classList.remove('active');
        this.gameElement.classList.add('active');

        const beeTypesElement = document.querySelector('.bee-types');
        beeTypesElement.innerHTML = '';

        if (!storageState.lastHit) {
            this.notificationsElement.classList.remove('active');
        }

        if (storageState.swarmCount[BeeType.QUEEN] === 0) {
            this.endGame()
        } else {
            this.gameOverElement.classList.remove('active');
            this.resetElement.classList.remove('active');
        }

        this.buildStatusBoard(beeTypesElement, storageState);

        this.statusBoardElement.classList.add('active');        
        this.hitElement.classList.add('active');
    }

    private startGame() {
        this.gameElement.classList.remove('active');
        this.introElement.classList.add('active');
    }

    private buildStatusBoard(beeTypesElement: Element, storageState: StorageState) {
        const beeTypes = Object.values(BeeType);

        for (let i = 0; i < beeTypes.length; i++) {
            const currentType: BeeType = beeTypes[i];
            let currentCount: number = storageState.swarmCount[currentType];
            let capacity: number = storageState.swarmCapacity[currentType];
            const child = document.createElement('li');

            child.id = currentType.toLowerCase();
            child.innerHTML = `
                ${currentType}: <span class="count">${currentCount}</span>
                <span class="separator"></span><span class="capacity">${capacity}</span>
            `;
            beeTypesElement.appendChild(child);
        }
    }
}