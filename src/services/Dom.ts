import { Bee, BeeType } from "../models/Bee";
import { SwarmCapacity } from "../models/SwarmCapacity";

export class DomService {
    private statusBoardElement: HTMLElement;
    private notificationsElement: HTMLElement;
    private hitElement: HTMLElement;
    private resetElement: HTMLElement;
    private gameOverElement: HTMLElement;

    constructor() {
        this.statusBoardElement = document.querySelector('.status-board');
        this.notificationsElement = document.querySelector('.notifications');
        this.hitElement = document.getElementById('hit');
        this.resetElement = document.getElementById('reset');
        this.gameOverElement = document.querySelector('.game-over');
    }

    bindStartAction(handler: () => void) {
        const startButton = document.getElementById('start-game');
        startButton.onclick = () => {
            const playerNameInput = document.getElementById('player-name-input');
            const playerNameValue = (<HTMLInputElement>playerNameInput).value;

            if (playerNameValue && playerNameValue.trim().length > 2) {
                const introElement = document.querySelector('.intro');
                introElement.classList.remove('active');

                const playerDetailsElement = document.querySelector('.player');
                playerDetailsElement.classList.add('active');

                const playerNameElement = document.getElementById('player-name');
                playerNameElement.textContent = playerNameValue;

                const gameElement = document.querySelector('.game');
                gameElement.classList.add('active');

                handler();
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

    startGame(swarmCapacity: SwarmCapacity) {
        const beeTypesElement = document.querySelector('.bee-types');
        beeTypesElement.innerHTML = '';

        this.notificationsElement.classList.remove('active');
        this.gameOverElement.classList.remove('active');
        this.resetElement.classList.remove('active');

        const beeTypes = Object.values(BeeType);

        for (let i = 0; i < beeTypes.length; i++) {
            const currentType = beeTypes[i];
            let currentValue: number;
            const child = document.createElement('li');

            switch (currentType) {
                case BeeType.QUEEN:
                    currentValue = swarmCapacity.queenCapacity
                    break;
                case BeeType.WORKER:
                    currentValue = swarmCapacity.workersCapacity
                    break;
                case BeeType.DRONE:
                    currentValue = swarmCapacity.dronesCapacity
                    break;
                default:
                    currentValue = 0;
            }

            child.id = currentType.toLowerCase();
            child.innerHTML = `
                ${currentType}: <span class="count">${currentValue}</span>
                <span class="separator"></span><span class="capacity">${currentValue}</span>
            `;
            beeTypesElement.appendChild(child);
        }

        this.statusBoardElement.classList.add('active');        
        this.hitElement.classList.add('active');
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
}