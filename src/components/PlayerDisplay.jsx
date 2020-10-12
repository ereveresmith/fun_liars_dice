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
  width: 100%;
  grid-template-rows: 1fr 2fr;
  border: 2px solid ${Styles.colors.darkGrey};
  height: 240px;
  min-width: 230px;
  transition: background-color 180ms ease-out;

  ${props => props.isActive && `
    border-color: ${Styles.colors.purple};
    background-color: ${Styles.colors.purple};
    color: white;
  `}
`

const StyledDiv = Styled.div`
  padding: 8px 0;
  text-align: center;
  align-items: center;
  font-size: 1em;
`;

const NameText = Styled.h3`
  color: ${Styles.colors.purple};
  margin: 12px 0;

  ${props => props.isActive && `
    color: white;
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
  padding: 0 48px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: auto auto auto auto auto;
`;

const PlayerDisplay = (props) => {

  const renderedHand = props.player.hand.map((fv, index) => {
    if (props.showDice) {
      return <Dice key={`dice${index}`} fv={fv}></Dice>
    } else {
      return <Dice key={`dice${index}`} fv={0}></Dice>
    }
  })

  return (
    <Cell isActive={props.isActive}>
      <StyledDiv className="PlayerDisplay">
        <NameText isActive={props.isActive}>{props.player.id}: {props.player.name}</NameText>
        <HandGrid>{renderedHand}</HandGrid>
        <Divider isActive={props.isActive}></Divider>
        {props.isActive ? <TakingTurnDisplay>...</TakingTurnDisplay> : <TurnDisplay amount={1} fv={1}></TurnDisplay>}
      </StyledDiv>
    </Cell>
  );
}

export default PlayerDisplay;

