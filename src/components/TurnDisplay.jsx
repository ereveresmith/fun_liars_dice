import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from './Dice';

const FlexWrapper = Styled.div`
  text-align: center;
  align-items: center;
  display: flex;
  justify-content: center;
  margin: 28px 0;

  ${props => props.opacity && `
    opacity: ${props.opacity};
  `}
`

const HugeText = Styled.h1`
  font-size: 3em;
  ${props => props.color && `
    color: ${props.color};
  `}
  opacity: 0.6;
  padding-right: 16px;
  text-align: center;
`

const TurnDisplay = ({ amount, fv, opacity, color }) => {
  const amountDisplay = (amount > 0 ? amount : '?');

  return (
    <FlexWrapper opacity={opacity}>
      <HugeText color={color}>{amountDisplay}</HugeText>
      <Dice fv={fv} isBig></Dice>
    </FlexWrapper>
  );
}

export default TurnDisplay;

