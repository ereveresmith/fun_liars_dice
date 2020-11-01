import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles'

const StyledButton = Styled.button`
  padding: 4px 12px;
  margin: 4px;
  color: white;
  text-transform: uppercase;
  border: 0;
  font-weight: 700;
  cursor: pointer;
  outline: 0;
  transition: background-color 80ms ease-out;
  background: 0;

  &:hover {
    border-color: ${Styles.colors.purple};
  }

  &:active {
    border-color: ${Styles.colors.darkPurple};
  }

  &:focus {
    outline: 1px ${Styles.colors.purple} solid;
  }
`;

const Arrow = Styled.div`
    content: '';
    display: block;
    border-right: 8px solid ${Styles.colors.white};
    border-bottom: 8px solid ${Styles.colors.white};
    width: 26px;
    height: 26px;
    z-index: 3;
    transform: rotate(45deg);
    border-color: inherit;
    transition: border 50ms ease-in;

    ${props => props.direction === 'up' && `
      transform: rotate(-135deg);
    `}
`

const IconButton = ({ onClick, direction }) => {
  return (
    <StyledButton className="Button" onClick={onClick}>
      <Arrow direction={direction}></Arrow>
    </StyledButton>
  );
}

export default IconButton;

