import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles'

const StyledButton = Styled.button`
  padding: 12px;
  border-radius: 50%;
  margin 4px;
  color: ${Styles.colors.black};
  font-weight: 500;
  background-color: ${Styles.colors.white};
  justify-self: center;
  font-size: ${Styles.fontSizes.medium};

  ${props => props.color && `
    border: 2px solid ${props.color};
  `}

  cursor: pointer;
  outline: 0;
  transition: all 60ms ease-out;
  filter: brightness(105%);

  ${props => props.color && `
    background-color: ${props.color};

    &:hover {
      background-color: ${props.color};
      filter: brightness(115%);
    }

    &:focus {
      outline: 1px ${props.color} solid;
    }
  `}

  ${props => props.selected && `
    border-color: ${Styles.colors.black};
  `}
`;



const ColorButton = ({ onClick, color, selected}) => {
  const handleClickColor = () => {
    onClick(color);
  }

  return (
    <StyledButton 
      className="ColorButton" 
      onClick={handleClickColor} 
      color={color} 
      selected={selected}>
    </StyledButton>
  );
}

export default ColorButton;

