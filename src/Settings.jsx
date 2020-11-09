import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Switch from './components/Switch';

import Styled from 'styled-components';
import { Styles } from './util/Styles';
import { defaultSettings } from './util/Defaults';

const Wrapper = Styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 4px 20%;
`

const Label = Styled.span`
  font-size: ${Styles.fontSizes.medium};
  align-self: center;
  text-align: left;
  font-weight: 500;
`

const OptionGrid = Styled.div`
  display: grid;
  margin: 8px;
`

const TopText = Styled.div`
  align-text: left;
  margin: 12px 48px;
  font-size: ${Styles.fontSizes.medium}
`

const StyledInput = Styled.input`
  margin: 4px 0;
  font-size: ${Styles.fontSizes.medium};
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
  const [randomMode, setRandomMode] = useState(defaultSettings.randomMode);
  const [randomVariance, setRandomVariance] = useState(defaultSettings.randomVariance);

  const handleSubmit = () => {
    const gameSettings = {
      amountOfPlayers: amountOfPlayers,
      name: name,
      handSize: handSize,
      handicap: handicap,
      randomMode: randomMode,
      randomVariance: randomVariance,
    }

    localStorage['amount_of_players'] = amountOfPlayers;
    localStorage['name'] = name;
    localStorage['hand_size'] = handSize;
    localStorage['handicap'] = handicap;
    localStorage['random_mode'] = randomMode;
    localStorage['random_variance'] = randomVariance;
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

  const handleChangeVariance = (e) => {
    let val = e.target.value;
    setRandomVariance(val);
  }

  const handleToggleRandomMode = (e) => {
    if(randomMode) {
      setRandomMode(false);
    } else {
      setRandomMode(true);
    }
  }

  return (
    <div>
      <Wrapper> 
        <TopText>
          Welcome! This is a web game based on the tabletop game of the same name. Pick some settings and jump into a game.
        </TopText>
        <SettingsGrid>
          <OptionGrid>
            <Label>Your Name:</Label>
            <StyledInput value={name} label={"Your Name"} onChange={handleChangeName}></StyledInput>
          </OptionGrid>
          <OptionGrid>
            <Label># of Players</Label>
            <StyledInput value={amountOfPlayers} label={"Amount of players"} onChange={handleChangePlayers}></StyledInput>
          </OptionGrid>
          <OptionGrid>
            <Label>Dice Per Player:</Label>
            <StyledInput value={handSize} label={"Hand Size"} onChange={handleChangeHandSize}></StyledInput>
          </OptionGrid>
          <OptionGrid>
            <Label>Player Handicap:</Label>
            <StyledInput value={handicap} label={"Hand Size"} onChange={handleChangeHandicap}></StyledInput>
          </OptionGrid>
          <OptionGrid>
            <Label>Random Mode:</Label>
            <Switch isDefaultChecked={randomMode} onChange={handleToggleRandomMode}></Switch>
          </OptionGrid>
          {randomMode && <OptionGrid>
            <Label>Random Offset:</Label>
            <StyledInput value={randomVariance} label={"Random Offset"} onChange={handleChangeVariance}></StyledInput>
          </OptionGrid>}
        </SettingsGrid>
        
        <Button label="Start Game" primary onClick={handleSubmit}></Button>
      </Wrapper>
    </div>
  );
}

export default SettingsPage;
