import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Button from './Button';
import Dice from './Dice';

const HugeText = Styled.h1`
  font-size: ${Styles.fontSizes.huge};
  color: ${Styles.colors.white};
  text-align: center;
`

const Wrapper = Styled.div`
  z-index: 2;
  padding: 16px 24px;
  background-color: ${Styles.colors.darkGrey};
  opacity: 0.8;
  border: 2px solid ${Styles.colors.darkGrey};
  display: grid;
  width: 300px;
  min-height: 12px;
  grid-template-columns: auto auto auto auto;
  justify-items: center;
  align-text: center;
`

const VerticalGrid = Styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  align-items: center;
  justify-items: center;
`
const UISection = (props) => {
  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  );
}

export default UISection;

