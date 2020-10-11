import React, {useState} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Button from './Button';
import Dice from './Dice';

const Grid = Styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
`

const VerticalGrid = Styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
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

  return (
    <Grid>
      <VerticalGrid>
        <Button label="Raise" onClick={handleRaiseAmount}></Button>
        {amount}
        <Button label="Lower" onClick={handleLowerAmount}></Button>
      </VerticalGrid>
      <Button label="Submit" onClick={handleSubmit}></Button>
      <VerticalGrid>
        <Button label="Raise" onClick={handleRaiseFv}></Button>
        <Dice fv={fv}></Dice>
        <Button label="Lower" onClick={handleLowerFv}></Button>
      </VerticalGrid>
    </Grid>
  );
}

export default BetSubmitter;

