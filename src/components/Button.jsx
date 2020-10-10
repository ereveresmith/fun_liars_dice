import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles'

const StyledButton = Styled.button`
  padding: 8px 16px;
  border-radius: 24px;
  margin: 8px;
  border-radius: 24px;
  color: white;
  text-transform: uppercase;
  font-weight: 800;
  background-color: ${Styles.colors.purple};
  font-size: 14px;
  border: 0;
  cursor: pointer;
  outline: 0;
  transition: background-color 80ms ease-out;

  ${props => props.isGrey && `
    background: 0;
    color: ${Styles.colors.darkGrey};
  `}

  &:hover {
    background-color: ${Styles.colors.darkPurple};
    color: ${Styles.colors.white};
  }

  &:active {
    background-color: ${Styles.colors.darkerPurple};
  }

  &:focus {
    outline: 1px ${Styles.colors.darkPurple} solid;
  }

`;

const Button = (props) => {
  return (
    <StyledButton className="Button" onClick={props.onClick} isGrey={props.isGrey}>
      {props.label}
    </StyledButton>
  );
}

export default Button;

