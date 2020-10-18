import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import { Styles } from './util/Styles'
import Game from './GAME';
import Settings from './SETTINGS';

const App = () => {

  // useEffect(() => {

  // }, [gameSettings]);

  const [page, setPage] = useState('settings');
  const [gameSettings, setGameSettings] = useState({})

  const handleStartGame = (settings) => {
    setGameSettings(settings);
    setPage('game');
  }

  const handleEndGame = () => {
    setPage('settings');
    setGameSettings({});
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
      {renderPage()}
    </div>
  );
}

export default App;
