import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Switch from './components/Switch';
import Dice from './components/Dice';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import { defaultGameSettings, DEFAULT_COLORS_ARRAY, mockBots } from './util/Defaults';
import { randomInt } from './util/Helper';
import ColorButton from './components/ColorButton';
import PlayerDisplay from './components/PlayerDisplay';

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

const Wrapper = Styled.div`
  display: grid;
  grid-template-columns: auto;
  grid-template-rows: auto 12px auto;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: start;
  margin: 8px 0;

  ${props => props.screenSize === 'medium' && `
    grid-template-columns: auto;
    grid-template-rows: auto auto;
    justify-content: center;
    margin: 0;
  `}


  ${props => props.screenSize === 'large' && `
    grid-template-columns: auto auto;
    grid-template-rows: auto;
    justify-content: center;
    margin: 0;
  `}
`

const Label = Styled.span`
  font-size: ${Styles.fontSizes.medium};
  align-self: center;
  text-align: left;
  font-weight: 500;
`

const Grid = Styled.div`
  display: grid;
  margin: 2px;
  grid-gap: 4px;
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
  margin: 2px 8px;
  font-size: ${Styles.fontSizes.medium};
  font-weight: 300;
  max-width: 70px;
`

const SettingsWrapper = Styled.div`
  box-shadow: ${Styles.boxShadows.medium};
  margin: 0 24px;
  padding: 8px;
  max-width: 200px;
`

const GameGrid = Styled.div`
  grid-gap: 4px;
  display: grid;
  justify-items: center;
  justify-content: center;
  align-items: center;
  grid-template-columns: auto auto;
  justify-self: center;
  align-self: start;

  ${props => props.screenSize === 'large'&& `
    align-self: center;
  `}
`

const SettingsPage = ({ onSubmit, screenSize, playerSettings }) => {
  const [amountOfPlayers, setAmountOfPlayers] = useState(defaultGameSettings.amountOfPlayers);
  const [minDice, setMinDice] = useState(defaultGameSettings.minDice);
  const [handicap, setHandicap] = useState(defaultGameSettings.handicap);
  const [maxDice, setMaxDice] = useState(defaultGameSettings.maxDice);
  const [randomMode, setRandomMode] = useState(defaultGameSettings.randomMode);
  const [randomVariance, setRandomVariance] = useState(defaultGameSettings.randomVariance);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [exact, setExact] = useState(defaultGameSettings.exact);
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    const generatePlayers = () => {

      let colorsArray = [...DEFAULT_COLORS_ARRAY];
      let botsArray = [...mockBots];

      const newPlayers = [];
      for (let i = 0; i < amountOfPlayers; i++) {
        let hand = [];

        let myMinDice = parseInt(minDice);
        let myMaxDice = parseInt(maxDice);
        let isVisible = false;
        const isPlayer = (i == 0);
        let randOffset = randomMode ? randomInt(randomVariance) : 0;

        //If it's you
        if (isPlayer) {
          isVisible = true;
          myMinDice = myMinDice + parseInt(handicap) + randOffset;
        } else {
          myMinDice = myMinDice + randOffset;
        }

        console.log("MY MIN DICE: " + myMinDice)
        if (myMinDice >= myMaxDice) {
          myMinDice = myMaxDice;
        }

        for (let k = 0; k < myMaxDice; k++) {
          const newFv = randomInt(6) + 1;

          const isDisabled = (k >= myMinDice);

          const diceObj = {
            fv: newFv,
            visible: isVisible,
            disabled: isDisabled,
            highlight: false,
            hasArrow: false,
            found: false,
            highlightColor: Styles.colors.darkRed,
          }
          hand.push(diceObj);
        }

        if (isPlayer) {
          let myColor = playerSettings.color;
          const filteredColorsArray = colorsArray.filter(color => color !== myColor)
          colorsArray = filteredColorsArray;
          newPlayers.push({
            name: playerSettings.name,
            id: i + 1,
            hand: hand,
            color: myColor,
            callMessage: playerSettings.callMessage,
            exactMessage: playerSettings.exactMessage,
          })
        } else {
          //It's a bot
          let rand2 = randomInt(mockBots.length)
          const bot = botsArray[rand2];
          let rand = randomInt(colorsArray.length)
          let myColor = colorsArray[rand];
          const filteredColorsArray = colorsArray.filter(color => color !== myColor);
          // const filteredBotsArray = botsArray.filter(mockBot => mockBot.name !== bot.name);

          newPlayers.push({
            name: bot.name,
            id: i + 1,
            hand: hand,
            color: colorsArray[rand],
            callMessage: bot.callMessage,
            exactMessage: bot.exactMessage,
            riskThreshold: bot.riskThreshold,
            personality: bot.personality,
          });
          colorsArray = filteredColorsArray;
          // botsArray = filteredBotsArray;
        }
      }

      return newPlayers;
    }

    const newPlayers = generatePlayers();
    setPlayers(newPlayers);
  }, [amountOfPlayers, minDice, maxDice, handicap, randomMode, randomVariance])

  const handleToggleExact = () => {
    if (exact) {
      setExact(false);
    } else {
      setExact(true);
    }
  }


  const handleSubmit = () => {
    const gameSettings = {
      exact: exact,
      players: players,
    }

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

  const handleChangeminDice = (e) => {
    let val = e.target.value;
    setMinDice(val);
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

  const renderPlayers = () => {
    let renderedPlayers = players.map((player) => {
      return <PlayerDisplay
      screenSize={screenSize}
      key={`player${player.id}`}
      isActive={player.id === 1}
      player={player}>
    </PlayerDisplay>
    });

    
    return renderedPlayers;
  }

  const renderSettings = () => {
  return <SettingsWrapper>
    <InlineGrid>
      <Dice visible size={Styles.diceSizes.large} fv={7}></Dice>
      <StyledH1 color={playerSettings.color}>SETTINGS</StyledH1>
    </InlineGrid>
    <Grid>
      <Label># of Players</Label>
      <StyledInput type={'number'} value={amountOfPlayers} label={"Amount of players"} onChange={handleChangePlayers}></StyledInput>
    </Grid>
    <Grid>
      <Label>Min Dice:</Label>
      <StyledInput type={'number'} value={minDice} label={"Hand Size"} onChange={handleChangeminDice}></StyledInput>
    </Grid>
    <Grid>
      <Label>Max Dice:</Label>
      <StyledInput type={'number'} value={maxDice} label={"Max Dice"} onChange={handleChangeMaxDice}></StyledInput>
    </Grid>
    <Grid>
      <Label>Spot On:</Label>
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
  </SettingsWrapper>
  }

  return (
    <div>
      <Wrapper screenSize={screenSize}>
          {renderSettings()}
          <div></div>
          <GameGrid>
            {renderPlayers()}
          </GameGrid>
      </Wrapper>
    </div>
  );
}

export default SettingsPage;
