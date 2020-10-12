import React, {useState} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from './Dice';

const StyledMessage = Styled.span`
  font-size: 16px;
  height: 20px;
  max-width: 160px;
  overflow: hidden;
  font-weight: 500;
  color: ${Styles.colors.darkGrey};
  opacity: 0.9;
`

const Wrapper = Styled.div`
  overflow: scroll;
  display: grid;
  padding: 24px;
  grid-auto-flow: row;
  grid-template-rows: min-content;
`

const LogContainer = (props) => {
  const renderedLog = () => {
    const logItems = props.log.map((message, index) => {
      return <StyledMessage key={`message${index}`}>{message}</StyledMessage>
    })

    return logItems;
  }

  return (
    <Wrapper>
      {renderedLog()}
    </Wrapper>
  );
}

export default LogContainer;

