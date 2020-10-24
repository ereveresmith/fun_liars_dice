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

const ChallengeGrid = Styled.div`
    display: grid;
    justify-items: center;
    align-items: center;
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
  width: 100%;
  justify-self: center;
  border-radius: 800px;
  height: 290px;
  align-items: center;
`

const Text = Styled.h2`
  font-size: ${Styles.fontSizes.medium};
  text-align: center;
  align-self: center;
  font-weight: 600;
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

  const renderChallenge = () => {
    let value = "LIE"
    let color = Styles.colors.red;

    if (amountFound >= turn.amount) {
      value = "TRUE";
      color = Styles.colors.green;
    }

    return <ChallengeGrid>
      <Text color={color}>{value}</Text>
      <TurnDisplay 
        amount={amountFound} 
        fv={turn.fv} 
        diceSize={calcDiceSize()} 
        textSize={calcTextSize()}>
      </TurnDisplay>
    </ChallengeGrid>
  }

  const renderTurn = () => {
    return (
      <ChallengeGrid>
        <Text color={turnColor}>{turnText}</Text>
        <TurnArrow color={turnColor} angle={calcAngle()}></TurnArrow>
      </ChallengeGrid>
    )
  }
  
  return (
    <Cell>
      <GridWrapper>
        <LogContainer log={log}></LogContainer>
        <BottomGrid>
          {isChallenge ? renderChallenge() : renderTurn()}
        </BottomGrid>
      </GridWrapper>
    </Cell>
  );
}

export default CenterDisplay;

