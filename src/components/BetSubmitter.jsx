import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Button from './Button';
import IconButton from './IconButton';
import ArrowButton from './ArrowButton';
import Dice from './Dice';
import useSound from 'use-sound';
import { Sounds } from '../util/Sounds'

const HugeText = Styled.h1`
  font-size: ${Styles.fontSizes.huge};
  color: ${Styles.colors.darkGrey};
  text-align: center;
  min-width: 12px;
`

const Wrapper = Styled.div`
  touch-action: manipulation;
  z-index: 2;
  background-color: ${Styles.colors.white};
  opacity: 0.83;
  box-shadow: ${Styles.boxShadows.medium};
  grid-gap: 12px;
  height: 120px;
  touch-action: manipulation;
  display: grid;
  justify-content: start;
  width: 100%;
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

const BetSubmitter = ({defaultAmount, defaultFv, disabled, onSubmit, canCall, globalVolume}) => {
  const [fv, setFv] = useState(defaultFv);
  const [amount, setAmount] = useState(defaultAmount);

  const [playClickUISound] = useSound(Sounds.clickUI, { volume: globalVolume });


  useEffect(() => {
    setFv(defaultFv);
  }, [defaultFv])

  useEffect(() => {
    setAmount(defaultAmount);
  }, [defaultAmount])

  const handleLowerAmount = () => {
    if(amount - 1 > 0) {
      playClickUISound();
      setAmount(amount - 1)
    }
  }

  const handleRaiseAmount = () => {
    if(amount + 1 <= 99) {
      playClickUISound();
      setAmount(c => c + 1)
    }
  }

  const handleLowerFv = () => {
    if(fv - 1 > 0) {
      playClickUISound();
      setFv(c => c - 1)
    }
  }

  const handleRaiseFv = () => {
    if(fv + 1 <= 6) {
      playClickUISound();
      setFv(c => c + 1)
    }
  }

  const handleSubmit = () => {
    if (disabled === false) {
      onSubmit(amount, fv);
    }
  }

  const handleCall = () => {
    if (disabled === false && canCall) {
      onSubmit(-1, -1);
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
        <ArrowButton onClick={handleRaiseAmount} direction={'up'}></ArrowButton>
        <HugeText>{amount}</HugeText>
        <ArrowButton onClick={handleLowerAmount}></ArrowButton>
      </VerticalGrid>
      <VerticalGrid>
        <ArrowButton onClick={handleRaiseFv} direction={'up'}></ArrowButton>
        <Dice fv={fv} size={Styles.diceSizes.ui} visible></Dice>
        <ArrowButton onClick={handleLowerFv}></ArrowButton>
      </VerticalGrid>
      <VerticalGrid>
        <Button label="Bet" primary onClick={handleSubmit}></Button>
        <Button label="Call" onClick={handleCall}></Button>
      </VerticalGrid>
    </Wrapper>
  );
}

export default BetSubmitter;

