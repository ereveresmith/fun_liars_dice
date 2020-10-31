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
  height: 50px;
  transition: background 220ms ease;
  opacity: 0.9;
`

const GridWrapper = Styled.div`
  display: grid;
  grid-columns: auto auto;
  width: 100%;
  justify-self: center;
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
  border-left: 0.75em solid transparent;
  border-right: 0.75em solid transparent;
  align-self: end;
  justify-self: center;
  transform-origin: center;
  transition: all 120ms ease;
  margin-bottom: 2px;

  ${props => props.color && `
    border-bottom: 1.5em solid ${props.color};
  `}

  ${props => props.angle && `
    transform: rotate(${props.angle}deg);
  `}
`

const CenterDisplay = ({ turn, isChallenge, amountOfPlayers, log, amountFound }) => {
  const calcArrowDirection = () => {
    switch(amountOfPlayers) {
      case 2: 
        return (turn.nextPlayer.id * 180) + 90;
      case 3: 
        return (turn.nextPlayer.id * 90) + 180;
      default: 
        return (turn.nextPlayer.id * 45) + 225;
    }

  }

  let turnColor = turn.nextPlayer.color;
  let turnText = `${turn.nextPlayer.name}'s turn...`;

  if (turn.nextPlayer.id === 1) {
    turnText = 'Your Turn';
  }

  const renderChallenge = () => {
    return <ChallengeGrid>
      <TurnDisplay 
        color={Styles.colors.darkGrey}
        amount={amountFound} 
        fv={turn.fv} 
        diceSize={Styles.diceSizes.large} 
        textSize={Styles.fontSizes.huge}>
      </TurnDisplay>
    </ChallengeGrid>
  }

  const renderTurn = () => {
    return (
      <Cell>
        <Text color={turnColor}>{turnText}</Text>
        <TurnArrow color={turnColor} angle={calcArrowDirection()}></TurnArrow>
      </Cell>
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

