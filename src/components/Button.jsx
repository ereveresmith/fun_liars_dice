import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles'

const StyledButton = Styled.button`
  padding: 4px 12px;
  margin: 4px;
  border-radius: 24px;
  color: ${Styles.colors.black};
  font-weight: 500;
  background-color: ${Styles.colors.white};
  font-size: ${Styles.fontSizes.medium};
  min-width: 52px;
  border: 1px solid ${Styles.colors.black};
  cursor: pointer;
  outline: 0;
  transition: background-color 80ms ease-out;

  &:hover {
    background-color: ${Styles.colors.darkPurple};
    color: ${Styles.colors.white};
  }

  &:focus {
    outline: 1px ${Styles.colors.purple} solid;
  }

  ${props => props.isSecondary && `
    background: 0;
    color: ${Styles.colors.black};

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

