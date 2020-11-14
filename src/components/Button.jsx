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
  min-width: 120px;
  font-size: ${Styles.fontSizes.medium};
  min-width: 52px;
  border: 1px solid ${Styles.colors.black};
  cursor: pointer;
  outline: 0;
  transition: all 60ms ease-out;
  filter: brightness(105%);


  &:hover {
    ${props => props.color && `
      background-color: ${props.color};
    `}
    filter: brightness(115%);
    color: ${Styles.colors.white};
  }

  ${props => props.color && props.primary && `
    background-color: ${props.color};
    color: ${Styles.colors.white};

    &:hover {
      background-color: ${props.color};
      color: ${Styles.colors.white};
      filter: brightness(115%);
    }

    &:focus {
      outline: 1px ${props.color} solid;
    }
  `}

  ${props => props.disabled && `
    filter: brightness(90%);
    transition: background-color 0ms ease-out;
    background-color: ${Styles.colors.grey};
    opacity: 0.4;
    color: ${Styles.colors.black};

    &:hover {
      filter: brightness(90%);
      background-color: ${Styles.colors.grey};
      color: ${Styles.colors.black};
    }

    cursor: default;
  `}

`;

const Button = ({ onClick, disabled, label, color, primary }) => {
  return (
    <StyledButton className="Button" onClick={onClick} primary={primary} disabled={disabled} color={color}>
      {label}
    </StyledButton>
  );
}

export default Button;

