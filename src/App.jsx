import React, {useState} from 'react';
import Styled from 'styled-components';
import Game from './GAME';
import Settings from './SETTINGS';
import { randomInt, YOU, mockPlayers, mockNames } from './util/Helper';

const App = () => {
  const initialPlayers = [YOU, ...mockPlayers];

  const randomName = () => {
    const int = randomInt(5);
    return mockNames[int];
  }

  const defaultSettings = {
    amountOfPlayers: 5,
    players: initialPlayers,
  }

  const generatePlayers = () => {
    return mockPlayers;
  }
  const [page, setPage] = useState('settings');
  const [gameSettings, setGameSettings] = useState(defaultSettings)

  const handleStartGame = () => {
    setPage('game');
  }

  const handleEndGame = () => {
    setPage('settings');
  }

  const renderPage = () => {
    switch(page) {
      case 'game': 
        return <Game settings={gameSettings} onEnd={handleEndGame}></Game>;
      case 'settings': 
        return <Settings onStart={handleStartGame}></Settings>;
      default: 
        return <Settings onStart={handleStartGame}></Settings>;
    }
  }

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
