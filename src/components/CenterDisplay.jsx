import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';

const GridWrapper = Styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  height: 100%;
  margin: 8px 0;
`

const FlexWrapper = Styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  margin-bottom: 28px;
`


const HugeText = Styled.h1`
  font-size: 4em;
  color: ${Styles.colors.black};
  opacity: 0.8;
  padding-right: 16px;
  text-align: center;
`

const Text = Styled.h3`
  font-size: 1.5em;
  color: ${Styles.colors.purple};
  text-align: center;
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
    const offset = 135;
    return (turn.nextPlayer.id * 45) + offset;
  }

  let turnText = `${turn.nextPlayer.name}'s turn...`;

  if (turn.nextPlayer.id === 1) {
    turnText = 'Your Turn';
  }

  return (
    <GridWrapper>
      {isActive && (
        <FlexWrapper>
              <HugeText>{turn.amount}</HugeText>
              <Dice fv={turn.fv} isBig></Dice>
        </FlexWrapper>
      )}
      <TurnArrow angle={calcAngle()}></TurnArrow>
      <Text>{turnText}</Text>
    </GridWrapper>

  );
}

export default CenterDisplay;

