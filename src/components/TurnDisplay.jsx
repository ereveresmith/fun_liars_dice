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
  color: ${Styles.colors.black};
  opacity: 0.6;
  padding-right: 16px;
  text-align: center;
`

const TurnDisplay = ({ amount, fv, opacity }) => {
  const amountDisplay = (amount > 0 ? amount : '?');

  return (
    <FlexWrapper opacity={opacity}>
      <HugeText>{amountDisplay}</HugeText>
      <Dice fv={fv} isBig></Dice>
    </FlexWrapper>
  );
}

export default TurnDisplay;

