import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles'

const StyledButton = Styled.button`
  padding: 12px 12px;
  border-radius: 24px;
  margin: 8px;
  min-width: 100px;
  border-radius: 4px;
  min-height: 40px;
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
    border: 1px solid ${Styles.colors.darkGrey};
  `}

  &:hover {
    background-color: ${Styles.colors.purple};
    color: ${Styles.colors.white};
  }

  &:active {
    background-color: ${Styles.colors.purple};
  }

  &:focus {
    outline: 1px ${Styles.colors.purple} solid;
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

