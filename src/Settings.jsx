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

const OptionGrid = Styled.div`
  display: grid;
  margin: 4px;
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
  grid-template-columns: auto auto;
`

const SettingsWrapper = Styled.div`
  box-shadow: ${Styles.boxShadows.medium};
  padding: 4px 12px;
  grid-gap: 16px;
  margin: 4px;
  display: grid;
  transition: all ease 200ms;


  ${props => (props.screenSize === 'medium' || props.screenSize === 'large') && `
    grid-template-columns: auto auto;
  `}
`

const SettingsPage = ({ onSubmit, screenSize }) => {
  const [amountOfPlayers, setAmountOfPlayers] = useState(defaultSettings.amountOfPlayers);
  const [name, setName] = useState(defaultSettings.name);
  const [handSize, setHandSize] = useState(defaultSettings.handSize);
  const [handicap, setHandicap] = useState(defaultSettings.handicap);
  const [randomMode, setRandomMode] = useState(defaultSettings.randomMode);
  const [randomVariance, setRandomVariance] = useState(defaultSettings.randomVariance);
  const [myColor, setMyColor] = useState(defaultSettings.myColor);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleShowAdvanced = () => {
    if (showAdvanced) {
      setShowAdvanced(false);
    } else {
      setShowAdvanced(true);
    }
  }


  const handleSubmit = () => {
    const gameSettings = {
      amountOfPlayers: amountOfPlayers,
      name: name,
      handSize: handSize,
      handicap: handicap,
      randomMode: randomMode,
      randomVariance: randomVariance,
      myColor: myColor,
    }

    localStorage['amount_of_players'] = amountOfPlayers;
    localStorage['name'] = name;
    localStorage['hand_size'] = handSize;
    localStorage['handicap'] = handicap;
    localStorage['random_mode'] = randomMode;
    localStorage['random_variance'] = randomVariance;
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

  const renderAdvanceText = () => {
    if (showAdvanced) {
      return "Hide";
    } else {
      return "Show advanced settings...";
    }
  }

  const handleChangeColor = (color) => {
    setMyColor(color);
  }

  const renderColorButtons = () => {
    const colorsArray = [...DEFAULT_COLORS_ARRAY];

    const colorButtons = colorsArray.map((color) => {
      const isSelected = (myColor === color);

      return <ColorButton 
        color={color} 
        onClick={handleChangeColor}
        selected={isSelected}></ColorButton>
    })
    return <ColorsGrid>
      {colorButtons}
    </ColorsGrid>
  }

  return (
    <div>
      <Wrapper screenSize={screenSize}>
        <InlineGrid>
          <Dice visible size={Styles.diceSizes.large} fv={7}></Dice>
          <StyledH1 color={myColor}>TINY Liar's Dice</StyledH1>
        </InlineGrid>
        <TopText>
          Welcome! 
          Choose your settings to start a game:
        </TopText>
          <SettingsWrapper screenSize={screenSize}>
            <div>
              <DoubleGrid>
                <OptionGrid>
                  <Label>Name:</Label>
                  <StyledInput value={name} label={"Your Name"} onChange={handleChangeName}></StyledInput>
                </OptionGrid>
                <div>
                  <Label>Color:</Label>
                  {renderColorButtons()}
                </div>
              </DoubleGrid>

            </div>
            
            {showAdvanced && 
              <div>
                <DoubleGrid>
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
                    <Switch color={myColor} isDefaultChecked={randomMode} onChange={handleToggleRandomMode}></Switch>
                  </OptionGrid>
                  {randomMode && <OptionGrid>
                    <Label>Random Offset:</Label>
                    <StyledInput value={randomVariance} label={"Random Offset"} onChange={handleChangeVariance}></StyledInput>
                  </OptionGrid>}
                </DoubleGrid>
              </div>
            }
            </SettingsWrapper>
          <ALink onClick={handleShowAdvanced}>{renderAdvanceText()}</ALink>
        <Button label="Start Game" color={myColor} primary onClick={handleSubmit}></Button>
      </Wrapper>
    </div>
  );
}

export default SettingsPage;
