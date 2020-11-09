import React, { useEffect, useRef } from 'react';
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

  ${props => props.hasBorder && `
    border-top: ${Styles.colors.grey} 2px solid;
  `}
`

const Wrapper = Styled.div`
  box-shadow: ${Styles.boxShadows.medium};
  height: 120px;

  ${props => props.isTall && `
    min-height: 33vh;
  `}
  width: 100%;
  min-width: 168px;
  max-width: 290px;
  touch-action: manipulation;
  background-color: ${Styles.colors.white};
  justify-self: center;
  align-content: end;
  opacity: 0.8;
  justify-content: center;
  grid-auto-rows: max-content;
  overflow: scroll;
  align-self: center;
  align-items: start;
`

const LogContainer = ({ log, isTall, onClickDice }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current.scrollIntoView({ behavior: "smooth", block: 'end' })
  }, [log])


  const renderedLog = () => {
    const logItems = log.map((message, index) => {
      const isNewest = log.length === (index + 1);


      const hasFv = (message.fv !== undefined);

      const handleClickDice = () => (fv) => {
        if (onClickDice) {
          onClickDice(fv)
        }
      }

      const actionDisplay = () => {
        let actionDiv = null;

        if (hasFv) {
          actionDiv = <DiceWrapper>
            <HugeText isNewest={isNewest}>{message.amount}</HugeText>
            <Dice onClick={handleClickDice(message.fv)} fv={message.fv} size={Styles.diceSizes.small} visible></Dice>
          </DiceWrapper>
        }

        return actionDiv;
      }

      let logMessage = <StyledSpan
        hasBorder={message.firstTurn}
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
    <Wrapper isTall={isTall}>
      {renderedLog()}
      <ScrollDiv ref={bottomRef}></ScrollDiv>
    </Wrapper>
  );
}

export default LogContainer;

