import React, {useState, useEffect} from 'react';
import Button from '../components/Button';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import CenterDisplay from '../components/CenterDisplay';
import PlayerDisplay from '../components/PlayerDisplay'
import BetSubmitter from '../components/BetSubmitter'

const GameContainer = Styled.div`

  display: grid;
  justify-items: center;
  align-items: center;
  margin: 5% 15% 0 15%;
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

const initialPlayers = [
  {name: 'YOU', id: 1, hand: [1, 2, 3, 4, 5], isYou: true},
  {name: 'Jenkins', id: 2, hand: []},
  {name: 'Rich', id: 3, hand: [6, 6]},
  {name: 'Bri', id: 4, hand: []},
  {name: 'Joseph', id: 5, hand: [1]},
  {name: 'Mr. Bob', id: 6, hand: []},
  {name: 'Dice Expert', id: 7, hand: [1, 2, 6, 6]},
  {name: 'Jorg 8', id: 8, hand: []},
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

  const nextRound = (currentPlayer) => {
    if (currentPlayer.hand.length === 0) {

    } else {

    }
    const number = turns.length + 1;

    const nextTurn = {
      number: number,
      amount: 0,
      fv: 0,
      player: {id: 0},
      nextPlayer: currentPlayer,
    }

    const currentTurns = [...turns];
    currentTurns.push(nextTurn);
    console.log(nextTurn)
    setTurns(currentTurns);
  }

  const nextTurn = (amount, fv, currentPlayer) => {
    const number = turns.length + 1;

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

    const nextTurn = {
      number: number,
      amount: amount,
      fv: fv,
      player: currentPlayer,
      nextPlayer: nextPlayer,
    }

    const currentTurns = [...turns];
    currentTurns.push(nextTurn);
    console.log(nextTurn)
    setTurns(currentTurns);
  }

  const isValidBet = (amount, fv) => {
    const currentTurn = turns[turns.length - 1];
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
    console.log("Evaluating bet of " + amount + " " + fv);

    let amountFound = 0;

    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      player.hand.forEach((dice) => {
        if (dice === fv) {
          amountFound++;
        }
      })
    }

    console.log(`${amountFound} ${fv}'s found`)

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
        return 1;
      })

      player.hand = newHand;
    })
    setPlayers(playersArray);
  }

  const handleSubmitBet = (amount, fv) => {
    if (amount === -1 && fv === -1) {
      const currentTurn = turns[turns.length - 1];
      const playerId = currentTurn.player.id;
      const nextPlayerId = currentTurn.nextPlayer.id;
      const playersArray = [...players];
      let lyingPlayer = playersArray[nextPlayerId-1];

      if (isLiar()) {
        lyingPlayer = playersArray[playerId-1];
      } 

      lyingPlayer.hand.pop();
      console.log(`${lyingPlayer.name} is lying!`)
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
  
  const handleClickStartButton = () => {
    setTurns([initialTurn]);
    setIsStarted(true);
  }

  const renderStartScreen = () => {
    return (
        <Button onClick={handleClickStartButton} label="Start New Game"></Button>
    )
  }

  const renderPlayerCell = (playerNumber) => {
    const currentTurn = turns[turns.length - 1];
    const player = players[playerNumber - 1];
    const isShowingDice = (isShowingAllDice | player.id === 1);

    const isActive = (player.id === currentTurn.nextPlayer.id)
    const isSecondary = (player.id === currentTurn.player.id)

    return (
        <PlayerDisplay 
          turn={currentTurn}
          isActive={isActive}
          isSecondary={isSecondary}
          player={players[playerNumber-1]}
          showDice={isShowingDice}>
        </PlayerDisplay>
    )};

  const renderGame = () => {
    const renderedCells = [];

    const currentTurn = turns[turns.length - 1];
    renderedCells.push(renderPlayerCell(4));
    renderedCells.push(renderPlayerCell(5));
    renderedCells.push(renderPlayerCell(6));

    renderedCells.push(renderPlayerCell(3));
    renderedCells.push(<CenterDisplay turn={currentTurn}></CenterDisplay>);
    renderedCells.push(renderPlayerCell(7));

    renderedCells.push(renderPlayerCell(2));
    renderedCells.push(renderPlayerCell(1));
    renderedCells.push(renderPlayerCell(8));

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
      <ToolsGrid>
        <BetSubmitter onSubmit={handleSubmitBet}></BetSubmitter>
      </ToolsGrid>
    </div>
  );
}

export default GamePage;
