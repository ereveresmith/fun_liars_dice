import React, {useState} from 'react';
import Styled from 'styled-components';
import GamePage from './pages/GamePage';

const Portfolio = () => {
  const [page, setPage] = useState('game');

  const gotoPage = (page) => () => {
    setPage(page);
  }

  const NavBar = Styled.nav`
    width: 100%;
    display: grid;
    grid-template-columns: auto auto auto;
    justify-content: end;
    border: 2px solid #f5f5f5;
    box-shadow: 1px 1px 1px #d9d9d9;
    padding: 0 24px;
    justify-content: center;
    grid-gap: 48px;
  `

  const Link = Styled.a`
    font-size: 16px;
    text-transform: uppercase;s
    font-weight: 500;
    padding: 4px;
    margin: 16px;
    cursor: pointer;

    &:hover {
      color: #8080ff;
    }
  
    &:active {
      color: #6666ff;
    }
  
    &:focus {
      outline: 1px #6666ff solid;
    }
  `

  const renderPage = () => {
    switch(page) {
      case 'game': 
        return <GamePage></GamePage>;
      default: 
        return <GamePage></GamePage>;
    }
  }

  return (
    <div className="Portfolio">
      {renderPage()}
    </div>
  );
}

export default Portfolio;
