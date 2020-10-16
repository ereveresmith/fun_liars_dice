import React, {useState} from 'react';
import Styled from 'styled-components';
import Game from './GAME';
import Settings from './SETTINGS';


const defaultSettings = {
  amountOfPlayers: 5,
  name: 'YOU',
}

const Portfolio = () => {
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
    <div className="Portfolio">
      {renderPage()}
    </div>
  );
}

export default Portfolio;
