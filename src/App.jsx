import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import { Styles } from './util/Styles'
import Game from './Game';
import Settings from './Settings';
import Button from './components/Button'
import { Modal } from './components/Modal';
import { faCoins, faExclamationCircle, faHome } from '@fortawesome/free-solid-svg-icons';
import {  WIDESCREEN_SIZE, SUPER_WIDESCREEN_SIZE, defaultSettings } from './util/Defaults';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
const App = () => {
  const [amountOfCoins, setAmountOfCoins] = useState(defaultSettings.coins);
  const [page, setPage] = useState('settings');
  const [gameSettings, setGameSettings] = useState(defaultSettings);
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
    grid-template-columns: auto auto;
    justify-content: space-between;
    align-content: center;
    background-color: ${Styles.colors.darkGrey};
    filter: brightness(100%);
    padding: 4px;
  `

  const NavLink = Styled.a`
    font-size: ${Styles.fontSizes.medium};
    color: ${Styles.colors.white};
    font-weight: 600;
    cursor: pointer;
    padding-left: 8px;

    &:hover {
      color: ${Styles.colors.lightGrey};
    }
  `

  const CoinsDisplay = Styled.span`
    font-size: ${Styles.fontSizes.medium};
    color: ${Styles.colors.white};
    font-weight: 400;
    padding-right: 0 8px;
  `

  const IconWrapper = Styled.div`
    padding: 4px;
    font-size: ${Styles.fontSizes.medium};
    display: inline;
    opacity: 0.6;
    color: ${Styles.colors.gold};

    &:hover {
      opacity: 0.9;
      cursor: pointer;
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

  const handleAddCoin = () => {
    console.log("adding a coin")
    setAmountOfCoins(c => c + 1);
  }

  const handleConfirmGoHome = () => {
    setIsShowingModal(false);
    setPage('home');
    setGameSettings(defaultSettings);
  }

  const renderPage = () => {
    switch(page) {
      case 'game': 
        return <Game 
          settings={gameSettings} 
          onEnd={handleConfirmGoHome} 
          addCoin={handleAddCoin}
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
        color={gameSettings.myColor}
        active={isShowingModal} 
        onClose={handleCancelModal}
        title={"Are you sure?"}
        icon={faExclamationCircle}
        text={"This will end your current game."}>
          <Button label={"Cancel"} color={gameSettings.myColor} onClick={handleCancelModal}></Button>
          <Button label={"Leave Game"} color={gameSettings.myColor} primary onClick={handleConfirmGoHome}></Button>
      </Modal>
      <Nav>
        <NavLink onClick={handleGoHome}>
            <FontAwesomeIcon icon={faHome}></FontAwesomeIcon>
          Tiny Liar's Dice</NavLink>
        <CoinsDisplay>{amountOfCoins}       
         <IconWrapper>
          <FontAwesomeIcon icon={faCoins}/>
         </IconWrapper>
        </CoinsDisplay>
      </Nav>
      {renderPage()}
    </div>
  );
}

export default App;
