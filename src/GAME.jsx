import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import CenterDisplay from './components/CenterDisplay';
import PlayerDisplay from './components/PlayerDisplay';
import BetSubmitter from './components/BetSubmitter';
import { calcBotMove } from './util/Bot';
import { randomInt, YOU } from './util/Helper';

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
  number: 1,
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
  const [yourTurn, setYourTurn] = useState(true);
  const [isChallenge, setIsChallenge] = useState(false);

  useEffect(() => {
    if (turns[turns.length-1].nextPlayer.id !== 1) {
      calcBotTurn();
    }
  }, [turns]);

  const restartGame = (settings) => {
    setPlayers(settings.players);
    setTurns([initialTurn]);
    printLog('Starting a new game');
    setDefaultAmount(1);
    setDefaultFv(1);
    setYourTurn(true);
    rerollDice();
    setIsChallenge(false);
  }

  useEffect(() => {
    restartGame(settings);
  }, [settings])

  const printLog = (value, fv, amount) => {
    setLog(log => [...log, {value: value, fv: fv, amount: amount}]);
  }

  const nextRound = (currentPlayer) => {
    printLog("New round, new dice!")
    let nextPlayer = currentPlayer;

    if (checkOutOfDice(currentPlayer.hand)) {
      nextPlayer = calcNextPlayer(currentPlayer);
    } 

    if (checkWin()) {
      let winner = undefined;
      for (let i = 0; i < players.length; i++) {
        const player = players[i];
        if (player.hand.length) {
          winner = player;
        }
      }
      printLog(`${winner.name} has won the game!`)

    } else {
      const number = turns.length + 1;

      const newTurn = {
        number: number,
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

  const checkWin = () => {
    let amountOfPlayersLeft = 0;
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (checkOutOfDice(player.hand) === false) {
        amountOfPlayersLeft++;
      }
    }

    return amountOfPlayersLeft === 1;
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
    const botWait = randomInt(2300) + 800;
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

  const isLiar = async () => {
    const currentTurn = turns[turns.length - 1];
    const fv = currentTurn.fv;
    const amount = currentTurn.amount;

    let amountFound = 0;

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      player.hand.forEach((dice) => {
        if (dice === fv) {
          amountFound++;
        }
      })
    }

    await timeout(1000);
    await printLog(`There are ${amountFound} `, fv, amountFound)
    await timeout(4000);

    if (amountFound >= amount) {
      return false;
    } else {
      return true;
    }
  }

  const rerollDice = () => {
    const playersArray = [...players];

    playersArray.forEach((player) => {
      const newHand = player.hand.map((dice) => {
        const newFv = randomInt(5) + 1;

        const isYou = player.id === 1;
        let visible = false;
        if (isYou) {
          visible = true;
        }

        return {
          fv: newFv,
          visible: visible,
          disabled: dice.disabled,
        }
      })

      player.hand = newHand;
    })
    setPlayers(playersArray);
    setIsChallenge(false);
  }

  const nextTurn = async (amount, fv, currentPlayer) => {
    const number = turns.length + 1;
    const nextPlayer = calcNextPlayer(currentPlayer);
    const newTurn = {
      number: number,
      amount: amount,
      fv: fv,
      player: currentPlayer,
      nextPlayer: nextPlayer,
    }

    printLog(`${newTurn.amount}`, newTurn.fv, newTurn.amount);
    await timeout(400);

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

  const disableDice = (hand) => {
    for (let i = hand.length - 1; i >= 0; i--) {
      if (hand[i].disabled === false) {
        hand[i].disabled = true;
        return;
      }
    }
  }

  const submitBet = async (amount, fv) => {
    const isCall = (amount === -1 && fv === -1);
    const currentTurn = turns[turns.length - 1];
    const player = currentTurn.player;
    const nextPlayer = currentTurn.nextPlayer;

    if (isCall) {
      const playersArray = [...players];
      let lyingPlayer = playersArray[nextPlayer.id-1];

      const emptyObj = {};

      const newPlayer = Object.assign(emptyObj, lyingPlayer);
      lyingPlayer = newPlayer;
    
      printLog(`${nextPlayer.name} challenged ${player.name}`);
      setIsChallenge(true);
      
      for (let i = 0; i < players.length; i++) {
        let hand = players[i].hand;
  
        for (let y = 0; y < hand.length; y++) {
          hand[y].visible = true;
          await timeout(2000);
        }
      }
  
      if (isLiar()) {
        lyingPlayer = playersArray[player.id-1];
      } 

      await timeout(2000);

      disableDice(lyingPlayer.hand);
      let isOutOfDice = checkOutOfDice(lyingPlayer.hand);

      printLog(`${lyingPlayer.name} lost a dice!`);

      if (isOutOfDice) {
        printLog(`${lyingPlayer.name} is out of the game!`);
      }
      playersArray[player.id-1] = lyingPlayer;
      setPlayers(playersArray);
      rerollDice();
      await timeout(3000);
      nextRound(lyingPlayer);
      setDefaultAmount(1); 
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
