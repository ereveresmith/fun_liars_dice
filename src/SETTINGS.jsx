import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import { mockPlayers, YOU, randomInt, mockNames, mockBot } from './util/Helper';
import useSound from 'use-sound';
import { Sounds, Notes } from './util/Sounds';

const Wrapper = Styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 24px;
  `

  const Label = Styled.span`
    font-size: ${Styles.fontSizes.large};
    align-self: center;
    text-align: left;
  `

const GridDiv = Styled.div`
  display: grid;
  margin: 24px;
`

const StyledInput = Styled.input`
  margin: 8px 0;
  font-size: ${Styles.fontSizes.large};
  `

const SettingsPage = (props) => {
  const [amountOfPlayers, setAmountOfPlayers] = useState(4);
  const [name, setName] = useState("Ethan");
  const [handSize, setHandSize] = useState(4);
  const [playRerollSound] = useSound(Sounds.reroll);


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
    playRerollSound();
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
        <h1>Ethan's Liar's Dice</h1>

        <h2>Settings</h2>
        <GridDiv>
          <Label>Your Name:</Label>
          <StyledInput value={name} label={"Your Name"} onChange={handleChangeName}></StyledInput>
        </GridDiv>
        <GridDiv>
          <Label># of Players</Label>
          <StyledInput value={amountOfPlayers} label={"Amount of players"} onChange={handleChangePlayers}></StyledInput>
        </GridDiv>
        <GridDiv>
          <Label>Hand Size:</Label>
          <StyledInput value={handSize} label={"Hand Size"} onChange={handleChangeHandSize}></StyledInput>
        </GridDiv>
        <Button label="Start Game" onClick={handleSubmit}></Button>
      </Wrapper>
    </div>
  );
}

export default SettingsPage;
