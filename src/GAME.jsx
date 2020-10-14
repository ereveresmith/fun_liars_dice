import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import CenterDisplay from './components/CenterDisplay';
import PlayerDisplay from './components/PlayerDisplay';
import BetSubmitter from './components/BetSubmitter';
import LogContainer from './components/LogContainer';
import { mockPlayers, YOU } from './util/Constants';
import { calcBotMove } from './util/Bot';

const EmptyCell = Styled.div`
  display: grid;
  width: 100%;
  border: 1px solid ${Styles.colors.darkGrey};
  background-color: ${Styles.colors.lightGrey};
  opacity: 0;
  height: 240px;
  min-width: 200px;
`

const ToolsCell = Styled.div`
  display: grid;
  width: 100%;
  height: 240px;
  min-width: 200px;
`

const GameContainer = Styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 4% 12% 0 12%;
  `

const GameGrid = Styled.div`
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: auto auto auto;
  grid-gap: 12px;
`

const initialPlayers = [YOU, ...mockPlayers];

const initialTurn = {
  number: 1,
  amount: 0,
  fv: 0,
  player: {id: 0},
  nextPlayer: YOU,
}

const GamePage = (props) => {
  const [isStarted, setIsStarted] = useState(true);
  const [players, setPlayers] = useState(initialPlayers);
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
  }, [turns])

  const printLog = (message) => {
    setLog(log => [...log, message]);
  }

  const nextRound = (currentPlayer) => {
    let nextPlayer = currentPlayer;

    if (currentPlayer.hand.length === 0) {
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
      if (player.hand.length) {
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

    while (nextPlayer.hand.length === 0) {
      playerIndex = playerIndex + 1;
      if (playerIndex >= players.length) {
        playerIndex = 0;
      }
      nextPlayer = players[playerIndex];
    }
    return nextPlayer;
  }

  function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );}

  const calcBotTurn = async () => {
    const botWait = randomInt(1300) + 800;
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

  const isLiar = () => {
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

    printLog(`${amountFound} ${fv}'s found`)

    if (amountFound >= amount) {
      return false;
    } else {
      return true;
    }
  }

  const randomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  }

  const rerollDice = () => {
    const playersArray = [...players];

    playersArray.forEach((player) => {
      const newHand = player.hand.map((dice) => {
        return randomInt(5) + 1;
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

    printLog(`${currentPlayer.name}: ${newTurn.amount} ${newTurn.fv}`)
    await timeout(100);

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

  const submitBet = async (amount, fv) => {
    const isCall = (amount === -1 && fv === -1);
    const currentTurn = turns[turns.length - 1];
    const player = currentTurn.player;
    const nextPlayer = currentTurn.nextPlayer;

    if (isCall) {
      const playersArray = [...players];
      let lyingPlayer = playersArray[nextPlayer.id-1];
    
      printLog(`${nextPlayer.name} challenged ${player.name}`);
      setIsChallenge(true);
      await timeout(5000);
  
      if (isLiar()) {
        lyingPlayer = playersArray[player.id-1];
      } 
  
      lyingPlayer.hand.pop();
      printLog(`${lyingPlayer.name} lost a dice!`);
      if (lyingPlayer.hand.length === 0) {
        printLog(`${lyingPlayer.name} is out of the game!`);
      }
      setPlayers(playersArray);
      rerollDice();
      nextRound(lyingPlayer);
      resetDefaults();  
    } else {
      upDefaults();
      nextTurn(amount, fv, nextPlayer);
    }
  }

  const resetDefaults = () => {
    setDefaultAmount(1); 
    setDefaultFv(1);
  }

  const upDefaults = () => {
    const currentTurn = turns[turns.length - 1];
    let newDefaultFv = currentTurn.fv + 1;
    let newDefaultAmount = currentTurn.amount;
    if (newDefaultAmount === 0) {newDefaultAmount++}
    if (newDefaultFv > 5) {
      newDefaultFv = 1;
      newDefaultAmount++;
    }
    setDefaultFv(newDefaultFv);
    setDefaultAmount(newDefaultAmount);
  }
  
  const startGame = () => {
    setTurns([initialTurn]);
    setPlayers(initialPlayers)
    setIsStarted(true);
  }

  const renderStartScreen = () => {
    return (
        <Button onClick={startGame} label="Start New Game"></Button>
    )
  }

  const renderPlayerCell = (playerNumber) => {
    const currentTurn = turns[turns.length - 1];
    let turnToShow = currentTurn;

    const player = players[playerNumber - 1];
    if (player === undefined) {
      return <EmptyCell ></EmptyCell>
    } else {
      const isShowingDice = (isChallenge | player.id === 1);
      let opacity = 1;
      const isActive = (player.id === currentTurn.nextPlayer.id);
      // const isActive = true;
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
          player={player}
          showDice={isShowingDice}>
        </PlayerDisplay>
    )};
  }

  const renderGame = () => {
    const renderedCells = [];

    const currentTurn = turns[turns.length - 1];

    renderedCells.push(renderPlayerCell(3));
    renderedCells.push(renderPlayerCell(4));
    renderedCells.push(renderPlayerCell(5));

    renderedCells.push(renderPlayerCell(2));
    renderedCells.push(<CenterDisplay key="centerDisplay" isChallenge={isChallenge} turn={currentTurn}></CenterDisplay>);
    renderedCells.push(renderPlayerCell(6));

    renderedCells.push(<ToolsCell key="logDisplay">
      <LogContainer log={log}></LogContainer>
    </ToolsCell>);
    renderedCells.push(renderPlayerCell(1));
    renderedCells.push(<ToolsCell key="betDisplay">
      <BetSubmitter canCall={currentTurn.fv > 0} disabled={!yourTurn} defaultFv={defaultFv} defaultAmount={defaultAmount} onSubmit={handleClickSubmit}></BetSubmitter>
    </ToolsCell>);

    return (
      <GameGrid>
        {renderedCells}
      </GameGrid>
    )
  }

  return (
    <div>
      <GameContainer>
        {isStarted ? renderGame() : renderStartScreen()}
      </GameContainer>
    </div>
  );
}

export default GamePage;
