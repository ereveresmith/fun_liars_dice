import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles'

const StyledButton = Styled.button`
  padding: 6px 16px;
  border-radius: 8px;
  margin 0 8px;
  color: ${Styles.colors.black};
  font-weight: 500;
  background-color: ${Styles.colors.white};
  justify-self: center;
  max-width: 150px;
  font-size: ${Styles.fontSizes.medium};
  min-width: 52px;
  border: 1px solid ${Styles.colors.black};
  cursor: pointer;
  outline: 0;
  transition: background-color 60ms ease-out;

  &:hover {
    transition: background-color 60ms ease-out;
    background-color: ${Styles.colors.darkPurple};
    color: ${Styles.colors.white};
  }

  &:focus {
    outline: 1px ${Styles.colors.purple} solid;
  }

  ${props => props.primary && `
    background-color: ${Styles.colors.purple};
    color: ${Styles.colors.white};

    &:hover {
      background-color: ${Styles.colors.darkPurple};
    }
  `}

  ${props => props.isRed && `
    background: none;
    color: ${Styles.colors.black};

    &:hover {
      background-color: ${Styles.colors.red};
    }
  `}

  ${props => props.disabled && `
    transition: background-color 0ms ease-out;
    background-color: ${Styles.colors.grey};
    opacity: 0.4;
    color: ${Styles.colors.black};

    &:hover {
      background-color: ${Styles.colors.grey};
      color: ${Styles.colors.black};
    }

    cursor: default;
  `}

`;

const Button = ({ onClick, primary, disabled, label, isRed }) => {
  return (
    <StyledButton className="Button" onClick={onClick} primary={primary} disabled={disabled} isRed={isRed}>
      {label}
    </StyledButton>
  );
}

export default Button;

