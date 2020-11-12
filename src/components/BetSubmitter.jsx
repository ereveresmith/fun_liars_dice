import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Button from './Button';
import IconButton from './IconButton';
import ArrowButton from './ArrowButton';
import Dice from './Dice';
import useSound from 'use-sound';
import { Sounds } from '../util/Sounds'
import { isValidBet } from '../util/Helper';

const AmountWrapper = Styled.div`
  display: grid;
  grid-template-columns: auto auto;
  min-width: 72px;
`

const HugeText = Styled.h1`
  font-size: ${Styles.fontSizes.huge};
  color: ${Styles.colors.darkGrey};
  justify-self: end;
  text-align: center;
`

const AmountTotalDisplay = Styled.div`
  font-size: 12px;
  color: ${Styles.colors.darkGrey};
  position: relative;
  font-weight: 400;
  align-self: center;
  justify-self: end;
  margin: 0;
  padding: 0;
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

const BetSubmitter = ({defaultAmount, defaultFv, onSubmit, canCall, globalVolume, currentAmount, currentFv, disabled, color, totalAmount}) => {
  const [fv, setFv] = useState(defaultFv);
  const [amount, setAmount] = useState(defaultAmount);
  const [mode, setMode] = useState("amount");

  const [playClickUISound] = useSound(Sounds.clickUI, { volume: globalVolume });


  useEffect(() => {
    setFv(defaultFv);
  }, [defaultFv])

  useEffect(() => {
    setAmount(defaultAmount);
  }, [defaultAmount])


  useEffect(() => {
    document.body.addEventListener('keydown', function(event) {
      console.log(event.key)
      let key = event.key;
      if(key === "Enter") {
        handleSubmit()
      } else if (key === "Backspace") {
        setAmount(1);
        setFv(1);
      } 
      else {
        switch(parseInt(key)) {
        case 1:
          if (mode === "amount") {
            setAmount(1);
          } else {
            setFv(1);
          }
          break;
        case 2:
          console.log(mode)
          if (mode === "amount") {
            setAmount(2);
          } else {
            setFv(2);
          }
          break;
        case 3:
          if (mode === "amount") {
            setAmount(3);
          } else {
            setFv(3);
          }
          break;
        case 4: 
          if (mode === "amount") {
            setAmount(4);
          } else {
            setFv(4);
          }          break;
        case 5: 
          if (mode === "amount") {
            setAmount(5);
          } else {
            setFv(5);
          }          
          break;
        case 6:
          if (mode === "amount") {
            setAmount(6);
          } else {
            setFv(6);
          }          
          break;
          case 7:
            setAmount(7);
            break;
        case 8:
            setAmount(8);      
            break;
          case 9:
            setAmount(9);      
            break;
        default:
          break;
        }
      }
    });
  }, [mode])

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
    onSubmit(amount, fv);
  }

  const handleCall = () => {
      onSubmit(-1, -1);
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter' || event.key === 'Space'){
      handleSubmit();
    }
  }



  let isDisabled = disabled;
  if (!disabled) {
    isDisabled = !isValidBet(amount, fv, currentAmount, currentFv);
  }

  let amountDisabled = true;
  if (amount > currentAmount && amount > 1) {
    amountDisabled = false;
  }

  return (
    <Wrapper onKeyPress={handleKeyDown}>
      <VerticalGrid>
        <ArrowButton onClick={handleRaiseAmount} direction={'up'}></ArrowButton>
        <AmountWrapper>
          <HugeText>{amount}</HugeText>
          <AmountTotalDisplay>/{totalAmount}</AmountTotalDisplay>
        </AmountWrapper>
        <ArrowButton onClick={handleLowerAmount} disabled={amountDisabled}></ArrowButton>
      </VerticalGrid>
      <VerticalGrid>
        <ArrowButton onClick={handleRaiseFv} direction={'up'} disabled={fv === 6}></ArrowButton>
        <Dice fv={fv} size={Styles.diceSizes.ui} visible></Dice>
        <ArrowButton onClick={handleLowerFv} disabled={fv === 1}></ArrowButton>
      </VerticalGrid>
      <VerticalGrid>
        <Button label="Bet" color={color} onClick={handleSubmit} primary disabled={isDisabled}></Button>
        <Button label="Call" onClick={handleCall} disabled={!canCall} color={Styles.colors.red}></Button>
      </VerticalGrid>
    </Wrapper>
  );
}

export default BetSubmitter;

