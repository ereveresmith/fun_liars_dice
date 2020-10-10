import React, {useState} from 'react';
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
  height: 100vh;
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
    background-color: ${Styles.colors.grey};
  }
`


const initialPlayers = [
  {name: 'Jorg', id: 1, hand: [1, 2]},
  {name: 'Jenkins', id: 2, hand: [1, 2, 3, 4, 5]},
  {name: 'Rich', id: 3, hand: [1, 2]},
  {name: 'Bri', id: 4, hand: [1]},
  {name: 'Joseph', id: 5, hand: [1]},
  {name: 'Mr. Bob', id: 6, hand: [1, 2, 3]},
  {name: 'YOU', id: 7, hand: [1, 2, 3, 4, 5], isYou: true},
  {name: 'Dice Expert', id: 8, hand: [1, 2, 6, 6]},
]

const GamePage = (props) => {
  const [isStarted, setIsStarted] = useState(true);
  const [players, setPlayers] = useState(initialPlayers);
  const [isShowingAllDice, setIsShowingAllDice] = useState(false);
  const [turns, setTurns] = useState([]);
  
  const handleClickStartButton = () => {
    setIsStarted(true);
  }

  const renderStartScreen = () => {
    return (
        <Button onClick={handleClickStartButton} label="Start New Game"></Button>
    )
  }

  const renderGame = () => {
    const numberOfCells = 8;
    const middleCell = 4;
    const renderedCells = [];

    for (let i = 0; i < numberOfCells; i++) {

      if (i === middleCell) {
        renderedCells.push(<Cell><CenterDisplay></CenterDisplay></Cell>);
      } 

      const showDice = isShowingAllDice | players[i].isYou;
      renderedCells.push(<Cell><PlayerDisplay player={players[i]} showDice={showDice}></PlayerDisplay></Cell>);
    }

    return (
      <GameGrid>
        {renderedCells};
      </GameGrid>
    )
  }

  return (
    <GameContainer>
      {isStarted ? renderGame() : renderStartScreen()}
    </GameContainer>
  );
}

export default GamePage;
