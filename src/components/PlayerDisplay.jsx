import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';
import TurnDisplay from '../components/TurnDisplay';

const TakingTurnDisplay = Styled.div`
  font-weight: 900;
  font-size: 4em;
`

const Cell = Styled.div`
  display: grid;
  grid-template-rows: 1fr 2fr;
  border: 2px solid ${Styles.colors.darkGrey};
  border-radius: 60px;
  height: 240px;
  width: 330px;
  transition: background-color 100ms ease-out;

  ${props => (props.isActive && props.color) && `
    background-color: ${props.color};
    color: ${Styles.colors.white};
    border-color: ${props.color};
  `}

  ${props => props.isOut && `
    opacity: 0.2;
    color: grey;
  `}
`

const StyledDiv = Styled.div`
  padding: 8px 0;
  text-align: center;
  align-items: center;
  font-size: 1em;
`;

const NameText = Styled.h3`
  font-size: 18px;
  font-weight: 900;
  color: ${Styles.colors.purple};
  margin: 12px 0;

  ${props => props.color && `
    color: ${props.color};
  `}

  ${props => props.isActive && `
    color: ${Styles.colors.white};
  `}
`

const Divider = Styled.div`
  border-top: 2px solid ${Styles.colors.darkGrey};
  margin: 16px 0;
  width: 100%;

  ${props => props.isActive && `
    border-color: ${Styles.colors.grey};
  `}
`

const HandGrid = Styled.div`
  padding: 0 24px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: auto auto auto auto auto;
`;

const PlayerDisplay = ({ isActive, isChallenge, player, turn, showDice, showTurn, turnOpacity}) => {
  const isOut = !player.hand.length;
  console.log(player.color)

  const renderedHand = player.hand.map((fv, index) => {
    if (showDice) {
      return <Dice key={`dice${index}`} fv={fv}></Dice>
    } else {
      return <Dice key={`dice${index}`} fv={0}></Dice>
    }
  })

  const turnColor = isChallenge ? Styles.colors.white : Styles.colors.black;

  return (
    <Cell color={player.color} isActive={isActive | isChallenge} isOut={isOut}>
      <StyledDiv className="PlayerDisplay">
        <NameText color={player.color} isActive={isActive}>{player.id}: {player.name}</NameText>
        <HandGrid>{renderedHand}</HandGrid>
        <Divider color={player.color} isActive={isActive | isChallenge}></Divider>
        {isActive ? 
          <TakingTurnDisplay>...</TakingTurnDisplay> 
        : (showTurn && !isOut) ? <TurnDisplay color={turnColor} opacity={turnOpacity} amount={turn.amount} fv={turn.fv}></TurnDisplay> : null}
      </StyledDiv>
    </Cell>
  );
}

export default PlayerDisplay;

