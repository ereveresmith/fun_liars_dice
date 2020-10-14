import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';
import TurnDisplay from '../components/TurnDisplay';

const TakingTurnDisplay = Styled.div`
  font-weight: 900;
  font-size: 4em;
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
  grid-template-rows: 1fr 2fr;
  border: 1px solid ${Styles.colors.darkGrey};
  border-radius: 2px;
  height: 240px;
  width: 100%;
  transition: background-color 100ms ease-out;

  ${props => props.isOut && `
    opacity: 0.2;
    color: grey;
  `}
`

const StyledDiv = Styled.div`
  text-align: center;
  align-items: center;
  font-size: 1em;
`;

const NameText = Styled.h3`
  font-size: 18px;
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
  grid-gap: 8px;
  grid-template-columns: auto auto auto auto auto;
`;

const PlayerDisplay = ({ isActive, isChallenge, player, turn, showDice, showTurn, turnOpacity}) => {
  const isOut = !player.hand.length;
  const renderedHand = player.hand.map((fv, index) => {
    if (showDice) {
      return <Dice key={`dice${index}`} fv={fv}></Dice>
    } else {
      return <Dice key={`dice${index}`} fv={0}></Dice>
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

