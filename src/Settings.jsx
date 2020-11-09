import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import { randomInt, mockNames, defaultSettings } from './util/Defaults';
import useSound from 'use-sound';
import { Sounds, Notes } from './util/Sounds';

const Wrapper = Styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 4px;
  `

  const Label = Styled.span`
    font-size: ${Styles.fontSizes.large};
    align-self: center;
    text-align: left;
    font-weight: 500;
  `

const GridDiv = Styled.div`
  display: grid;
  margin: 8px;
`

const TopText = Styled.div`
  align-text: left;
  margin: 0 96px;
`

const StyledInput = Styled.input`
  margin: 4px 0;
  font-size: ${Styles.fontSizes.large};
  font-weight: 300;
`

const SettingsGrid = Styled.div`
  display: grid;
  grid-template-columns: auto auto;
`

const SettingsPage = (props) => {
  const [amountOfPlayers, setAmountOfPlayers] = useState(defaultSettings.amountOfPlayers);
  const [name, setName] = useState(defaultSettings.name);
  const [handSize, setHandSize] = useState(defaultSettings.handSize);
  const [handicap, setHandicap] = useState(defaultSettings.handicap);

  const handleSubmit = () => {
    const gameSettings = {
      amountOfPlayers: amountOfPlayers,
      name: name,
      handSize: handSize,
      handicap: handicap,
    }

    localStorage['amount_of_players'] = amountOfPlayers;
    localStorage['name'] = name;
    localStorage['hand_size'] = handSize;
    localStorage['handicap'] = handicap;

    props.onSubmit(gameSettings);
  }

  const handleChangePlayers = (e) => {
    let val = e.target.value;
    setAmountOfPlayers(val);
  }

  const handleChangeHandicap = (e) => {
    let val = e.target.value;
    setHandicap(val);
  }

  const handleChangeHandSize = (e) => {
    let val = e.target.value;
    setHandSize(val);
  }

  const handleChangeName = (e) => {
    let val = e.target.value;
    setName(val);
  }

  return (
    <div>
      <Wrapper>
        <h2>Set up a Game</h2>
        <TopText>
          Welcome to Tiny Liar's Dice. Pick your settings and jump into a game of Liar's Dice (Perudo).
        </TopText>
        <SettingsGrid>
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
          <GridDiv>
            <Label>Player Handicap:</Label>
            <StyledInput value={handicap} label={"Hand Size"} onChange={handleChangeHandicap}></StyledInput>
          </GridDiv>
        </SettingsGrid>
        
        <Button label="Start Game" primary onClick={handleSubmit}></Button>
      </Wrapper>
    </div>
  );
}

export default SettingsPage;
