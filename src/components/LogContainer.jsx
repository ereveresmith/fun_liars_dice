import React, {useEffect, useRef} from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import Dice from '../components/Dice';

const DiceWrapper = Styled.div`
  margin-left: 8px;
  display: grid;
  grid-template-columns: auto auto;
`

const ScrollDiv = Styled.div`
`

const HugeText = Styled.div`
  font-size: ${Styles.fontSizes.large};
  font-weight: 500;
  opacity: 0.7;
  text-align: center;
  align-self: center;
  margin-right: 8px;

  ${props => props.isNewest && `
    opacity: .95;
    font-weight: 700;
  `}
`


const StyledSpan = Styled.span`
  overflow: hidden;
  align-items: center;
  color: ${Styles.colors.black};
  opacity: 0.65;
  margin-bottom: 4px;
  font-size: ${Styles.fontSizes.medium};
  text-align: center;
  display: grid;
  padding: 4px 0;
  grid-template-columns: auto auto auto;
  justify-content: center;
  transition: opacity ease 2s;

  ${props => props.isNewest && `
    opacity: .97;
    font-weight: 600;
  `}
`

const Wrapper = Styled.div`
  box-shadow: 0 2px 3px ${Styles.colors.darkGrey};
  height: 150px;
  width: 100%;
  touch-action: manipulation;
  justify-self: center;
  align-content: end;
  opacity: 0.8;
  justify-content: center;
  grid-auto-rows: max-content;
  overflow: scroll;
  align-self: center;
  align-items: start;
`

const LogContainer = (props) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth", block: 'end' })
  }, [props.log])


  const renderedLog = () => {
    const logItems = props.log.map((message, index) => {
      const isNewest = props.log.length === (index+1);


      const hasFv = (message.fv !== undefined);
      const hasAmount = (message.amount !== undefined);

      const actionDisplay = () => {
        let actionDiv = null;

        if (hasFv) {
          actionDiv = <DiceWrapper>
            <HugeText isNewest={isNewest}>{message.amount}</HugeText>
            <Dice fv={message.fv} size={Styles.diceSizes.medium} visible></Dice>
          </DiceWrapper>
        }

        return actionDiv;
      }

      let logMessage = <StyledSpan 
        isNewest={isNewest}
        key={`message${index}`}>
          {message.value}
          {actionDisplay()}
          {message.value2}
      </StyledSpan>;
      return logMessage;
    })

    return logItems;
  }

  return (
    <Wrapper>
      {renderedLog()}
      <ScrollDiv ref={bottomRef}></ScrollDiv>
    </Wrapper>
  );
}

export default LogContainer;

