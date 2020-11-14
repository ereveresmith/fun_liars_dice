import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Switch from './components/Switch';
import Dice from './components/Dice';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import { defaultSettings, DEFAULT_COLORS_ARRAY } from './util/Defaults';
import ColorButton from './components/ColorButton';

const InlineGrid = Styled.div`
  display: grid;
  grid-gap: 4px;
  align-items: center;
  align-content: center;
  grid-template-columns: auto auto auto auto;
`

const ALink = Styled.a`
  align-self: left;
  margin-left: 4px;
  font-size: ${Styles.fontSizes.black};
  color: ${Styles.colors.grey};
  font-size: ${Styles.fontSizes.small};
  cursor: pointer;
  padding: 8px;

  &:hover {
    color: ${Styles.colors.darkGrey};
  }
`

const StyledH1 = Styled.h1`
  align-self: center;
  opacity: 0.8;
  color: ${Styles.colors.black};
  font-size: ${Styles.fontSizes.large};
  ${props => props.color && `
    box-shadow: 0px 6px 0 0 ${props.color};
  `}
  font-weight: 900;
  margin: 0;
`

const ColorsGrid = Styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`

const Wrapper = Styled.div`
  display: grid;
  justify-items: center;
  align-items: center;
  margin: 12px 0;
  grid-gap: 4px;
`

const Label = Styled.span`
  font-size: ${Styles.fontSizes.medium};
  align-self: center;
  text-align: left;
  font-weight: 500;
`

const Grid = Styled.div`
  display: grid;
  margin: 4px;
  grid-template-columns: auto auto;
`

const TopText = Styled.div`
  text-align: left;
  margin: 12px 24px;
  max-width: 400px;
  text-align: center; 
  font-size: ${Styles.fontSizes.medium}
`

const StyledInput = Styled.input`
  margin: 4px 0;
  font-size: ${Styles.fontSizes.medium};
  font-weight: 300;
  max-width: 70px;
`

const DoubleGrid = Styled.div`
  min-width: 250px;
  display: grid;
  grid-template-columns: auto auto auto;
`

const SettingsWrapper = Styled.div`
  padding: 4px 12px;
  grid-gap: 16px;
  margin: 4px;
  display: grid;
  transition: all ease 200ms;


  ${props => (props.screenSize === 'medium' || props.screenSize === 'large') && `
    grid-template-columns: auto auto;
  `}
`

const SettingsPage = ({ onSubmit, screenSize, playerSettings }) => {
  const [amountOfPlayers, setAmountOfPlayers] = useState(defaultSettings.amountOfPlayers);
  const [handSize, setHandSize] = useState(defaultSettings.handSize);
  const [handicap, setHandicap] = useState(defaultSettings.handicap);
  const [maxDice, setMaxDice] = useState(defaultSettings.maxDice);
  const [randomMode, setRandomMode] = useState(defaultSettings.randomMode);
  const [randomVariance, setRandomVariance] = useState(defaultSettings.randomVariance);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [exact, setExact] = useState(defaultSettings.exact);


  const handleShowAdvanced = () => {
    if (showAdvanced) {
      setShowAdvanced(false);
    } else {
      setShowAdvanced(true);
    }
  }

  const handleToggleExact = () => {
    if (exact) {
      setExact(false);
    } else {
      setExact(true);
    }
  }


  const handleSubmit = () => {
    const gameSettings = {
      amountOfPlayers: amountOfPlayers,
      handSize: handSize,
      handicap: handicap,
      randomMode: randomMode,
      randomVariance: randomVariance,
      maxDice: maxDice,
      exact: exact,
    }

    // localStorage['amount_of_players'] = amountOfPlayers;
    // localStorage['hand_size'] = handSize;
    // localStorage['handicap'] = handicap;
    // localStorage['random_mode'] = randomMode;
    // localStorage['random_variance'] = randomVariance;
    onSubmit(gameSettings);
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

  const handleChangeVariance = (e) => {
    let val = e.target.value;
    setRandomVariance(val);
  }

  const handleChangeMaxDice = (e) => {
    let val = e.target.value;
    setMaxDice(val);
  }

  const handleToggleRandomMode = (e) => {
    if(randomMode) {
      setRandomMode(false);
    } else {
      setRandomMode(true);
    }
  }
  const renderAdvanceText = () => {
    if (showAdvanced) {
      return "Hide";
    } else {
      return "Show advanced settings...";
    }
  }

  return (
    <div>
      <Wrapper screenSize={screenSize}>
        <InlineGrid>
          <Dice visible size={Styles.diceSizes.large} fv={7}></Dice>
          <StyledH1 color={playerSettings.color}>TINY Liar's Dice</StyledH1>
        </InlineGrid>
        <TopText>
          Game Settings:
        </TopText>
            <Grid>
              <Label># of Players</Label>
              <StyledInput type={'number'} value={amountOfPlayers} label={"Amount of players"} onChange={handleChangePlayers}></StyledInput>
            </Grid>
            <Grid>
              <Label>Min Dice:</Label>
              <StyledInput type={'number'} value={handSize} label={"Hand Size"} onChange={handleChangeHandSize}></StyledInput>
            </Grid>
            <Grid>
              <Label>Max Dice:</Label>
              <StyledInput type={'number'} value={maxDice} label={"Max Dice"} onChange={handleChangeMaxDice}></StyledInput>
            </Grid>
            <Grid>
              <Label>Exactamundo (Calza):</Label>
              <Switch color={playerSettings.color} isDefaultChecked={exact} onChange={handleToggleExact}></Switch>
            </Grid>
            <Grid>
              <Label>Random Mode:</Label>
              <Switch color={playerSettings.color} isDefaultChecked={randomMode} onChange={handleToggleRandomMode}></Switch>
            </Grid>
            <Grid>
              <Label>Random Offset:</Label>
              <StyledInput type={'number'} value={randomVariance} label={"Random Offset"} onChange={handleChangeVariance}></StyledInput>
            </Grid>
            <Grid>
              <Label>Handicap</Label>
              <StyledInput type={'number'} value={handicap} label={"Player Handicap"} onChange={handleChangeHandicap}></StyledInput>
            </Grid>

        <Button label="Start Game" color={playerSettings.color} primary onClick={handleSubmit}></Button>
      </Wrapper>
    </div>
  );
}

export default SettingsPage;
