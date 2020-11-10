import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Switch from './components/Switch';
import Dice from './components/Dice';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import { defaultSettings } from './util/Defaults';

const InlineGrid = Styled.div`
  display: grid;
  grid-gap: 4px;
  align-items: center;
  align-content: center;
  grid-template-columns: auto auto auto auto;
`

const StyledH1 = Styled.h1`
  align-self: center;
  opacity: 0.8;
  color: ${Styles.colors.black};
  font-size: ${Styles.fontSizes.large};
  box-shadow: 0px 6px 0 0 ${Styles.colors.purple};
  margin: 0;
`

const StyledH3 = Styled.h3`
  align-self: left;
  margin-left: 4px;
  font-size: ${Styles.fontSizes.medium};
  opacity: 0.8;
  color: ${Styles.colors.black};
`

const Wrapper = Styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 4px 5%;
  grid-gap: 4px;
`

const Label = Styled.span`
  font-size: ${Styles.fontSizes.small};
  align-self: center;
  text-align: left;
  font-weight: 500;
`

const OptionGrid = Styled.div`
  display: grid;
  margin: 4px;
`

const TopText = Styled.div`
  text-align: left;
  margin: 12px 24px;
  width: 300px;
  text-align: center; 
  font-size: ${Styles.fontSizes.small}
`

const StyledInput = Styled.input`
  margin: 4px 0;
  font-size: ${Styles.fontSizes.small};
  font-weight: 300;
  max-width: 100px;
`

const DoubleGrid = Styled.div`
  display: grid;
  grid-template-columns: auto auto;
`

const SettingsWrapper = Styled.div`
  box-shadow: ${Styles.boxShadows.medium};
  padding: 2px 24px;
  margin: 4px;
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
        <InlineGrid>
          <Dice visible size={Styles.diceSizes.large} fv={7}></Dice>
          <StyledH1>TINY Liar's Dice</StyledH1>
        </InlineGrid>
        <TopText>
          Welcome! 
          Choose your settings to start a game:
        </TopText>
        <SettingsWrapper>
          <StyledH3>Settings</StyledH3>
          <DoubleGrid>
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
          </DoubleGrid>
          <StyledH3>Advanced</StyledH3>
          <DoubleGrid>
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
          </DoubleGrid>
        </SettingsWrapper>
        <Button label="Start Game" primary onClick={handleSubmit}></Button>
      </Wrapper>
    </div>
  );
}

export default SettingsPage;
