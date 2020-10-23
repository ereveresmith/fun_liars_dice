import rerollSound from '../media/reroll.mp3';
import challengeSound from '../media/challenge.wav';
import nextRoundSound from '../media/nextRound.wav';
import findDiceSound from '../media/findDice.wav';
import loseDiceSound from '../media/loseDice.wav';
import clickSound from '../media/click.wav';
import errorSound from '../media/error.wav';

import noteD4 from '../media/notes/d4.wav';
import noteE4 from '../media/notes/e4.wav';
import noteF4 from '../media/notes/f4.wav';
import noteG4 from '../media/notes/g4.wav';
import noteA4 from '../media/notes/a4.wav';
import noteB4 from '../media/notes/b4.wav';
import noteC4 from '../media/notes/c4.wav';

export const Sounds = {
    reroll: rerollSound,
    challenge: challengeSound,
    nextRound: nextRoundSound,
    nextTurn: clickSound,
    findDice: findDiceSound,
    loseDice: loseDiceSound,
    playerLose: errorSound,
}

export const Notes = [
    noteD4,
    noteE4,
    noteF4,
    noteG4, 
    noteA4,
    noteB4,
    noteC4,
]