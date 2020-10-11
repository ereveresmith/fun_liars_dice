import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';

const Cell = Styled.div`
  display: grid;
  width: 100%;
  border: 2px solid ${Styles.colors.darkGrey  };
  height: 240px;
  min-width: 200px;

  ${props => props.isActive && `
    border-color: ${Styles.colors.purple};
    background-color: ${Styles.colors.purple};
    color: white;
  `}
`

const GridWrapper = Styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  height: 100%;
  margin: 8px 0;
  align-items: center;

`

const Text = Styled.h3`
  font-size: 1.3em;
  color: ${Styles.colors.purple};
  text-align: center;
  width: 200px;
  justify-self: center;
`

const TurnArrow = Styled.div`
  width: 0; 
  height: 0; 
  border-left: 2em solid transparent;
  border-right: 2em solid transparent;
  align-self: center;
  justify-self: center;
  border-bottom: 4em solid ${Styles.colors.purple};
  transform-origin: center;

  ${props => props.angle && `
    transform: rotate(${props.angle}deg);
  `}
  margin-bottom: 8px;
`

const CenterDisplay = ({ turn }) => {
  const isActive = (turn.amount > -1);


  const calcAngle = () => {
    const offset = 180;
    if (turn.nextPlayer.id === 1) {
      return offset;
    } else {
      return (turn.nextPlayer.id * 45) + offset;
    }
  }

  let turnText = `${turn.nextPlayer.name}'s turn...`;

  if (turn.nextPlayer.id === 1) {
    turnText = 'Your Turn';
  }

  return (
    <Cell>
      <GridWrapper>
        <TurnArrow angle={calcAngle()}></TurnArrow>
        <Text>{turnText}</Text>
      </GridWrapper>
    </Cell>
  );
}

export default CenterDisplay;

