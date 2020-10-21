import React, { useEffect, useState } from 'react';
import Styled, { keyframes } from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';
import TurnDisplay from '../components/TurnDisplay';

const Grid = Styled.div`
  align-content: center;
  align-items: center;
  display: grid;
  height: 70%;
  min-height: 80px;
`


const FadeAnimation = keyframes`
  from {
    opacity: 0.5;
  }

  to {
    opacity: 0.1;
  }
`;

const LieDisplay = Styled.div`
  font-weight: 900;
  align-self: center;
  font-size: ${Styles.fontSizes.large};
  opacity: 0.7;
`

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
  min-height: 240px;
  min-width: 330px;
  border: 1px solid ${Styles.colors.darkGrey};
  margin: 12px 0;
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
  let isOut = true;

  const renderedHand = player.hand.map((dice, index) => {
      const diceSize = dice.visible ? Styles.diceSizes.large : Styles.diceSizes.medium;
      if (dice.disabled === false) {
        isOut = false;
      }

      if (player.id === 1) {
        return <Dice size={Styles.diceSizes.large} visible={true} disabled={dice.disabled} highlight={dice.highlight} key={`dice${index}`} fv={dice.fv}></Dice>
      } else {
        return <Dice size={diceSize} visible={dice.visible} disabled={dice.disabled} highlight={dice.highlight} key={`dice${index}`} fv={dice.fv}></Dice>
      }
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
    let activeDisplay = null;

    if (isActive && isChallenge) {
      activeDisplay = <LieDisplay>It's a lie!!!</LieDisplay>
    } else if (isActive) {
      activeDisplay = <TakingTurnDisplay>...</TakingTurnDisplay>;
    } else if (showTurn && !isOut && !isChallenge) {
      activeDisplay = <TurnDisplay color={turnColor} opacity={turnOpacity} amount={turn.amount} fv={turn.fv}></TurnDisplay>
    }

    return (
      <Grid>
        {activeDisplay}
      </Grid>
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

