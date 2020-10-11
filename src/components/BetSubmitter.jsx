import React, {useState} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Button from './Button';
import Dice from './Dice';

const HugeText = Styled.h1`
  font-size: 3em;
  color: ${Styles.colors.black};
  opacity: 0.8;
  text-align: center;
`

const Grid = Styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  align-items: center;
    justify-items: center;
`

const VerticalGrid = Styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  align-items: center;
  width: 120px;
    justify-items: center;
`

const BetSubmitter = (props) => {
  const [fv, setFv] = useState(1);
  const [amount, setAmount] = useState(1);

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
    props.onSubmit(amount, fv);
  }

  const handleCall = () => {
    props.onSubmit(-1, -1);
  }

  return (
    <Grid>
      <VerticalGrid>
        <Button onClick={handleRaiseAmount}></Button>
        <HugeText>{amount}</HugeText>
        <Button onClick={handleLowerAmount}></Button>
      </VerticalGrid>
      <VerticalGrid>
        <Button onClick={handleRaiseFv}></Button>
        <Dice fv={fv} isBig></Dice>
        <Button onClick={handleLowerFv}></Button>
      </VerticalGrid>
      <VerticalGrid>
        <Button label="Submit" onClick={handleSubmit}></Button>
        <Button label="Liar!" onClick={handleCall}></Button>
      </VerticalGrid>
    </Grid>
  );
}

export default BetSubmitter;

