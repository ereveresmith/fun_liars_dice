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
  height: 100%;
  padding: 4px;
  background-color: ${Styles.colors.darkGrey};
  opacity: 0.8;
  border: 2px solid ${Styles.colors.darkGrey};
  border-radius: 8px;
  display: grid;
  grid-template-columns: auto auto;
  align-self: center;
  align-items: center;
  justify-items: center;
`

const VerticalGrid = Styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  height: 170px;
  align-items: center;
  justify-items: center;
`
const BetSubmitter = (props) => {
  const [fv, setFv] = useState(props.defaultFv);
  const [amount, setAmount] = useState(props.defaultAmount);
  const [position, setPosition] =useState({x: 1, y: 1})

  useEffect(() => {
    setFv(props.defaultFv);
    setAmount(props.defaultAmount);
  }, [props.defaultAmount, props.defaultFv])

  const handleLowerAmount = () => {
    if(amount - 1 > 0) {
      setAmount(amount - 1)
    }
  }

  const handleRaiseAmount = () => {
    if(amount + 1 <= 99) {
      setAmount(amount + 1)
    }
  }

  const handleLowerFv = () => {
    if(fv - 1 > 0) {
      setFv(fv - 1)
    }
  }

  const handleRaiseFv = () => {
    if(fv + 1 <= 6) {
      setFv(fv + 1)
    }
  }

  const handleSubmit = () => {
    if (!props.disabled) {
      props.onSubmit(amount, fv);
    }
  }

  const handleCall = () => {
    if (!props.disabled && props.canCall) {
      props.onSubmit(-1, -1);
    }
  }

  return (
    <Wrapper>
      <VerticalGrid>
        <Button isSecondary onClick={handleRaiseAmount}></Button>
        <HugeText>{amount}</HugeText>
        <Button isSecondary onClick={handleLowerAmount}></Button>
      </VerticalGrid>
      <VerticalGrid>
        <Button isSecondary onClick={handleRaiseFv}></Button>
        <Dice fv={fv} size={Styles.fontSizes.huge}></Dice>
        <Button isSecondary onClick={handleLowerFv}></Button>
      </VerticalGrid>
      <Button isSecondary label="Liar!" onClick={handleCall}></Button>
      <Button label="Submit" onClick={handleSubmit}></Button>
    </Wrapper>
  );
}

export default BetSubmitter;

