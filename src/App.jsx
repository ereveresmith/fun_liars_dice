import React, {useState} from 'react';
import Styled from 'styled-components';
import Game from './GAME';

const Portfolio = () => {
  const [page, setPage] = useState('game');

  const gotoPage = (page) => () => {
    setPage(page);
  }

  const renderPage = () => {
    switch(page) {
      case 'game': 
        return <Game></Game>;
      default: 
        return <Game></Game>;
    }
  }

  return (
    <div className="Portfolio">
      {renderPage()}
    </div>
  );
}

export default Portfolio;
