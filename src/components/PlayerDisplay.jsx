import React, { useState } from 'react';
import Styled, { keyframes } from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';
import TurnDisplay from '../components/TurnDisplay';


const FadeAnimation = keyframes`
  from {
    opacity: 0.5;
  }

  to {
    opacity: 0.1;
  }
`;

const TakingTurnDisplay = Styled.div`
  font-weight: 900;
  font-size: ${Styles.fontSizes.huge};
  animation: ${FadeAnimation} 1.3s linear infinite;
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
  min-height: 220px;
  min-width: 220px;
  border: 1px solid ${Styles.colors.darkGrey};
  margin: 24px 0;
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
  font-size: ${Styles.fontSizes.medium};
  font-weight: 900;
  color: ${Styles.colors.purple};
  padding: 12px 0;

  ${props => props.color && `
    color: ${props.color};
  `}

  ${props => props.isColored && `
    color: ${Styles.colors.white};
  `}
`

const Divider = Styled.div`
  border-top: 1px solid ${Styles.colors.darkGrey};
  width: 100%;
`

const HandGrid = Styled.div`
  padding: 8px 24px;
  display: grid;
  grid-gap: 6px;
  jusity-items: center;
  grid-template-columns: auto auto auto auto auto;
`;

const PlayerDisplay = ({ isActive, isChallenge, player, turn, showTurn, turnOpacity}) => {
  const isOut = !player.hand.length;

  const renderedHand = player.hand.map((dice, index) => {
      const diceSize = dice.visible ? Styles.diceSizes.large : Styles.diceSizes.medium;
      console.log(diceSize)
      return <Dice size={diceSize} visible={dice.visible} disabled={dice.disabled} key={`dice${index}`} fv={dice.fv}></Dice>
  })

  const turnColor = isChallenge ? Styles.colors.white : Styles.colors.black;

  const renderTopSection = () => {
    const isColored = isActive | isChallenge;

    return (
      <ColoredDiv color={player.color} isColored={isColored}>
        <NameText color={player.color} isColored={isColored}>{player.id}: {player.name}</NameText>
        <HandGrid>{renderedHand}</HandGrid>
      </ColoredDiv>
    )
  }

  const renderBottomSection = () => {
    return (
      <div>
      {isActive ? 
        <TakingTurnDisplay>...</TakingTurnDisplay> 
      : (showTurn && !isOut) ? <TurnDisplay color={turnColor} opacity={turnOpacity} amount={turn.amount} fv={turn.fv}></TurnDisplay> : null}
      </div>
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

