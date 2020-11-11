import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import { Styles } from './util/Styles'
import Game from './Game';
import Settings from './Settings';
import Button from './components/Button'
import { Modal } from './components/Modal';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import {  WIDESCREEN_SIZE, SUPER_WIDESCREEN_SIZE } from './util/Defaults';

const App = () => {
  const [page, setPage] = useState('settings');
  const [gameSettings, setGameSettings] = useState(null);
  const [isShowingModal, setIsShowingModal] = useState(false);
  const [screenSize, setScreenSize] = useState("medium");

  useEffect(() => {
    const calcSize = (width) =>{
      if (width > SUPER_WIDESCREEN_SIZE) {
        console.log('large!')
        setScreenSize('large')
      } else if (width > WIDESCREEN_SIZE) {
        setScreenSize('medium')
        console.log('medium!')
      } else {
        setScreenSize('small')
        console.log('small!')
      }
    }
    const handleResize = (e) => {
      let width = e.currentTarget.innerWidth;
      calcSize(width);
    }
    window.addEventListener('resize', handleResize);
    function getWidth() {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
      );
    }
    let width = getWidth();
    calcSize(width);
  }, [])

  const Nav = Styled.div`
    width: 100%;
    display: grid;
    grid-template-columns: auto;
    justify-content: center;
    align-content: center;
    background-color: ${Styles.colors.darkGrey};
    opacity: 0.9;
  `

  const NavLink = Styled.a`
    font-size: ${Styles.fontSizes.medium};
    color: ${Styles.colors.white};
    font-weight: 600;
    cursor: pointer;
    padding-left: 0 8px;

    &:hover {
      color: ${Styles.colors.lightGrey};
    }
  `

  const handleStartGame = (settings) => {
    setGameSettings(settings);
    setPage('game');
  }

  const handleGoHome = () => {
    if (page === 'game') {
      setIsShowingModal(true);
    }
  }

  const handleCancelModal = () => {
    setIsShowingModal(false);
  }

  const handleConfirmGoHome = () => {
    setIsShowingModal(false);
    setPage('home');
    setGameSettings();
  }

  const renderPage = () => {
    switch(page) {
      case 'game': 
        return <Game 
          settings={gameSettings} 
          onEnd={handleConfirmGoHome} 
          screenSize={screenSize}>
        </Game>;
      case 'home': 
        return <Settings 
        screenSize={screenSize}
        onSubmit={handleStartGame}></Settings>;
      default: 
        return <Settings onSubmit={handleStartGame}
        screenSize={screenSize}></Settings>;
    }
  }

  return (
    <div className="App">
      <Modal 
        active={isShowingModal} 
        onClose={handleCancelModal}
        title={"Are you sure?"}
        icon={faExclamationCircle}
        text={"This will end your current game."}>
          <Button label={"Cancel"} onClick={handleCancelModal}></Button>
          <Button label={"Leave Game"} primary onClick={handleConfirmGoHome}></Button>
      </Modal>
      <Nav>
        <NavLink onClick={handleGoHome}>Tiny Liar's Dice</NavLink>
      </Nav>
      {renderPage()}
    </div>
  );
}

export default App;
