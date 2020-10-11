import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';
import TurnDisplay from '../components/TurnDisplay';

const Cell = Styled.div`
  display: grid;
  width: 100%;
  grid-template-rows: 1fr 2fr;
  border: 2px solid ${Styles.colors.darkGrey};
  height: 240px;
  transition: background-color 300ms ease;

  ${props => props.isActive && `
    border-color: ${Styles.colors.purple};
    background-color: ${Styles.colors.purple};
    color: white;
    opacity: 0.8;
  `}

  ${props => props.isSecondary && `
    background-color: ${Styles.colors.lightGrey};
  `}
`

const StyledDiv = Styled.div`
  padding: 8px 16px;
  text-align: center;
  align-items: center;
  font-size: 1em;
`;

const NameText = Styled.h2`
  color: ${Styles.colors.purple};

  ${props => props.isActive && `
    color: white;
  `}
`

const HandGrid = Styled.div`
  display: grid;
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
    <Cell isActive={props.isActive} isSecondary={props.isSecondary}>
      <StyledDiv className="PlayerDisplay">
        <NameText isActive={props.isActive}>{props.player.id}: {props.player.name}</NameText>
        <HandGrid>{renderedHand}</HandGrid>
        {props.isSecondary && <TurnDisplay fv={props.turn.fv} amount={props.turn.amount}></TurnDisplay>}
        {props.isActive && <TurnDisplay fv={-1} amount={-1}></TurnDisplay>}
      </StyledDiv>
    </Cell>
  );
}

export default PlayerDisplay;

