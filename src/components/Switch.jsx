import React, { FunctionComponent, useState } from 'react';
import { Styles } from '../util/Styles';
import Styled from 'styled-components';

const Wrapper = Styled.button`
outline: 0;
margin: 0;
padding: 0;
position: relative;
display: inline-block;
box-sizing: border-box;
min-width: 44px;
height: 22px;
vertical-align: middle;
border: ${Styles.colors.lightGrey} solid 1px;
border-radius: 100px;
cursor: pointer;
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

${({isChecked}) => isChecked ? `
  background-color: ${Styles.colors.grey};
  transition: background-color 0.28s ease-in;
  &:after {
    left: 100%;
    margin-left: -1px;
    transform: translateX(-100%);
  }
` : `
  background-color: ${Styles.colors.grey};
  transition: background-color 0.3s ease-out;
  &:after {
    top: 1px;
    left: 1px;
  }
`}
`;

const Switch = ({isDefaultChecked, onChange}) => {
  const [isChecked, setIsChecked] = useState(isDefaultChecked);

  const handleClick = () => {
    onChange(!isChecked);
    setIsChecked(!isChecked);
  };
  
  return (
    <Wrapper 
      isChecked={isChecked}
      onClick={handleClick}>
    </Wrapper>
  );
};

export default Switch;

