import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import { mockPlayers, YOU } from './util/Constants';

const Wrapper = Styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  align-content: center;
  margin: 25%;
  `


const FlexDiv = Styled.div`
  display: flex;
  margin: 24px;
`

const StyledInput = Styled.input`
  margin: 4px;
`

// const initialPlayers = [YOU, ...mockPlayers];

const SettingsPage = (props) => {
  const [amountOfPlayers, setAmountOfPlayers] = useState(5);
  const [name, setName] = useState("E Bro");

  const handleStartGame = () => {
    const gameSettings = {
      amountOfPlayers: amountOfPlayers,
      name: name,
    }
    props.onStart(gameSettings);
  }

  const handleChangePlayers = (e) => {
    setAmountOfPlayers(e.target.value);
    //TODO make sure its a number
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  return (
    <div>
      <Wrapper>
        <FlexDiv>
          Amount of players:
          <StyledInput label={"Amount of players"} onChange={handleChangePlayers}></StyledInput>
        </FlexDiv>
        <FlexDiv>
          Your Name:
          <StyledInput label={"Your Name"} onChange={handleChangeName}></StyledInput>
        </FlexDiv>
        <Button label="Start Game" onClick={handleStartGame}></Button>
      </Wrapper>
    </div>
  );
}

export default SettingsPage;
