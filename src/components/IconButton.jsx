import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles'

const StyledButton = Styled.button`
  padding: 2px 8px;
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
    width: 22px;
    height: 22px;
    z-index: 3;
    transform: rotate(45deg) translate(-30%, -30%);
    border-color: inherit;
    transition: border 50ms ease-in;

    ${props => props.direction === 'up' && `
      transform: rotate(-135deg) translate(-30%, -30%);
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

