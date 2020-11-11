import React, { FunctionComponent, useState } from 'react';
import { Styles } from '../util/Styles';
import Styled from 'styled-components';

const Wrapper = Styled.button`
outline: 0;
margin: 0;
padding: 0;
position: relative;
justify-self: center;
align-self: center;
display: inline-block;
box-sizing: border-box;
width: 44px;
height: 22px;
vertical-align: middle;
border: ${Styles.colors.grey} solid 1px;
border-radius: 100px;
cursor: pointer;

&:hover {
    background-color: ${Styles.colors.grey};
}

&:focus {
  ${props => props.color && `
    outline: ${props.color} solid 1px;
  `}
}

&:after {
  position: absolute;
  top: 1px;
  width: 18px;
  height: 18px;
  background-color: ${Styles.colors.white};
  border-radius: 18px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
  content: ' ';
}
background-color: ${Styles.colors.grey};

&:hover {
    transition: background-color 50ms ease-out;

    ${props => props.color && `
      background-color: ${props.color};
    `}


}

${({isChecked}) => isChecked ? `
  transition: background-color 0.28s ease-in;
  &:after {
    left: 100%;
    margin-left: -1px;
    transform: translateX(-100%);
  }
` : `
  transition: background-color 0.3s ease-out;
  &:after {
    top: 1px;
    left: 1px;
  }
`}
`;

const Switch = ({isDefaultChecked, onChange, color}) => {
  const [isChecked, setIsChecked] = useState(isDefaultChecked);

  const handleClick = () => {
    onChange(!isChecked);
    setIsChecked(!isChecked);
  };
  
  return (
    <Wrapper 
      color={color}
      isChecked={isChecked}
      onClick={handleClick}>
    </Wrapper>
  );
};

export default Switch;

