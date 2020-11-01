import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Button from './Button';
import IconButton from './IconButton';
import Dice from './Dice';

const HugeText = Styled.h1`
  font-size: ${Styles.fontSizes.huge};
  color: ${Styles.colors.white};
  text-align: center;
  min-width: 12px;
`

const Wrapper = Styled.div`
  touch-action: manipulation;
  z-index: 2;
  background-color: ${Styles.colors.darkGrey};
  box-shadow: 0 2px 3px ${Styles.colors.black};
  opacity: 0.83;
  padding: 12px 0;
  grid-gap: 4px;
  touch-action: manipulation;
  display: grid;
  min-height: 160px;
  justify-content: start;
  width: 100%;
  max-width: 270px;
  grid-template-columns: auto auto auto;
  align-self: center;
  align-items: center;
  user-select: none;
`

const VerticalGrid = Styled.div`
  display: grid;
  grid-template-rows: auto 50px auto;
  align-items: center;
  justify-items: center;
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
        <IconButton isSecondary onClick={handleRaiseAmount} direction={'up'}></IconButton>
        <HugeText>{amount}</HugeText>
        <IconButton isSecondary onClick={handleLowerAmount}></IconButton>
      </VerticalGrid>
      <VerticalGrid>
        <IconButton isSecondary onClick={handleRaiseFv} direction={'up'}></IconButton>
        <Dice fv={fv} size={Styles.diceSizes.ui} visible></Dice>
        <IconButton isSecondary onClick={handleLowerFv}></IconButton>
      </VerticalGrid>
      <VerticalGrid>
        <Button label="Submit Bet" onClick={handleSubmit}></Button>
        <div></div>
        <Button isSecondary label="Call Lie" onClick={handleCall}></Button>
      </VerticalGrid>
    </Wrapper>
  );
}

export default BetSubmitter;

