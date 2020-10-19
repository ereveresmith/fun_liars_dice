import React, {useEffect, useRef} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';

const StyledMessage = Styled.span`
  font-size: ${Styles.fontSizes.large};
  overflow: hidden;
  font-weight: 500;
  color: ${Styles.colors.black};
  opacity: 0.9;
  text-align: center;
  margin-bottom: 8px;
`

const Wrapper = Styled.div`
  height: 130px;
  padding: 4px;
  opacity: 0.8;
  justify-content: center;
  border-radius: 8px;
  grid-auto-rows: max-content;
  display: grid;
  overflow: scroll;
  align-self: center;
  padding-left: 12px;
  align-items: start;
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

