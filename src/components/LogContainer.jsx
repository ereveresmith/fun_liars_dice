import React, {useEffect, useRef} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';
import TurnDisplay from './TurnDisplay';

const StyledMessage = Styled.span`
  font-size: ${Styles.fontSizes.large};
  overflow: hidden;
  color: ${Styles.colors.black};
  opacity: 0.7;
  text-align: center;
  margin-bottom: 8px;
  z-index: -1;
  display: flex;
  padding: 4px;
  justify-content: center;
  transition: all ease 800ms;

  ${props => props.isNewest && `
    opacity: 1.0;
    font-weight: 600;
  `}
`

const Wrapper = Styled.div`
  height: 90px;  
  border-bottom: 1px solid ${Styles.colors.grey};
  width: 100%;
  justify-self: center;
  padding: 8px;
  margin-bottom: 8px;
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
      const isNewest = props.log.length === (index+1);
      const hasFv = (message.fv !== undefined);
      console.log(hasFv)

      let logMessage = <StyledMessage 
        isNewest={isNewest} 
        key={`message${index}`}>
          {message.value}
          {hasFv && <Dice fv={message.fv} size={Styles.diceSizes.small}></Dice>}
      </StyledMessage>;
      return logMessage;
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

