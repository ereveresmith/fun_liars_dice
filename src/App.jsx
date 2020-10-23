import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import { Styles } from './util/Styles'
import Game from './GAME';
import Settings from './SETTINGS';
import Button from './components/Button'

const App = () => {
  const [page, setPage] = useState('settings');
  const [gameSettings, setGameSettings] = useState(null)

  const handleStartGame = (settings) => {
    setGameSettings(settings);
    setPage('game');
  }

  const handleEndGame = () => {
    setPage('home');
    setGameSettings({});
  }

  const renderPage = () => {
    switch(page) {
      case 'game': 
        return <Game settings={gameSettings} onEnd={handleEndGame}></Game>;
      case 'home': 
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
