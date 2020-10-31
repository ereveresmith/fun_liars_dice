import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from './Dice';

const FlexWrapper = Styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 0px 0;
  height: 30px;

  ${props => props.opacity && `
    opacity: ${props.opacity};
  `}
`

const StyledH1 = Styled.h1`
  ${props => props.color && `
    color: ${props.color};
  `}


  ${props => props.size && `
    font-size: ${props.size};
  `}
  margin-right: 8px;
  margin-bottom: 4px;
  text-align: center;
  align-self: center;
`

const TurnDisplay = ({ amount, fv, opacity, color, textSize, diceSize }) => {

  return (
    <FlexWrapper opacity={opacity}>
      <StyledH1 color={color} size={textSize}>{amount}</StyledH1>
      <Dice fv={fv} size={diceSize} visible></Dice>
    </FlexWrapper>
  );
}

export default TurnDisplay;

