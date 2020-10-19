import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';
import LogContainer from './LogContainer';

const Cell = Styled.div`
  display: grid;
  width: 100%;
  height: 100%;
`

const GridWrapper = Styled.div`
  display: grid;
  grid-columns: auto auto;
  box-shadow: 0px 0px 15px ${Styles.colors.grey};
  overflow: hidden;
  border-radius: 4px;
  width: 60%;
  justify-self: center;
  border-radius: 800px;
  height: 100%;
  align-items: center;
`

const Text = Styled.h2`
  font-size: ${Styles.fontSizes.medium};
  text-align: center;
  font-weight: 700;
  margin-bottom: 8px;
  justify-self: center;
  transition: color 200ms ease;

  ${props => props.color && `
    color: ${props.color};
  `}
`

const TurnArrow = Styled.div`
  width: 0; 
  height: 0; 
  border-left: 1.5em solid transparent;
  border-right: 1.5em solid transparent;
  margin-bottom: 4px;
  align-self: end;
  justify-self: center;
  transform-origin: center;
  transition: all 200ms ease;

  ${props => props.color && `
    border-bottom: 3em solid ${props.color};
  `}

  ${props => props.angle && `
    transform: rotate(${props.angle}deg);
  `}
  margin-bottom: 8px;
`

const CenterDisplay = ({ turn, isChallenge, amountOfPlayers, log }) => {
  const calcAngle = () => {
    const offset = 180;

    switch(amountOfPlayers) {
      case 2: 
        return (turn.nextPlayer.id * 180);
      case 3: 
        return (turn.nextPlayer.id * 90) + 90;
      case 4: 
        return (turn.nextPlayer.id * 90) + 90;
      case 5: 
        if (turn.nextPlayer.id === 1) {
          return offset;
        } else {
          return (turn.nextPlayer.id * 45) + offset;
        }
      case 6: 
        if (turn.nextPlayer.id === 1) {
          return offset;
        } else {
          return (turn.nextPlayer.id * 45) + offset;
        }
    }

  }

  let turnColor = turn.nextPlayer.color;
  let turnText = `${turn.nextPlayer.name}'s turn...`;
  let challengeText = `${turn.nextPlayer.name} challenged ${turn.player.name}`;

  if (turn.nextPlayer.id === 1) {
    turnText = 'Your Turn';
  }

  return (
    <Cell>
      <GridWrapper>
        <LogContainer log={log}></LogContainer>
        <Text color={turnColor}>{isChallenge ? challengeText : turnText}</Text>
        <TurnArrow color={turnColor} angle={calcAngle()}></TurnArrow>
      </GridWrapper>
    </Cell>
  );
}

export default CenterDisplay;

