import React, {useEffect, useRef} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';
import TurnDisplay from './TurnDisplay';

const DiceWrapper = Styled.div`
  margin-left: 16px;
`

const MessageWrapper = Styled.div`
  font-size: ${Styles.fontSizes.medium};
`

const StyledSpand = Styled.span`
  overflow: hidden;
  align-items: center;
  color: ${Styles.colors.black};
  opacity: 0.7;
  text-align: center;
  margin-bottom: 8px;
  display: flex;
  padding: 4px;
  justify-content: center;
  transition: opacity ease 2s;

  ${props => props.isNewest && `
    opacity: .95;
    font-weight: 600;
  `}
`

const Wrapper = Styled.div`
  height: 150px;  
  border-bottom: 1px solid ${Styles.colors.grey};
  width: 100%;
  justify-self: center;
  padding: 8px;
  margin-bottom: 8px;
  border-radius: 800px;
  align-content: end;
  opacity: 0.8;
  justify-content: center;
  border-radius: 8px;
  grid-auto-rows: max-content;
  overflow: scroll;
  align-self: center;
  padding-top: 2px;
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
      const hasAmount = (message.amount !== undefined);

      const actionDisplay = () => {
        let value = null;

        if (hasFv && hasAmount) {
          value = <DiceWrapper>
            <Dice fv={message.fv} size={Styles.diceSizes.medium} visible></Dice>
          </DiceWrapper>
        }

        return value;
      }

      let logMessage = <StyledSpand 
        isNewest={isNewest}
        key={`message${index}`}>
          <MessageWrapper>
            {message.value}
            {actionDisplay()}
          </MessageWrapper>
      </StyledSpand>;
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

