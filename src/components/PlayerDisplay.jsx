import React, { useEffect, useState } from 'react';
import Styled, { keyframes } from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';
import TurnDisplay from '../components/TurnDisplay';
import { randomInt, mockLieMessages } from '../util/Defaults';

const BottomGrid = Styled.div`
  align-content: center;
  align-items: center;
  display: grid;
  background-color: ${Styles.colors.white};
  height: 68px;
`


const FadeAnimation = keyframes`
  from {
    opacity: 0.8;
  }

  to {
    opacity: 0.0;
  }
`;

const LieDisplay = Styled.div`
  font-weight: 600;
  align-self: start;
  font-size: ${Styles.fontSizes.large};
  opacity: 0.65;
`

const TakingTurnDisplay = Styled.div`
  display: block;
  position: relative;
  z-index: 1;
  font-weight: 900;
  font-size: ${Styles.fontSizes.large};
  animation: ${FadeAnimation} 1.3s ease-out infinite;
`

const Arrow = Styled.div`
    content: '';
    display: block;
    border-right: 4px solid ${Styles.colors.black};
    border-bottom: 4px solid ${Styles.colors.black};
    box-shadow: 2px 2px 2px ${Styles.colors.black};
    width: 16px;
    height: 16px;
    margin-left: 50%;
    z-index: 3;
    transform: translate(-50%, -50%) rotate(45deg);
`

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

  ${props => props.isOut && `
    opacity: 0.2;
    color: grey;
  `}
`

const StyledDiv = Styled.div`
  text-align: center;
  align-items: center;
  font-size: ${Styles.fontSizes.small};
`;

const NameText = Styled.h3`
  font-size: ${Styles.fontSizes.large};
  margin-bottom: 4px;
  font-weight: 900;
  color: ${Styles.colors.purple};

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
  padding: 2px 10px;
  display: grid;
  min-height: 38px;
  justify-content: center;
  width: 180px;
  grid-gap: 1px;
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

const PlayerDisplay = ({ isActive, isChallenge, player, turn, showTurn, turnOpacity}) => {
  let isOut = true;

  const renderedHand = player.hand.map((dice, index) => {
      const diceSize = dice.visible ? Styles.diceSizes.large : Styles.diceSizes.small;
      if (dice.disabled === false) {
        isOut = false;
      }

      if (player.id === 1) {
        return <Dice size={Styles.diceSizes.large} visible={true} disabled={dice.disabled} highlightColor={dice.highlightColor} highlight={dice.highlight} hasArrow={dice.hasArrow} key={`dice${index}`} fv={dice.fv}></Dice>
      } else {
        return <Dice size={diceSize} visible={dice.visible} disabled={dice.disabled} highlightColor={dice.highlightColor} highlight={dice.highlight} hasArrow={dice.hasArrow} key={`dice${index}`} fv={dice.fv}></Dice>
      }
  })

  const turnColor = Styles.colors.grey;

  const renderTopSection = () => {
    const isColored = isActive | isChallenge;

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

    console.log(generatedColumns)
    console.log(generatedRows)
    console.log("     ")


    return (
      <ColoredDiv color={player.color} isColored={isColored}>
        <NameText color={player.color} isColored={isColored}>{player.name}</NameText>
        <HandGrid columns={generatedColumns} rows={generatedRows}>{renderedHand}</HandGrid>
      </ColoredDiv>
    )
  }

  const renderBottomSection = () => {
    let activeDisplay = null;  
    let rand = randomInt(mockLieMessages.length);
    const lieMessage = "That's a lie!"
    // const lieMessage = mockLieMessages[rand];

    let waitingMessage = ``
    if (player.id === 1) {
      waitingMessage = 'Your Turn'
    }

    if (isActive && isChallenge) {
      activeDisplay = <LieDisplay>{lieMessage}</LieDisplay>
    } else if (isActive) {
      activeDisplay = <TakingTurnDisplay><Arrow></Arrow>{waitingMessage}</TakingTurnDisplay>;
    } else if (showTurn && !isOut) {
      activeDisplay = <TurnDisplay diceSize={Styles.diceSizes.large} textSize={Styles.fontSizes.huge} color={turnColor} opacity={turnOpacity} amount={turn.amount} fv={turn.fv}></TurnDisplay>
    }

    return (
      <BottomGrid>
        {activeDisplay}
      </BottomGrid>
    )
  }

  return (
    <Cell color={player.color} isActive={isActive | isChallenge} isOut={isOut}>
      <StyledDiv className="PlayerDisplay">
        {renderTopSection()}
        <Divider></Divider>
        {renderBottomSection()}
      </StyledDiv>
    </Cell>
  );
}

export default PlayerDisplay;

