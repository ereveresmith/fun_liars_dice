import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Button from './Button';
import Dice from './Dice';

const HugeText = Styled.h1`
  font-size: ${Styles.fontSizes.large};
  color: ${Styles.colors.white};
  text-align: center;
  min-width: 12px;
`

const Wrapper = Styled.div`
  z-index: 2;
  background-color: ${Styles.colors.darkGrey};
  box-shadow: 0 2px 3px ${Styles.colors.black};
  opacity: 0.83;
  padding: 16px 4px;
  grid-gap: 8px;
  margin-bottom: 4px;
  display: grid;
  height: 140px;
  justify-content: center;
  width: 100%;
  grid-template-columns: auto auto auto;
  align-self: center;
  align-items: center;
  user-select: none;
`

const VerticalGrid = Styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  align-items: center;
  justify-items: center;
  height: 110px;
`

const HorizontalGrid = Styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    align-items: center;
    justify-items: center;
`

const BetSubmitter = (props) => {
  const [fv, setFv] = useState(props.defaultFv);
  const [amount, setAmount] = useState(props.defaultAmount);

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
    if (props.disabled === false) {
      props.onSubmit(amount, fv);
    }
  }

  const handleCall = () => {
    if (props.disabled === false && props.canCall) {
      props.onSubmit(-1, -1);
    }
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter' || event.key === 'Space'){
      handleSubmit();
    }
  }

  return (
    <Wrapper onKeyPress={handleKeyDown}>
      <VerticalGrid>
        <Button isSecondary onClick={handleRaiseAmount}></Button>
        <HugeText>{amount}</HugeText>
        <Button isSecondary onClick={handleLowerAmount}></Button>
      </VerticalGrid>
      <VerticalGrid>
        <Button isSecondary onClick={handleRaiseFv}></Button>
        <Dice fv={fv} size={Styles.diceSizes.ui} visible></Dice>
        <Button isSecondary onClick={handleLowerFv}></Button>
      </VerticalGrid>
      <VerticalGrid>
        <Button label="Submit" onClick={handleSubmit}></Button>
        <div></div>
        <Button isSecondary label="Liar!" onClick={handleCall}></Button>
      </VerticalGrid>
    </Wrapper>
  );
}

export default BetSubmitter;

