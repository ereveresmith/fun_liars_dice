import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';

const StyledDiv = Styled.div`
  padding: 8px 16px;
  text-align: center;
  align-items: center;
  font-size: 1em;
`;

const NameText = Styled.h2`
  color: ${Styles.colors.purple};
`

const HandGrid = Styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto auto;
`;

const PlayerDisplay = (props) => {

  const renderedHand = props.player.hand.map((fv) => {
    if (props.showDice) {
      return <Dice fv={fv}></Dice>
    } else {
      return <Dice fv={0}></Dice>
    }
  })

  return (
    <StyledDiv className="PlayerDisplay">
      <NameText>{props.player.name}</NameText>
      <HandGrid>{renderedHand}</HandGrid>
    </StyledDiv>
  );
}

export default PlayerDisplay;

