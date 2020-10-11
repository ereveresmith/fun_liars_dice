import React, {useState, useEffect} from 'react';
import Button from '../components/Button';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import CenterDisplay from '../components/CenterDisplay';
import PlayerDisplay from '../components/PlayerDisplay'

const GameContainer = Styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 0 15%;
  width: 70%;
  `

const GameGrid = Styled.div`
  width: 100%;
  display: grid;
  justify-items: center;
  align-items: center;
  grid-template-columns: auto auto auto;
`

const Cell = Styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 2fr;
  border: 2px solid ${Styles.colors.darkGrey  };
  height: 240px;
  transition: background-color 50ms ease-out;

  &:hover {
    background-color: ${Styles.colors.lightGrey};
  }

  ${props => props.isActive && `
    border-color: ${Styles.colors.purple};
    background-color: ${Styles.colors.darkGrey};
  `}
`


const initialPlayers = [
  {name: 'YOU', id: 1, hand: [1, 2, 3, 4, 5], isYou: true},
  {name: 'Jenkins', id: 2, hand: []},
  {name: 'Rich', id: 3, hand: []},
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
  player: undefined,
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

  const handleSubmitBet = () => {
    const nextPlayer = turns[turns.length - 1].nextPlayer;
    nextTurn(5, 5, nextPlayer);
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
    return (
      <Cell key={`cell${playerNumber}`}>
        <PlayerDisplay 
          player={players[playerNumber-1]}
          showDice={isShowingAllDice}>
        </PlayerDisplay>
      </Cell>
    )};

  const renderGame = () => {
    const renderedCells = [];

    const currentTurn = turns[turns.length - 1];
    renderedCells.push(renderPlayerCell(4));
    renderedCells.push(renderPlayerCell(5));
    renderedCells.push(renderPlayerCell(6));

    renderedCells.push(renderPlayerCell(3));
    renderedCells.push(<Cell key={`cellCenter`}>
      <CenterDisplay turn={currentTurn}></CenterDisplay>
    </Cell>);
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
      <Button label={"Submit"} onClick={handleSubmitBet}></Button>
    </div>
  );
}

export default GamePage;
