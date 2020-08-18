import { Bee } from "../models/Bee";

export class DomService {
    updateStatusBoard(bees: Bee[]) {

    }

    updateNotifications(targetBee: Bee) {
        const beeTypeElement = document.getElementById('bee-type');
        const beeDamageElement = document.getElementById('bee-damage');

        beeTypeElement.innerText = targetBee.type;
        beeDamageElement.innerText = String(targetBee.hitDamage);
    }

    bindHitAction(handler: () => void) {
        const hitButton = document.getElementById('hit');
        hitButton.onclick = () => handler();
    }
}