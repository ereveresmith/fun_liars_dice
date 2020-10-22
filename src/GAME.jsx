import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import CenterDisplay from './components/CenterDisplay';
import PlayerDisplay from './components/PlayerDisplay';
import BetSubmitter from './components/BetSubmitter';
import { calcBotMove } from './util/Bot';
import { randomInt, YOU } from './util/Helper';
import useSound from 'use-sound';
import { Sounds } from './util/Sounds'
import rerollSound from './media/reroll.mp3';
import challengeSound from './media/challenge.wav';
import loseBetSound from './media/loseBet.wav';
import nextTurnSound from './media/nextTurn.wav';
import winBetSound from './media/winBet.wav';
import showDiceSound from './media/showDice.wav';
import loseDiceSound from './media/loseDice.wav';


import noteD2 from './media/d2.wav';
import noteE2 from './media/e2.wav';
import noteF2 from './media/f2.wav';
import noteG2 from './media/g2.wav';
import noteA2 from './media/a2.wav';
import noteB2 from './media/b2.wav';
import noteC2 from './media/c2.wav';
import noteD3 from './media/d3.wav';
import noteE3 from './media/e3.wav';
import noteF3 from './media/f3.wav';
import noteG3 from './media/g3.wav';
import noteA3 from './media/a3.wav';
import noteB3 from './media/b3.wav';
import noteC3 from './media/c3.wav';
import noteD4 from './media/d4.wav';
// import noteE4 from './media/e4.wav';
// import noteF4 from './media/f4.wav';
// import noteG4 from './media/g4.wav';
// import noteA4 from './media/a4.wav';
// import noteB4 from './media/b4.wav';
// import noteC4 from './media/c4.wav';
// import noteD5 from './media/d4.wav';

const UIGrid = Styled.div`
  display: grid;
  position: absolute;
  bottom: 0;
  right: 0;
`

const EmptyCell = Styled.div`
  display: grid;
  width: 100%;
  border: 1px solid ${Styles.colors.lightGrey};
  opacity: 0;
  height: 100%;
`

const Wrapper = Styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  `

const GameGrid = Styled.div`
  margin: 8px 0;
  grid-gap: 4px;
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: auto auto auto;
  grid-gap: 12px;
