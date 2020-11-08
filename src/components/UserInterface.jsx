import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import BetSubmitter from './BetSubmitter';
import Switch from './Switch';
import Button from './Button';
import IconButton from './IconButton';

import LogContainer from './LogContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



const UIOuterGrid = Styled.div`
  display: grid;
  align-self: baseline;
`

const UIGrid = Styled.div`
  display: grid;
  height: 100%;
  width: 100%;

  grid-template-columns: auto auto;
  grid-template-rows: auto auto;

  ${props => (props.screenSize === "medium" || props.screenSize === "large") && `
    grid-template-rows: auto auto auto;
    grid-template-columns: auto;
  `}

  align-content: center;
  justify-content: center;
`


const UILongSection = Styled.div`
  box-shadow: ${Styles.boxShadows.medium};
  background-color: ${Styles.colors.white};
  opacity: 0.83;
  padding: 4px 8px;

  ${props => props.screenSize === 'small' && `
    border-radius: 8px 8px 0 0;
  `}
  justify-items: end;
  justify-content: end;

  ${props => props.isLeftHanded && `
    justify-items: start;
    justify-content: start;
  `}
  display: grid;
  align-items: center;
  display: grid;
  grid-template-columns: auto auto auto auto auto;
`


const UserInterface = ({ turns, screenSize, log, isLeftHanded, isChallenge, onSubmit, isShowingModalButton, onShowModal, globalVolume, onMute, onSwitchView}) => {
  const currentTurn = turns[turns.length - 1];
  const nextPlayer = currentTurn.nextPlayer;
  const myTurn = (nextPlayer.id === 1);

  let defaultAmount = currentTurn.amount;
  if (defaultAmount < 1) {
    defaultAmount++;
  }

  let defaultFv = currentTurn.fv + 1;
  if (defaultFv < 1) {
    defaultFv++;
  } else if (defaultFv > 6) {
    defaultFv = 1;
    defaultAmount++;
  }
  let isSmall = (screenSize === "small")
  console.log("IS SMALL: " + isSmall  )


const renderUIControls = () => {
  return (
    <UILongSection screenSize={screenSize} isLeftHanded={isLeftHanded}>
      {isShowingModalButton && <Button label={"Finish"} onClick={handleShowModal}></Button>}
      <IconButton isDefaultActive={globalVolume > 0} icon={'volume'} onClick={handleMute}></IconButton>
      <Switch isDefaultChecked={!isLeftHanded} onChange={handleSwitchView}></Switch>
    </UILongSection>
  )
  }

  const handleShowModal = () => {
    onShowModal();
  }

  const handleMute = () => {
    onMute();
  }

  const handleSwitchView = () => {
    onSwitchView();
  }

  const handleClickSubmit = () => {
    onSubmit();
  }

  const smallUI = () => {
    return (<UIOuterGrid>
    {renderUIControls()}
    <UIGrid screenSize={screenSize}>
      {!isLeftHanded && <LogContainer
        log={log}
        isTall={!isSmall}>
      </LogContainer>}
      <BetSubmitter
        canCall={currentTurn.fv > 0}
        disabled={!myTurn || isChallenge}
        defaultFv={defaultFv}
        defaultAmount={defaultAmount}
        onSubmit={handleClickSubmit}>
      </BetSubmitter>
      {isLeftHanded && <LogContainer
        log={log}
        isTall={!isSmall}>
      </LogContainer>}
    </UIGrid>
    </UIOuterGrid>)
  }

  const bigUI = () => {
    return (<UIOuterGrid>
      <UIGrid screenSize={screenSize}>
        <LogContainer
          log={log}
          isTall={!isSmall}>
        </LogContainer>
        {renderUIControls()}
        <BetSubmitter
          canCall={currentTurn.fv > 0}
          disabled={!myTurn || isChallenge}
          defaultFv={defaultFv}
          defaultAmount={defaultAmount}
          onSubmit={handleClickSubmit}>
        </BetSubmitter>
      </UIGrid>
      </UIOuterGrid>)
  }

  return (
    isSmall ? smallUI() : bigUI()
  )
}

export default UserInterface;

