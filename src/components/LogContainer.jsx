import React, {useEffect, useRef} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';

const StyledMessage = Styled.span`
  font-size: 16px;
  height: 20px;
  overflow: hidden;
  font-weight: 500;
  color: ${Styles.colors.darkGrey};
  opacity: 0.9;
`

const Wrapper = Styled.div`
  overflow: scroll;
  display: grid;
  justify-content: center;
  grid-gap: 12px;
`

const LogContainer = (props) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth"})
  }, [props.log])

  const renderedLog = () => {
    const logItems = props.log.map((message, index) => {
      return <StyledMessage key={`message${index}`}>{message}</StyledMessage>
    })

    return logItems;
  }

  return (
    <Wrapper>
      {renderedLog()}
      <div ref={bottomRef}></div>
    </Wrapper>
  );
}

export default LogContainer;

