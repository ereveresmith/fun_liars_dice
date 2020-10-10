import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles'

const Wrapper = Styled.div`
  text-align: center;
  align-items: center;
  font-size: 2em;
`

const CenterDisplay = (props) => {
  return (
    <Wrapper className="CenterDisplay">
      <h1>3 3's</h1>
    </Wrapper>
  );
}

export default CenterDisplay;

