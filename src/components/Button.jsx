import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles'

const StyledButton = Styled.button`
  padding: 8px 12px;
  min-width: 42px;
  border-radius: 24px;
  margin: 2px;
  color: white;
  text-transform: uppercase;
  font-weight: 700;
  background-color: ${Styles.colors.purple};
  font-size: ${Styles.fontSizes.small};
  border: 1px solid ${Styles.colors.grey};
  cursor: pointer;
  outline: 0;
  transition: background-color 80ms ease-out;

  &:hover {
    background-color: ${Styles.colors.darkPurple};
    color: ${Styles.colors.white};
  }

  &:active {
    background-color: ${Styles.colors.darkPurple};
  }

  &:focus {
    outline: 1px ${Styles.colors.purple} solid;
  }

  ${props => props.isSecondary && `
    background: 0;
    color: ${Styles.colors.grey};

    &:hover {
      background-color: ${Styles.colors.darkPurple};
      color: ${Styles.colors.white};
    }
  `}

`;

const Button = (props) => {
  return (
    <StyledButton className="Button" onClick={props.onClick} isSecondary={props.isSecondary}>
      {props.label}
    </StyledButton>
  );
}

export default Button;

