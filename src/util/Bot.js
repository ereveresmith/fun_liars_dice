import { randomInt, tinyWait, shortWait, mediumWait, longWait } from '../util/Helper';
    
export const calcBotMove = (turns, amountOfDice, player) => {
    const currentTurn = turns[turns.length - 1];
    const currentFv = currentTurn.fv;
    const currentAmount = currentTurn.amount;

    let newFv = currentFv + 1;
    let newAmount = currentAmount;
    let move = 'addOne';

    let randomA = randomInt(10);
    let randomB = randomInt(10);
    let randomC = randomInt(10);

    const myHand = player.hand;
    let handAmnt = 0;

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
        if (handMap[i] > handMap[bestOptionIndex]) {
            bestOptionIndex = i;
        }
    }
    
    if (newAmount === 0) {
        newAmount = 1;
    }

    if (currentFv === 0) {
        newFv = 1;
    }

    if (randomA > 3) {
        if (randomB > 3) {
            move = 'best';
        }
    } else {
        if (randomB > 4) {
            move = 'random';
        } else {
            if (randomC > 2) {
                move = 'addOne';
            } else {
                move = 'risky';
            }
            
        }
    }


    let riskPercent = 0.35 - (handAmnt * 0.01);
    let newTimeout = randomInt(longWait) + mediumWait;;
    const isSafe = newAmount < ((amountOfDice * riskPercent) / 2.7);
    const isRisky = newAmount >= (amountOfDice * riskPercent)

    if (isSafe) {
        newTimeout = randomInt(mediumWait) + mediumWait;
    } else if (isRisky) {
        move = 'call'
        newTimeout = randomInt(longWait) + mediumWait;
    }


    switch(move) {
        case 'best':
            newFv = bestOptionIndex + 1;


            if (newFv <= currentFv) {
                newAmount++;
            }
            break;
        case 'simple':
            newFv++;
            if (newFv > 6) {
                newAmount++;
                newFv = 1;
            }
            break;
        case 'random':
            newFv = randomInt(5) + 1;
            newAmount = randomInt(2) + newAmount
            break;
        case 'risky':
            newFv = bestOptionIndex + 1;
            newAmount = randomInt(3) + newAmount
            break;
        case 'addOne':
            newAmount++;
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


    return {
        amount: newAmount, 
        fv: newFv,
        timeout: newTimeout,
    };
}