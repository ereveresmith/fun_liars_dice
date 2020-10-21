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
  const [amountFound, setAmountFound] = useState(0);
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


  const shortWait = 500 * gameSpeed;
  const mediumWait = 1000 * gameSpeed;
  const longWait = 3000 * gameSpeed;

  useEffect(() => {
    if (turns[turns.length-1].nextPlayer.id !== 1) {
      calcBotTurn();
    }
  }, [turns]);

  const restartGame = async (settings) => {
    setPlayers(settings.players);
    setTurns([initialTurn]);
    await printLog('Starting a new game');
    setDefaultAmount(1);
    setDefaultFv(1);
    setYourTurn(true);
    rerollDice();
    setIsChallenge(false);
  }

  useEffect(() => {
    restartGame(settings);
  }, [settings])

  const printLog = async (value, fv, amount) => {
    timeout(shortWait);
    setLog(log => [...log, {value: value, fv: fv, amount: amount}]);
  }

  const nextRound = async (currentPlayer) => {
    await printLog("New round, new dice!");
    setIsChallenge(false);
    setAmountFound(0);
    rerollDice();
    let nextPlayer = currentPlayer;

    if (checkOutOfDice(currentPlayer.hand)) {
      nextPlayer = calcNextPlayer(currentPlayer);
    } 

    const winner = checkWinner();
    if (winner !== undefined) {
      await printLog(`${winner.name} has won the game!`);
    } else {
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
    const botWait = randomInt(mediumWait) + shortWait;
    await timeout(botWait);
    const bet = calcBotMove(turns, amountOfDice());
    submitBet(bet.amount, bet.fv, turns[turns.length -1].nextPlayer);
  }

  const amountOfDice = () => {
    let amountOfDice = 0;
    for (let i = 0; i < players.length; i++) {
      amountOfDice = amountOfDice + players[i].hand.length;
    }
    return amountOfDice;
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

    await printLog(`There are ${amntFound} `, fv, amntFound)

    if (amntFound >= amount) {
      return false;
    } else {
      return true;
    }
  }

  const playNextNote = (num) => {
    switch(num) {
      case 1: 
        playNoteD2();
        break;
      case 2: 
        playNoteE2();
        break;
      case 3: 
        playNoteF2();
        break;      
      case 4: 
        playNoteG2();
        break;      
      case 5: 
        playNoteA2();
        break;      
      case 6: 
        playNoteB2();
        break;
      case 7: 
        playNoteC2();
        break;
      case 8: 
        playNoteD3();
        break;
      case 9: 
        playNoteE3();
        break;
      case 10: 
        playNoteF3();
        break;
      case 11: 
        playNoteG3();
        break;
      case 12: 
        playNoteA3();
        break;
      case 13: 
        playNoteB3();
        break;
      case 14: 
        playNoteC3();
        break;
      case 15: 
        playNoteD4();
        break;
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
    
    const nextPlayer = calcNextPlayer(currentPlayer);
    const newTurnNumber = currentTurn.number + 1;
    const newTurn = {
      number: newTurnNumber,
      amount: amount,
      fv: fv,
      player: currentPlayer,
      nextPlayer: nextPlayer,
    }

    await printLog(`P${newTurn.player.id}: ${newTurn.amount}`, newTurn.fv, newTurn.amount);
    playNextNote(newTurnNumber);
    setTurns(turns => [...turns, newTurn]);

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

  const checkAmountOfDice = () => {
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
    const playersArray = [...players];
    let foundInvisible = false;

    const amountOfDice = checkAmountOfDice();

    for (let i = 0; i < playersArray.length; i++) {
      const player = playersArray[i];
      let hand = [...player.hand];

      for (let y = 0; y < hand.length; y++) {
        if (hand[y].disabled === false && hand[y].visible === false) {
          hand[y].visible = true;
          foundInvisible = true;
          player.hand = hand;

          const isLyingFv = (hand[y].fv === fv);

          if (isLyingFv) {
            setAmountFound(amountFound + 1);
            hand[y].highlight = true;
          }

          setPlayers(playersArray);
          const speedOffset = longWait;
          let loopBackTime = (speedOffset / amountOfDice) * gameSpeed;

          if(isLyingFv){
            loopBackTime = (loopBackTime * 1.5);
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
    const currentTurn = turns[turns.length - 1];
    const player = currentTurn.player;
    const nextPlayer = currentTurn.nextPlayer;
    await printLog(`${nextPlayer.name} challenged ${player.name}`);
    setIsChallenge(true);
    await timeout(shortWait);
    await revealNextDice();
  }

  const endChallenge = async () => {
    const currentTurn = turns[turns.length - 1];
    const player = currentTurn.player;
    const nextPlayer = currentTurn.nextPlayer;
    const playersArray = [...players];
    let lyingPlayer = playersArray[nextPlayer.id-1];

    if (checkIsLying()) {
      lyingPlayer = playersArray[player.id-1];
    } 

    await timeout(mediumWait);
    disableDice(lyingPlayer.hand);
    await printLog(`${lyingPlayer.name} lost a dice.`);
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
        amountFound={amountFound}
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
