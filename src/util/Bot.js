import { tinyWait, shortWait, mediumWait, longWait } from './Defaults';
import { randomInt } from './Helper';
    
export const calcBotMove = (turns, totalAmntOfDice, player, exact) => {
    const currentTurn = turns[turns.length - 1];
    let currentFv = currentTurn.fv;
    let currentAmount = currentTurn.amount;
    const personality = player.personality;
    let newFv = currentFv;
    let newAmount = currentAmount;

    if (currentAmount == 0) {
        newAmount = currentAmount + 1;
    }
    if (currentFv == 0) {
        newFv = currentFv + 1;
    }

    let move = 'addOne';

    let randomA = randomInt(15);
    let randomB = randomInt(10);
    let randomC = randomInt(10);

    const myHand = player.hand;
    let handAmnt = 0;


    //stores the AMOUNT of each dice
    const handMap = [
        0, 0, 0, 0, 0, 0,
    ]

    for (let i = 0; i < myHand.length; i++) {
        if (!myHand[i].disabled) {
            let fv = myHand[i].fv;
            handMap[fv-1]++;
            handAmnt++;
        }
    }

    let bestOptionIndex = 0;

    for (let i = 0; i < handMap.length; i++) {
        if (handMap[i] >= handMap[bestOptionIndex]) {
            bestOptionIndex = i;
        }
    }

    if (randomA > 1) {
        move = 'best';

        if (personality === 'ballsy' || (randomC < 2)) {
            move = 'riskyBest';
        }

        if (randomB > 9) {
            move = 'train;'
        }
    } else {
        if (randomB > 7) {
            move = 'lie';
        } else {
            move = 'addOne'; 

            if (personality === 'ballsy' || randomC < 5) {
                move = 'addTwo';
            }
        }
    }

    if (personality == "liar") {
        if (randomC < 3) {
            move = 'lie';
        }
    }

    if (handAmnt === 1) {
        console.log("LAST STAND BRO")
        move = 'best';
        if (randomC > 8 && currentFv > 0) {
            move = 'train';
        } else if (randomB > 8) {
            move = 'lie';
        }
    }


    let amountOfFvs = handMap[newFv-1];
    let updatedAmount = currentAmount - amountOfFvs;
    let riskScore = updatedAmount / totalAmntOfDice;

    let missingDice = player.hand.length - handAmnt;

    let randomOffset = randomInt(50) / 1000;
    let riskThreshold = player.riskThreshold - randomOffset;

    if (riskScore >= riskThreshold && currentTurn.amount > 0 && currentTurn.fv > 0) {
        if (exact && riskScore < riskThreshold + 0.025 && randomC > 6) {
            move = 'exact'
        } else {
            move = 'call';
        }
    }
    console.log(`${player.name}: ${move}`)

    switch(move) {
        case 'train':
            newFv = currentFv;
            if (newFv <= currentFv && newAmount == currentAmount) {
                newAmount++;
            }
            break;
        case 'best':
            newFv = bestOptionIndex + 1;
            if (newFv <= currentFv && newAmount == currentAmount) {
                newAmount++;
            }
            break;
        case 'riskyBest':
            newFv = bestOptionIndex + 1;
            if (newFv <= currentFv && newAmount == currentAmount) {
                newAmount++;
            }
            if (randomC > 3) {
                newAmount = newAmount + 1;
            }
            break;
        case 'lie':
            newFv = randomInt(6) + 1;
            if (newFv <= currentFv) {
                newAmount = newAmount + 1;
            } else if (randomC > 5) {
                newAmount = newAmount + 1;
            }
            break;
        case 'addOne':
            let extra = randomInt(1) + 1;
            newFv = currentFv + extra;
            if (newFv > 6) {
                newFv = 1;
                newAmount++;
            }
            break;
        case 'addTwo':
            newFv = currentFv + 2;
            if (newFv > 6) {
                newFv = 1;
                newAmount++;
            }
            break;
        case 'call':
            newAmount = -1;
            newFv = -1;
            break;
        case 'exact':
            newAmount = -2;
            newFv = -2;
            break;
        default:
            newFv++;
            if (newFv > 6) {
                newAmount++;
                newFv = 1;
            }
            break; 
    }

    let newTimeout = randomInt(longWait) + mediumWait;;

    return {
        amount: newAmount, 
        fv: newFv,
        timeout: newTimeout,
    };
}