import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Button from './Button';
import Dice from './Dice';

const HugeText = Styled.h1`
  font-size: 3em;
  color: ${Styles.colors.black};
  opacity: 0.6;
  text-align: center;
`

const Grid = Styled.div`
  display: grid;
  grid-template-columns: auto auto;
  align-self: center;
  justify-self: center;
  align-items: center;
  justify-items: center;
`

const VerticalGrid = Styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
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
    if (!props.disabled) {
      props.onSubmit(amount, fv);
    }
  }

  const handleCall = () => {
    if (!props.disabled) {
      props.onSubmit(-1, -1);
    }
  }

  return (
    <Grid>
      <VerticalGrid>
        <Button isGrey onClick={handleRaiseAmount}></Button>
        <HugeText>{amount}</HugeText>
        <Button isGrey onClick={handleLowerAmount}></Button>
      </VerticalGrid>
      <VerticalGrid>
        <Button isGrey onClick={handleRaiseFv}></Button>
        <Dice fv={fv} isBig></Dice>
        <Button isGrey onClick={handleLowerFv}></Button>
      </VerticalGrid>
      <Button isGrey label="Liar!" onClick={handleCall}></Button>
      <Button isGrey label="Submit" onClick={handleSubmit}></Button>
    </Grid>
  );
}

export default BetSubmitter;

