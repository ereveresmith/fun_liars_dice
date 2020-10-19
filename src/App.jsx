import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import { Styles } from './util/Styles'
import Game from './GAME';
import Settings from './SETTINGS';
import Button from './components/Button'
import { defaultSettings } from './util/Helper';

const StyledNav = Styled.nav`
  background-color: ${Styles.colors.darkGrey};
  color: ${Styles.colors.white};
  opacity: 0.9;
  height: 64px;
  border-radius: 8px;
  display: flex;
  justify-items: end;
  padding-right: 12px;
  justify-content: flex-end;
  align-items: center;
`

const App = () => {
  const [page, setPage] = useState('game');
  const [gameSettings, setGameSettings] = useState(defaultSettings)

  const handleStartGame = (settings) => {
    setGameSettings(settings);
    setPage('game');
  }

  const handleEndGame = () => {
    setPage('settings');
    setGameSettings({});
  }

  const handleClickSettings = () => {
    setPage('settings');
  }

  const handleClickGame = () => {
    if (gameSettings !== null) {
      setPage('game');
    }
  }

  const renderPage = () => {
    switch(page) {
      case 'game': 
        return <Game settings={gameSettings} onEnd={handleEndGame}></Game>;
      case 'settings': 
        return <Settings onSubmit={handleStartGame}></Settings>;
      default: 
        return <Settings onSubmit={handleStartGame}></Settings>;
    }
  }

  return (
    <div className="App">
      <StyledNav>
        <Button label={"Settings"} isSecondary onClick={handleClickSettings}></Button>
        <Button label={"Play"} isPrimary onClick={handleClickGame}></Button>
      </StyledNav>
      {renderPage()}
    </div>
  );
}

export default App;
