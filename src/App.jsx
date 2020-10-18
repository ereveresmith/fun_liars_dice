import React, {useState, useEffect} from 'react';
import Styled from 'styled-components';
import { Styles } from './util/Styles'
import Game from './GAME';
import Settings from './SETTINGS';
import { randomInt, YOU, mockPlayers, mockNames } from './util/Helper';

const App = () => {

  useEffect(() => {

  }, [page, gameSettings]);

  const randomName = () => {
    const int = randomInt(5);
    return mockNames[int];
  }

  const defaultPlayers = [YOU];
  const defaultSettings = {
    amountOfPlayers: 5,
    players: defaultPlayers,
  }

  const generatePlayers = () => {
    let players = [];

    for (let i = 0; i < 4; i++) {

      players.push({
        name: randomName(), 
        id: i+2, 
        hand: [0, 0, 0, 0, 0], 
        color: Styles.colors.blue,
      })

    }

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
