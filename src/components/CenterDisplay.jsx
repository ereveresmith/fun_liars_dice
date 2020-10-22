import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';
import LogContainer from './LogContainer';
import TurnDisplay from './TurnDisplay';

const Cell = Styled.div`
  display: grid;
  width: 100%;
  height: 100%;
`

const BottomGrid = Styled.div`
  display: grid;
  width: 100%;
  height: 100%;
`

const GridWrapper = Styled.div`
  display: grid;
  padding: 4px;
  grid-columns: auto auto;
  box-shadow: 0px 0px 15px ${Styles.colors.grey};
  border-radius: 4px;
  width: 80%;
  justify-self: center;
  border-radius: 800px;
  height: 290px;
  align-items: center;
`

const Text = Styled.h2`
  font-size: ${Styles.fontSizes.medium};
  text-align: center;
  align-self: center;
  font-weight: 700;
  margin-bottom: 8px;
  padding: 8px;
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
  align-self: end;
  justify-self: center;
  transform-origin: center;
  transition: all 200ms ease;
  margin-bottom: 16px;

  ${props => props.color && `
    border-bottom: 3em solid ${props.color};
  `}

  ${props => props.angle && `
    transform: rotate(${props.angle}deg);
  `}

  ${props => props.isChallenge && `
    opacity: 0;
  `}
`

const CenterDisplay = ({ turn, isChallenge, amountOfPlayers, log, amountFound }) => {
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

  if (turn.nextPlayer.id === 1) {
    turnText = 'Your Turn';
  }

  const sizeIncreaseSpeed = 0.1;

  const calcDiceSize = () => {
    let val = (amountFound * sizeIncreaseSpeed) + 2.5;
    return `${val}em`;
  }

  const calcTextSize = () => {
    let val = (amountFound * sizeIncreaseSpeed) + 3;
    return `${val}em`;
  }
  
  return (
    <Cell>
      <GridWrapper>
        <LogContainer log={log}></LogContainer>
        <BottomGrid>
          {
            isChallenge ? <TurnDisplay amount={amountFound} fv={turn.fv} diceSize={calcDiceSize()} textSize={calcTextSize()}></TurnDisplay>
            :<Text color={turnColor}>{turnText}</Text>
          }
          <TurnArrow isChallenge={isChallenge} color={turnColor} angle={calcAngle()}></TurnArrow>
        </BottomGrid>
      </GridWrapper>
    </Cell>
  );
}

export default CenterDisplay;

