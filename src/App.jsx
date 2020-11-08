import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import { Styles } from './util/Styles'
import Game from './Game';
import Settings from './Settings';
import Button from './components/Button'
import { Modal } from './components/Modal';
import { faXRay } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [page, setPage] = useState('settings');
  const [gameSettings, setGameSettings] = useState(null);
  const [isShowingModal, setIsShowingModal] = useState(false);

  const Nav = Styled.div`
    width: 100%;
    height: 24px;
    background-color: ${Styles.colors.darkGrey};
    opacity: 0.9;
    padding: 1px 8px;
  `

  const NavLink = Styled.a`
    font-size: ${Styles.fontSizes.medium};
    color: ${Styles.colors.white};
    font-weight: 600;
    cursor: pointer;
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
        return <Game settings={gameSettings} onEnd={handleConfirmGoHome}></Game>;
      case 'home': 
        return <Settings onSubmit={handleStartGame}></Settings>;
      default: 
        return <Settings onSubmit={handleStartGame}></Settings>;
    }
  }

  return (
    <div className="App">
      <Modal 
        active={isShowingModal} 
        onClose={handleCancelModal}
        title={"Are you sure?"}
        icon={faXRay}
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
