import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import { mockPlayers, YOU, randomInt, mockNames, mockBot } from './util/Helper';

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

const SettingsPage = (props) => {
  const [amountOfPlayers, setAmountOfPlayers] = useState(4);
  const [name, setName] = useState("Ethan");
  const [handSize, setHandSize] = useState(2);

  const randomName = () => {
    const int = randomInt(mockNames.length);
    return mockNames[int];
  }

  const colorsArray = [
    Styles.colors.purple,
    Styles.colors.green,
    Styles.colors.orange,
    Styles.colors.blue,
    Styles.colors.red,
    Styles.colors.pink,
  ]

  const generatePlayers = () => {
    let players = [];
    let hand = [];

    for (let i = 0; i< handSize; i++) {
      hand.push(0);
    }

    for (let i = 0; i < amountOfPlayers; i++) {
      players.push({
        name: (i==0) ? name : randomName(), 
        id: i+1, 
        hand: hand, 
        color: colorsArray[i],
      })
    }

    return players;
  }

  const handleSubmit = () => {
    const generatedPlayers = generatePlayers();

    const gameSettings = {
      players: [...generatedPlayers]
    }
    props.onSubmit(gameSettings);
  }

  const handleChangePlayers = (e) => {
    setAmountOfPlayers(e.target.value);
  }

  const handleChangeHandSize = (e) => {
    setHandSize(e.target.value);
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  return (
    <div>
      <Wrapper>
        <FlexDiv>
          Amount of players:
          <StyledInput value={amountOfPlayers} label={"Amount of players"} onChange={handleChangePlayers}></StyledInput>
        </FlexDiv>
        <FlexDiv>
          Hand Size:
          <StyledInput value={handSize} label={"Hand Size"} onChange={handleChangeHandSize}></StyledInput>
        </FlexDiv>
        <FlexDiv>
          Your Name:
          <StyledInput value={name} label={"Your Name"} onChange={handleChangeName}></StyledInput>
        </FlexDiv>
        <Button label="Start Game" onClick={handleSubmit}></Button>
      </Wrapper>
    </div>
  );
}

export default SettingsPage;
