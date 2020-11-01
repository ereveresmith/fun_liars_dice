import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import { mockPlayers, YOU, randomInt, mockNames, mockBot, defaultSettings } from './util/Helper';
import useSound from 'use-sound';
import { Sounds, Notes } from './util/Sounds';

const Wrapper = Styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 4px;
  `

  const Label = Styled.span`
    font-size: ${Styles.fontSizes.medium};
    align-self: center;
    text-align: left;
  `

const GridDiv = Styled.div`
  display: grid;
  margin: 8px;
`

const StyledInput = Styled.input`
  margin: 4px 0;
  font-size: ${Styles.fontSizes.medium};
  `

const SettingsPage = (props) => {
  const [amountOfPlayers, setAmountOfPlayers] = useState(defaultSettings.amountOfPlayers);
  const [name, setName] = useState(defaultSettings.name);
  const [handSize, setHandSize] = useState(defaultSettings.handSize);

  const randomName = () => {
    const int = randomInt(mockNames.length);
    return mockNames[int];
  }

  const colorsArray = [
    Styles.colors.purple,
    Styles.colors.orange,
    Styles.colors.blue,
    Styles.colors.pink,
    Styles.colors.orange,
    Styles.colors.blue,
  ]

  const generatePlayers = () => {
    let players = [];
    let hand = [];

    for (let i = 0; i< handSize; i++) {
      const diceObj = {
        fv: 0,
        visible: true,
        disabled: false,
        highlight: false,
        hasArrow: false,
        found: false,
        highlightColor: Styles.colors.green,
      }
      hand.push(diceObj);
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

  //yo
  const handleChangeHandSize = (e) => {
    setHandSize(e.target.value);
  }

  const handleChangeName = (e) => {
    setName(e.target.value);
  }

  return (
    <div>
      <Wrapper>
        <h1>Tiny Liar's Dice</h1>
        <GridDiv>
          A simple Liar's Dice web game made by Ethan.
          Beta Test (still a work in progress)
        </GridDiv>
        <GridDiv>
          <Label>Your Name:</Label>
          <StyledInput value={name} label={"Your Name"} onChange={handleChangeName}></StyledInput>
        </GridDiv>
        <GridDiv>
          <Label># of Players</Label>
          <StyledInput value={amountOfPlayers} label={"Amount of players"} onChange={handleChangePlayers}></StyledInput>
        </GridDiv>
        <GridDiv>
          <Label>Dice Per Player:</Label>
          <StyledInput value={handSize} label={"Hand Size"} onChange={handleChangeHandSize}></StyledInput>
        </GridDiv>
        <Button label="Start Game" onClick={handleSubmit}></Button>
      </Wrapper>
    </div>
  );
}

export default SettingsPage;
