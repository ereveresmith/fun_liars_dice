import { tinyWait, shortWait, mediumWait, longWait } from './Defaults';
import { randomInt } from './Helper';
    
export const calcBotMove = (turns, totalAmntOfDice, player) => {
    const currentTurn = turns[turns.length - 1];
    let currentFv = currentTurn.fv;
    let currentAmount = currentTurn.amount;

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
    } else {
        if (randomB > 6) {
            move = 'lie';
        } else {
            move = 'addOne'; 
        }
    }

    if (handAmnt === 1) {
        move = 'best';
    }


    let amountOfFvs = handMap[newFv-1];
    let updatedAmount = currentAmount - amountOfFvs;
    let riskScore = updatedAmount / totalAmntOfDice;

    let missingDice = player.hand.length - handAmnt;

    let randomOffset = randomInt(15) / 100;
    let missingDiceOffset = 0 - (missingDice * 0.05);
    let riskThreshold = 0.24 + randomOffset + missingDiceOffset;

    


    // console.log("thresh: " + riskThreshold)
    if (riskScore >= riskThreshold && currentTurn.amount > 0 && currentTurn.fv > 0) {
        move = 'call'
    }
    console.log(`${player.name}: ${move}`)

    switch(move) {
        case 'best':
            if (randomB > 7 && currentFv !== 0) {
                newFv = currentFv;
                if (newFv <= currentFv && newAmount == currentAmount) {
                    newAmount++;
                }
            } else {
                newFv = bestOptionIndex + 1;
                if (newFv <= currentFv && newAmount == currentAmount) {
                    newAmount++;
                }
                if (randomC > 8 && missingDice == 0) {
                    newAmount = newAmount + 1;
                }
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
        case 'call':
            newAmount = -1;
            newFv = -1;
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