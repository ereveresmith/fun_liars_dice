import React, {useState, useEffect} from 'react';
import Button from '../components/Button';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import CenterDisplay from '../components/CenterDisplay';
import PlayerDisplay from '../components/PlayerDisplay'
import BetSubmitter from '../components/BetSubmitter'

const LogContainer = Styled.div`
  overflow: scroll;
  display: grid;
  padding: 24px;
  border: 1px solid blue;
  grid-auto-flow: row;
  grid-template-rows: min-content;
`

const EmptyCell = Styled.div`
  display: grid;
  width: 100%;
  border: 2px solid ${Styles.colors.darkGrey  };
  background-color: ${Styles.colors.lightGrey  };
  height: 240px;
  min-width: 200px;
`

const StyledMessage = Styled.span`
  font-size: 16px;
  height: 20px;
  max-width: 160px;
  overflow: hidden;
  font-weight: 500;
  color: ${Styles.colors.darkPurple};
`

const GameContainer = Styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 10% 15% 0 15%;
  width: 70%;
  `

const GameGrid = Styled.div`
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: auto auto auto;
`

const ToolsGrid = Styled.div`
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
`

const generatePlayers = () => {
  const NUM_PLAYERS = 6;

  // const you = 
}

const initialPlayers = [
  {name: 'YOU', id: 1, hand: [1, 2, 3, 4, 5]},
  {name: 'Jenkins', id: 2, hand: [5]},
  {name: 'Rich', id: 3, hand: [6, 6]},
  {name: 'Joseph', id: 4, hand: [1]},
  {name: 'Dice Expert', id: 5, hand: [1, 2, 6, 6]},
  {name: 'Jorg 8', id: 6, hand: [2]},
]

const initialTurn = {
  number: 1,
  amount: 0,
  fv: 0,
  player: {id: 0},
  nextPlayer: {
    name: "YOU",
    id: 1,
  }
}

const GamePage = (props) => {
  const [isStarted, setIsStarted] = useState(true);
  const [players, setPlayers] = useState(initialPlayers);
  const [isShowingAllDice, setIsShowingAllDice] = useState(false);
  const [turns, setTurns] = useState([initialTurn]);
  const [log, setLog] = useState(['Starting Game', 'Your Turn']);

  const printLog = (message) => {
    console.log("LOG: " + message);
    setLog(log => [...log, message]);
  }

  const nextRound = (currentPlayer) => {
    let nextPlayer = currentPlayer;

    if (currentPlayer.hand.length === 0) {
      nextPlayer = calcNextPlayer(currentPlayer);
    } 

    if (checkWin()) {
      setIsStarted(false);
    } else {
      const number = turns.length + 1;

      const newTurn = {
        number: number,
        amount: 0,
        fv: 0,
        player: {id: 0},
        nextPlayer: nextPlayer,
      }
      setTurns(turns => [...turns, newTurn]);
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


  const nextTurn = (amount, fv, currentPlayer) => {
    const number = turns.length + 1;
    const nextPlayer = calcNextPlayer(currentPlayer);

    const newTurn = {
      number: number,
      amount: amount,
      fv: fv,
      player: currentPlayer,
      nextPlayer: nextPlayer,
    }

    printLog(`${nextPlayer.name}'s Turn`)
    setTurns(turns => [...turns, newTurn]);
  }

  const isValidBet = (amount, fv) => {
    const currentTurn = turns[turns.length - 1];
    return true;
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
    setIsShowingAllDice(true);
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
    setIsShowingAllDice(false);
  }

  const handleSubmitBet = (amount, fv) => {
    const isCall = (amount === -1 && fv === -1);

    if (isCall) {
      const currentTurn = turns[turns.length - 1];
      const player = currentTurn.player;
      const nextplayer = currentTurn.nextPlayer;
      const playersArray = [...players];
      let lyingPlayer = playersArray[nextplayer.id-1];

      printLog(`${nextplayer.name} challenged ${player.name}`);

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
    } else if (isValidBet(amount, fv)) {
      const nextPlayer = turns[turns.length - 1].nextPlayer;
      nextTurn(amount, fv, nextPlayer);
    } else {
      console.log("Invalid turn!")
    }
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

    const player = players[playerNumber - 1];
    if (player === undefined) {
      return <EmptyCell ></EmptyCell>
    } else {
      const isShowingDice = (isShowingAllDice | player.id === 1);
      const isActive = (player.id === currentTurn.nextPlayer.id);
      const isSecondary = (player.id === currentTurn.player.id);
      return (
        <PlayerDisplay
          key={`playerDisplay${playerNumber}`}
          turn={currentTurn}
          isActive={isActive}
          isSecondary={isSecondary}
          player={players[playerNumber-1]}
          showDice={isShowingDice}>
        </PlayerDisplay>
    )};
    }



  const renderedLog = () => {
    const logItems = log.map((message, index) => {
      return <StyledMessage key={`message${index}`}>{message}</StyledMessage>
    })

    return <LogContainer>{logItems}</LogContainer>


  }

  const renderGame = () => {
    const renderedCells = [];

    const currentTurn = turns[turns.length - 1];
    renderedCells.push(renderPlayerCell(3));
    renderedCells.push(renderPlayerCell(4));
    renderedCells.push(renderPlayerCell(5));

    renderedCells.push(renderPlayerCell(2));
    renderedCells.push(<CenterDisplay key="centerDisplay" turn={currentTurn}></CenterDisplay>);
    renderedCells.push(renderPlayerCell(6));

    renderedCells.push(<EmptyCell key="logDisplay">
      {renderedLog()}
    </EmptyCell>);
    renderedCells.push(renderPlayerCell(1));
    renderedCells.push(<EmptyCell key="betDisplay">
      <BetSubmitter onSubmit={handleSubmitBet}></BetSubmitter>
    </EmptyCell>);

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