`

const initialTurn = {
  number: 0,
  amount: 0,
  fv: 0,
  player: {id: 0},
  nextPlayer: YOU,
}



const GamePage = ({ settings, onEnd}) => {
  const [players, setPlayers] = useState(settings.players);
  const [turns, setTurns] = useState([initialTurn]);
  const [log, setLog] = useState([]);
  const [defaultAmount, setDefaultAmount] = useState(1);
  const [defaultFv, setDefaultFv] = useState(1);
  const [gameSpeed, setGameSpeed] = useState(1);
  const [yourTurn, setYourTurn] = useState(true);
  const [isChallenge, setIsChallenge] = useState(false);
  const [playRerollSound] = useSound(rerollSound);
  const [playNoteD2] = useSound(noteD2);
  const [playNoteE2] = useSound(noteE2);
  const [playNoteF2] = useSound(noteF2);
  const [playNoteG2] = useSound(noteG2);
  const [playNoteA2] = useSound(noteA2);
  const [playNoteB2] = useSound(noteB2);
  const [playNoteC2] = useSound(noteC2);
  const [playNoteD3] = useSound(noteD3);
  const [playNoteE3] = useSound(noteE3);
  const [playNoteF3] = useSound(noteF3);
  const [playNoteG3] = useSound(noteG3);
  const [playNoteA3] = useSound(noteA3);
  const [playNoteB3] = useSound(noteB3);
  const [playNoteC3] = useSound(noteC3);
  const [playNoteD4] = useSound(noteD4);
  const [playloseBetSound] = useSound(loseBetSound);
  const [playNextTurnSound] = useSound(nextTurnSound);
  const [playChallengeSound] = useSound(challengeSound);
  const [playWinBetSound] = useSound(winBetSound);
  const [playShowDiceSound] = useSound(showDiceSound);
  const [playLoseDiceSound] = useSound(loseDiceSound);

  const tinyWait = 240 * gameSpeed;
  const shortWait = 400 * gameSpeed;
  const mediumWait = 800 * gameSpeed;
  const longWait = 1200 * gameSpeed;

  useEffect(() => {
    const nextPlayer = turns[turns.length-1].nextPlayer;

    if (nextPlayer.id !== 1) {
      calcBotTurn();
    }
  }, [turns]);

  const restartGame = async (settings) => {
    playRerollSound();
    setPlayers(settings.players);
    setTurns([initialTurn]);
    rerollDice();
    await printLog('Starting a new game');
    setDefaultAmount(1);
    setDefaultFv(1);
    setYourTurn(true);
    setIsChallenge(false);
  }

  useEffect(() => {
    restartGame(settings);
  }, [settings])

  const printLog = async (value, fv, amount, value2) => {
    setLog(log => [...log, {value: value, fv: fv, amount: amount, value2: value2}]);
    timeout(shortWait);
  }

  const nextRound = async (currentPlayer) => {
    await printLog("New round, new dice!");
    setIsChallenge(false);
    timeout(mediumWait)
    rerollDice();
    let nextPlayer = currentPlayer;

    if (checkOutOfDice(currentPlayer.hand)) {
      nextPlayer = calcNextPlayer(currentPlayer);
    } 

    const winner = checkWinner();
    if (winner !== undefined) {
      await printLog(`${winner.name} has won the game!`);
    } else {
      timeout(mediumWait)

      const newTurn = {
        number: 0,
        amount: 0,
        fv: 0,
        player: {id: 0},
        nextPlayer: nextPlayer,
      }
      setTurns([newTurn]);
      if (nextPlayer.id === 1) {
        setYourTurn(true);
      } else {
        setYourTurn(false);
      }
    }
  }

  const checkWinner = () => {
    let amountOfPlayersLeft = 0;
    let winner = undefined;
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (checkOutOfDice(player.hand) === false) {
        winner = player;
        amountOfPlayersLeft++;
      }
    }

    return (amountOfPlayersLeft === 1 ? winner : undefined);
  }

  const calcNextPlayer = (currentPlayer) => {
    let playerIndex = currentPlayer.id;
    if (playerIndex >= players.length) {
      playerIndex = 0;
    }
    let nextPlayer = players[playerIndex];

    let isOut = checkOutOfDice(nextPlayer.hand);

    while (isOut === true) {
      playerIndex = playerIndex + 1;
      if (playerIndex >= players.length) {
        playerIndex = 0;
      }
      nextPlayer = players[playerIndex];
      isOut = checkOutOfDice(nextPlayer.hand);
    }
    return nextPlayer;
  }

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );}

  const calcBotTurn = async () => {
    const nextPlayer = turns[turns.length -1].nextPlayer;
    const botWait = randomInt(longWait) + mediumWait;
    await timeout(botWait);
    const bet = calcBotMove(turns, amountOfActiveDice(), nextPlayer);
    submitBet(bet.amount, bet.fv, nextPlayer);
  }

  const amountOfDiceTotal = () => {
    let amountOfDiceTotal = 0;
    for (let i = 0; i < players.length; i++) {
      amountOfDiceTotal = amountOfDiceTotal + players[i].hand.length;
    }
    return amountOfDiceTotal;
  }

  const isValidBet = (amount, fv) => {
    const currentTurn = turns[turns.length - 1];
    if (amount === -1 && fv === -1) {
      return true;
    }

    if (amount < currentTurn.amount) {
      return false;
    }

    if (amount === currentTurn.amount) {
      if (fv <= currentTurn.fv) {
        return false;
      }
    }

    return true;
  }

  const checkIsLying = async () => {
    const currentTurn = turns[turns.length - 1];
    const fv = currentTurn.fv;
    const amount = currentTurn.amount;

    let amntFound = 0;

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      player.hand.forEach((dice) => {
        if (dice.fv === fv && dice.disabled === false) {
          amntFound++;
        }
      })
    }

    await printLog(`There are `, fv, amntFound, ' !!!')

    if (amntFound >= amount) {
      return false;
    } else {
      return true;
    }
  }

  // const playNextNoteTwoOctaves = (num) => {
  //   switch(num) {
  //     case 1: 
  //       playNoteD2();
  //       break;
  //     case 2: 
  //       playNoteE2();
  //       break;
  //     case 3: 
  //       playNoteF2();
  //       break;      
  //     case 4: 
  //       playNoteG2();
  //       break;      
  //     case 5: 
  //       playNoteA2();
  //       break;      
  //     case 6: 
  //       playNoteB2();
  //       break;
  //     case 7: 
  //       playNoteC2();
  //       break;
  //     case 8: 
  //       playNoteD3();
  //       break;
  //     case 9: 
  //       playNoteE3();
  //       break;
  //     case 10: 
  //       playNoteF3();
  //       break;
  //     case 11: 
  //       playNoteG3();
  //       break;
  //     case 12: 
  //       playNoteA3();
  //       break;
  //     case 13: 
  //       playNoteB3();
  //       break;
  //     case 14: 
  //       playNoteC3();
  //       break;
  //     case 15: 
  //       playNoteD4();
  //       break;
  //     default: 
  //       playNoteD4();
  //       break;
  //   }
  // }

  const playNextNote = (num) => {
    switch(num) {
      case 1: 
        playNoteD3();
      break;
      case 2: 
        playNoteE3();
      break;
      case 3: 
        playNoteF3();
        break;
      case 4: 
        playNoteG3();
        break;      
      case 5: 
        playNoteA3();
        break;      
      case 6: 
        playNoteB3();
        break;      
      case 7: 
        playNoteC3();
        break;
      case 8: 
        playNoteD4();
        break;
      // case 8: 
      //   playNoteD4();
      //   break;
      // case 9: 
      //   playNoteE4();
      //   break;
      // case 10: 
      //   playNoteF4();
      //   break;
      // case 11: 
      //   playNoteG4();
      //   break;
      // case 12: 
      //   playNoteA4();
      //   break;
      // case 13: 
      //   playNoteB4();
      //   break;
      // case 14: 
      //   playNoteC4();
      //   break;
      // case 15: 
      //   playNoteD5();
      //   break;
      default: 
        playNoteD4();
        break;
    }
  }

  const rerollDice = () => {
    const playersArray = [...players];
    const newPlayers = [];

    playersArray.forEach((player) => {
      const newHand = player.hand.map((dice) => {
        const newFv = randomInt(5) + 1;
        let visible = false;

        return {
          fv: newFv,
          visible: visible,
          disabled: dice.disabled,
          highlight: false,
          highlightColor: Styles.colors.red,
          hasArrow: false,
        }
      })

      let playerClone = Object.assign({}, player);
      playerClone.hand = newHand;
      newPlayers.push(playerClone);
    })

    playRerollSound();
    setPlayers(newPlayers);
  }

  const nextTurn = async (amount, fv, currentPlayer) => {
    const currentTurn = turns[turns.length - 1];
    playNextTurnSound()
    const nextPlayer = calcNextPlayer(currentPlayer);
    const newTurnNumber = currentTurn.number + 1;
    const newTurn = {
      number: newTurnNumber,
      amount: amount,
      fv: fv,
      player: currentPlayer,
      nextPlayer: nextPlayer,
    }

    await printLog(`${newTurn.player.name}: `, newTurn.fv, newTurn.amount);
    setTurns(turns => [...turns, newTurn]);
    timeout(mediumWait);

    if (nextPlayer.id === 1) {
      setYourTurn(true);
    } else {
      setYourTurn(false);
    }
  }

  const handleClickSubmit = async (amount, fv) => {
    if (isValidBet(amount, fv)) {
      submitBet(amount, fv, players[0]);
    }
  }

  const checkOutOfDice = (hand) => {
    for(let i = 0; i < hand.length; i++) {
      if (hand[i].disabled === false) {
        return false;
      }
    }

    return true;
  }

  const amountOfActiveDice = () => {
    let amount = 0;
    for(let i = 0; i < players.length; i++) {
      let hand = players[i].hand;

      for(let k = 0; k < hand.length; k++) {
        if (hand[k].disabled === false) {
          amount++;
        }
      }
    }

    return amount;
  }

  const disableDice = (hand) => {
    for (let i = hand.length - 1; i >= 0; i--) {
      if (hand[i].disabled === false) {
        hand[i].disabled = true;
        return;
      }
    }
  }

  const loopBack = async (ms) => {
    await timeout(ms);
    await revealNextDice();
  }

  const revealNextDice = async () => {
    const currentTurn = turns[turns.length - 1];
    const fv = currentTurn.fv;
    const amount = currentTurn.amount;
    const playersArray = [...players];
    let foundInvisible = false;

    for (let i = 0; i < playersArray.length; i++) {
      const player = playersArray[i];
      let hand = [...player.hand];

      for (let y = 0; y < hand.length; y++) {
        if (hand[y].disabled === false && hand[y].visible === false) {
          hand[y].visible = true;
          hand[y].hasArrow = true;

          if (y > 0) {
            hand[y-1].hasArrow = false;
          } else {
            if (i > 0) {
              const handToUpdate =  playersArray[i - 1].hand;
              handToUpdate.forEach((dice) => {
                dice.hasArrow = false;
              })
            }
          }

          foundInvisible = true;
          player.hand = hand;

          const isLyingFv = (hand[y].fv === fv);

          if (isLyingFv) {
            hand[y].highlight = true;
          }

          if (calcAmountFound() >= amount) {
            for (let z = 0; z < playersArray.length; z++) {
              let playerHand = playersArray[z].hand;
              for (let p = 0; p < playerHand.length; p++) {
                playerHand[p].highlightColor = Styles.colors.green;
              }
            }
          }

          setPlayers(playersArray);

          if (isLyingFv) {
            playNextNote(calcAmountFound());
          } else {
            playShowDiceSound();
          }
          let loopBackTime = tinyWait;

          if(isLyingFv){
            loopBackTime = loopBackTime * 2;
          }
          loopBackTime = Math.floor(loopBackTime);

          await loopBack(loopBackTime);
        }

      }
    }

    if (foundInvisible === false) {
      await endChallenge();
    }
  }

  const startChallenge = async () => {
    playChallengeSound(); 
    const currentTurn = turns[turns.length - 1];
    const player = currentTurn.player;
    const nextPlayer = currentTurn.nextPlayer;
    await printLog(`${nextPlayer.name} challenged ${player.name} on `, currentTurn.fv, currentTurn.amount);
    setIsChallenge(true);
    await timeout(mediumWait);
    await revealNextDice();
  }

  const endChallenge = async () => {
    const currentTurn = turns[turns.length - 1];
    const player = currentTurn.player;
    const nextPlayer = currentTurn.nextPlayer;
    const playersArray = [...players];
    let lyingPlayer = playersArray[nextPlayer.id-1];

    const isLying = await checkIsLying();
    if (isLying === true) {
      lyingPlayer = playersArray[player.id-1];
    } 
    await timeout(mediumWait);

    disableDice(lyingPlayer.hand);
    playLoseDiceSound();

    await printLog(`${lyingPlayer.name} lost a dice.`);
    await timeout(mediumWait);

    if (lyingPlayer.id === 1) {
      playloseBetSound();
    } else if (player.id === 1 | nextPlayer.id === 1) {
      playWinBetSound();
    }
    if (checkOutOfDice(lyingPlayer.hand)) {
      await printLog(`${lyingPlayer.name} is out of the game.`);
    }
    await timeout(mediumWait);


    await nextRound(lyingPlayer);
    setDefaultAmount(1); 
  }

  const submitBet = async (amount, fv) => {
    const isCall = (amount === -1 && fv === -1);
    const currentTurn = turns[turns.length - 1];
    const player = currentTurn.player;
    const nextPlayer = currentTurn.nextPlayer;

    if (isCall) {
      startChallenge();
    } else {
      setDefaultAmount(defaultAmount + 1);
      nextTurn(amount, fv, nextPlayer);
    }
  }

  const renderedPlayer = (playerNumber) => {
    const currentTurn = turns[turns.length - 1];
    let turnToShow = currentTurn;

    const player = players[playerNumber - 1];
    if (player === undefined) {
      return null;
    } else {
      const isYou = player.id === 1;
      let opacity = 1;
      const isActive = (player.id === currentTurn.nextPlayer.id);
      let isSecondary = false;
      let isTertiary = false;

      if (turns.length > 1) {
        const prevTurn = turns[turns.length - 2];
        isSecondary = (player.id === currentTurn.player.id);

        if (isSecondary) {
          turnToShow = currentTurn;
        }
        if (turns.length > 2 && !isChallenge) {
          isTertiary = (player.id === prevTurn.player.id);
          if (isTertiary) {
            opacity = 0.8;
            turnToShow =  prevTurn;
          }
        }
      }

      const isShowingTurn = (isTertiary | isSecondary);
      const isShowingChallenge = (isChallenge && (player.id === currentTurn.player.id | player.id === currentTurn.nextPlayer.id))
      
      return (
        <PlayerDisplay
          isChallenge={isShowingChallenge}
          key={`playerDisplay${playerNumber}`}
          turn={turnToShow}
          turnOpacity={opacity}
          showTurn={isShowingTurn}
          isActive={isActive}
          player={player}>
        </PlayerDisplay>
    )};
  }

  const calcAmountFound = () => {
    let amountFound = 0;
    for (let i = 0; i < players.length; i++) {
      let hand = players[i].hand;

      for (let k = 0; k < hand.length; k++) {
        if (hand[k].highlight === true) {
          amountFound++;
        }
      }
    }

    return amountFound;
  }

  const renderCells = () => {
    const amountOfPlayers = players.length;
    const renderedCells = [];
    const currentTurn = turns[turns.length - 1];

    const emptyCell = (i) => {
      return <EmptyCell key={`emptyCell${i}`}></EmptyCell>
    }


    

    const renderedCenterDisplay = () => {
      return <CenterDisplay 
        log={log}
        amountOfPlayers={settings.players.length}
        amountFound={calcAmountFound()}
        key="centerDisplay" 
        isChallenge={isChallenge} 
        turn={currentTurn}>
      </CenterDisplay>
    }

    switch(amountOfPlayers) {
      case 1: 
        break;
      default:
        break;
      case 2: 
        renderedCells.push(emptyCell(1));
        renderedCells.push(renderedPlayer(2));
        renderedCells.push(emptyCell(2));
        renderedCells.push(emptyCell(3));
        renderedCells.push(renderedCenterDisplay());
        renderedCells.push(emptyCell(4));
        renderedCells.push(emptyCell(5));
        renderedCells.push(renderedPlayer(1));
        renderedCells.push(emptyCell(6));
        break;
      case 3: 
        renderedCells.push(emptyCell(1));
        renderedCells.push(renderedPlayer(3));
        renderedCells.push(emptyCell(2));
        renderedCells.push(renderedPlayer(2));
        renderedCells.push(renderedCenterDisplay());
        renderedCells.push(emptyCell(3));
        renderedCells.push(emptyCell(5));
        renderedCells.push(renderedPlayer(1));
        renderedCells.push(emptyCell(6));
        break;
      case 4: 
        renderedCells.push(emptyCell(1));
        renderedCells.push(renderedPlayer(3));
        renderedCells.push(emptyCell(2));
        renderedCells.push(renderedPlayer(2));
        renderedCells.push(renderedCenterDisplay());
        renderedCells.push(renderedPlayer(4));
        renderedCells.push(emptyCell(5));
        renderedCells.push(renderedPlayer(1));
        renderedCells.push(emptyCell(6));
        break;
      case 5: 
        renderedCells.push(renderedPlayer(3));
        renderedCells.push(renderedPlayer(4));
        renderedCells.push(renderedPlayer(5));
        renderedCells.push(renderedPlayer(2));
        renderedCells.push(renderedCenterDisplay());
        renderedCells.push(emptyCell(1));
        renderedCells.push(emptyCell(5));
        renderedCells.push(renderedPlayer(1));
        renderedCells.push(emptyCell(6));
        break;
      case 6: 
        renderedCells.push(renderedPlayer(3));
        renderedCells.push(renderedPlayer(4));
        renderedCells.push(renderedPlayer(5));
        renderedCells.push(renderedPlayer(2));
        renderedCells.push(renderedCenterDisplay());
        renderedCells.push(renderedPlayer(6));
        renderedCells.push(emptyCell(5));
        renderedCells.push(renderedPlayer(1));
        renderedCells.push(emptyCell(6));
        break;
    }

    return renderedCells;
  }

  const currentTurn = turns[turns.length - 1];

  return (
    <Wrapper>
          <UIGrid>
            <BetSubmitter 
              canCall={currentTurn.fv > 0} 
              disabled={!yourTurn} 
              defaultFv={defaultFv} 
              defaultAmount={defaultAmount} 
              onSubmit={handleClickSubmit}>
            </BetSubmitter>
          </UIGrid>
      <GameGrid>
        {renderCells()}
      </GameGrid>
    </Wrapper>
  );
}

export default GamePage;
