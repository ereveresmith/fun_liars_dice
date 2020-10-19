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
  height: 100px;  
  border-bottom: 1px solid ${Styles.colors.grey};
  width: 100%;
  justify-self: center;
  padding: 8px;
  margin-bottom: 8px;
  align-content: end;
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

      const calcDiceSize = () => {
        const calcSize = 1.7 + (0.1 * message.amount);
        const sizeEm = `${calcSize}em`;
        return sizeEm;
      }

      let logMessage = <StyledSpand 
        isNewest={isNewest}
        key={`message${index}`}>
          <MessageWrapper>
            {message.value}
          </MessageWrapper>
          {hasFv && <DiceWrapper>
            <Dice fv={message.fv} size={calcDiceSize()} visible></Dice>
          </DiceWrapper>}
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

