import React from 'react';
import Styled, { keyframes } from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from './Dice';
import TurnDisplay from './TurnDisplay';

const ColoredDiv = Styled.div`
    padding: 2px;

    ${props => (props.isColored && props.color) && `
    background-color: ${props.color};
    color: ${Styles.colors.white};
    border-color: ${props.color};
  `}
`

const Cell = Styled.div`
  display: grid;
  grid-template-rows: auto auto;
  border: 1px solid ${Styles.colors.grey};
  margin: 4px 0;
  background-color: ${Styles.colors.white};
  transition: background-color 100ms ease-out;
  cursor: pointer;

  ${props => props.isOut && `
    opacity: 0.2;
    color: grey;
  `}
`

const StyledDiv = Styled.div`
  text-align: center;
  align-items: center;
  max-width: 180px;
  font-size: ${Styles.fontSizes.small};
`;

const NameText = Styled.h3`
  font-size: ${Styles.fontSizes.large};
  margin-bottom: 4px;
  font-weight: 900;

  ${props => props.color && `
    color: ${props.color};
  `}

  ${props => props.isColored && `
    color: ${Styles.colors.white};
  `}
`

const Divider = Styled.div`
  border-top: 1px solid ${Styles.colors.grey};
  width: 100%;
`

const HandGrid = Styled.div`
  display: grid;
  justify-content: center;
  padding: 8px;
  grid-gap: 2px;
  justify-content: center;
  justify-items: center;
  align-content: center;
  ${props => props.rows && `
    grid-template-rows: ${props.rows};
  `}

  ${props => props.columns && `
    grid-template-columns: ${props.columns};
  `}
`;

const MiniPlayerDisplay = ({ isColored, player, screenSize, onClick}) => {

  const renderedHand = player.hand.map((dice, index) => {
      return <Dice 
        onClick={() => {}} 
        size={Styles.diceSizes.small} 
        visible={false} 
        disabled={dice.disabled} 
        highlightColor={dice.highlightColor} 
        key={`dice${index}`} 
        fv={dice.fv}></Dice>
  });

  const handleClick = () => {
    onClick();
  }

  const renderTopSection = () => {
    let generatedColumns = '';
    let generatedRows = 'auto';
    let maxColumns = false;

    for (let i = 0; i < player.hand.length; i++) {
      if (((i+1) % 5) === 0) {
        generatedRows = generatedRows + ' auto';
        maxColumns = true;
      } else if (!maxColumns) {
        generatedColumns = generatedColumns + ' auto';
      }
      else break;
    }

    return (
      <ColoredDiv color={player.color} isColored={isColored}>
        <NameText color={player.color} isColored={isColored}>{player.name}</NameText>
        <HandGrid screenSize={screenSize} columns={generatedColumns} rows={generatedRows}>{renderedHand}</HandGrid>
      </ColoredDiv>
    )
  }

  return (
    <Cell color={player.color} isColored={isColored} onClick={handleClick}>
      <StyledDiv className="MiniPlayerDisplay">
        {renderTopSection()}
      </StyledDiv>
    </Cell>
  );
}

export default MiniPlayerDisplay;

