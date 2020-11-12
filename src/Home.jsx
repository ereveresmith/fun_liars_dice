import React, {useState, useEffect} from 'react';
import Button from './components/Button';
import Switch from './components/Switch';
import Dice from './components/Dice';
import Styled from 'styled-components';
import { Styles } from './util/Styles';
import { defaultPlayerSettings, defaultSettings, DEFAULT_COLORS_ARRAY } from './util/Defaults';
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

const GreyWrapper = Styled.div`
  box-shadow: ${Styles.boxShadows.medium};
  padding: 4px 12px;
  grid-gap: 16px;
  margin: 4px;
  display: grid;
  transition: all ease 200ms;
`

const Home = ({ onSubmit, screenSize }) => {
  const [name, setName] = useState(defaultPlayerSettings.name);
  const [color, setColor] = useState(defaultPlayerSettings.color);

  const handleSubmit = () => {
    const playerSettings = {
      name: name,
      color: color,
    }

    localStorage['color'] = color;
    localStorage['name'] = name;
    onSubmit(playerSettings);
  }

  const handleChangeName = (e) => {
    let val = e.target.value;
    setName(val);
  }

  const handleChangeColor = (color) => {
    setColor(color);
  }

  const renderColorButtons = () => {
    const colorsArray = [...DEFAULT_COLORS_ARRAY];

    const colorButtons = colorsArray.map((otherColor) => {
      const isSelected = (otherColor === color);

      return <ColorButton 
        color={otherColor} 
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
          <StyledH1 color={color}>TINY Liar's Dice</StyledH1>
        </InlineGrid>
        <TopText>
          Welcome!
          Create a player:
        </TopText>
          <GreyWrapper screenSize={screenSize}>
              <DoubleGrid>
                <OptionGrid>
                  <Label>Name:</Label>
                  <StyledInput value={name} label={"Your Name"} onChange={handleChangeName}></StyledInput>
                </OptionGrid>
              </DoubleGrid>
              <div>
                  <Label>Color:</Label>
                  {renderColorButtons()}
              </div>
            </GreyWrapper>
        <Button label="Next" color={color} primary onClick={handleSubmit}></Button>
      </Wrapper>
    </div>
  );
}

export default Home;
