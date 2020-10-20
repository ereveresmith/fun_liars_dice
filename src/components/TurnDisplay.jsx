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
  font-size: ${Styles.fontSizes.huge};
  ${props => props.color && `
    color: ${props.color};
  `}
  opacity: 0.8;
  padding-right: 8px;
  text-align: center;
  align-self: center;
`

const TurnDisplay = ({ amount, fv, opacity, color }) => {
  const amountDisplay = (amount > 0 ? amount : '?');

  return (
    <FlexWrapper opacity={opacity}>
      <HugeText color={color}>{amountDisplay}</HugeText>
      <Dice fv={fv} size={Styles.diceSizes.large} visible></Dice>
    </FlexWrapper>
  );
}

export default TurnDisplay;

