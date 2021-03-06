import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles';
import BetSubmitter from './BetSubmitter';
import Switch from './Switch';
import Button from './Button';
import IconButton from './IconButton';

import LogContainer from './LogContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { icon } from '@fortawesome/fontawesome-svg-core';
import { render } from 'react-dom';



const UIOuterGrid = Styled.div`
  display: grid;
  align-self: baseline;
  margin-left: 24px; 

  ${props => props.isLeftHanded && `
    margin-left: 0%; 
    margin-right: 24px; 
  `}

  ${props => props.screenSize === "small" && `
    margin: 0;
  `}
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


const UserInterface = ({ exact, totalAmount, currentTurn, defaultAmount, defaultFv, screenSize, log, isLeftHanded, isChallenge, onSubmit, isShowingModalButton, onShowModal, globalVolume, onMute, onSwitchView, onClickDice, color}) => {
  const nextPlayer = currentTurn.nextPlayer;
  const myTurn = (nextPlayer.id === 1);
  let isSmall = (screenSize === "small")

  const renderUIControls = () => {
    return (
      <UILongSection screenSize={screenSize} isLeftHanded={isLeftHanded}>
        {isShowingModalButton && <Button label={"Finish"} onClick={handleShowModal}></Button>}
        <IconButton isDefaultActive={globalVolume > 0} icon={'volume'} onClick={handleMute}></IconButton>
        <Switch color={color} isDefaultChecked={!isLeftHanded} onChange={handleSwitchView}></Switch>
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

  const handleClickDice = (fv) => {
    onClickDice(fv)
  }

  const canCall = (currentTurn.fv > 0 && myTurn && !isChallenge);
  const disabled = (!myTurn || isChallenge);

  const renderBetSubmitter = () => {
    return <BetSubmitter
      exact={exact}
      color={color}
      currentAmount={currentTurn.amount}
      totalAmount={totalAmount}
      currentFv={currentTurn.fv}
      globalVolume={globalVolume}
      canCall={canCall}
      disabled={disabled}
      defaultFv={defaultFv}
      defaultAmount={defaultAmount}
      onSubmit={onSubmit}>
    </BetSubmitter>
  }

  const renderLog = () => {
    return <LogContainer
        onClickDice={handleClickDice}
        log={log}
        screenSize={screenSize}>
      </LogContainer>
  }

  const smallUI = () => {
    return (<UIOuterGrid isLeftHanded={isLeftHanded} screenSize={screenSize}>
    {renderUIControls()}
    <UIGrid screenSize={screenSize}>
      {!isLeftHanded && renderLog()}
        {renderBetSubmitter()}
      {isLeftHanded && renderLog()}
    </UIGrid>
    </UIOuterGrid>)
  }

  const bigUI = () => {
    return (<UIOuterGrid isLeftHanded={isLeftHanded} screenSize={screenSize}>
      <UIGrid screenSize={screenSize}>
        {renderLog()}
        {renderUIControls()}
        {renderBetSubmitter()}
      </UIGrid>
      </UIOuterGrid>)
  }

  return (
    isSmall ? smallUI() : bigUI()
  )
}

export default UserInterface;

