    // const currentTurn = turns[turns.length - 1];
    // const currentFv = currentTurn.fv;
    // const currentAmount = currentTurn.amount;
    // let newFv = currentFv + 1;
    // let newAmount = currentAmount;
    // if (newFv > 6) {
    //   newAmount++;
    //   newFv = 1;
    // }

    export const calcBotMove = (turns, amountOfDice) => {
        const currentTurn = turns[turns.length - 1];
        const currentFv = currentTurn.fv;
        const currentAmount = currentTurn.amount;

        let newFv = currentFv;
        let newAmount = currentAmount;
        let move = 'jump';

        let riskPercent = 0.3;

        
        if (currentAmount >= (amountOfDice * riskPercent)) {
            move = 'call'
        }


        if (currentAmount === 0 && currentFv === 0) {
            move = 'jump';
        }

        if (currentFv === 0) {
            newFv = 1;
        }



        switch(move) {
            case 'simple':
                newFv++;
                if (newFv > 6) {
                    newAmount++;
                    newFv = 1;
                }
                break;
            case 'jump':
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
            fv: newFv
        };
    }