import React, { useState } from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faVolumeMute } from '@fortawesome/free-solid-svg-icons'
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import { faPause } from '@fortawesome/free-solid-svg-icons'
import { faPlay } from '@fortawesome/free-solid-svg-icons'

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
  width: 34px;

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

const IconButton = ({ onClick, isDefaultActive, icon }) => {
  const [isActive, setIsActive] = useState(isDefaultActive);

  const handleClick = () => {
    if (isActive) {
      setIsActive(false)
    } else {
      setIsActive(true)
    }
    onClick();
  }

  let activeIcon;

  switch(icon) {
    case "volume":
      activeIcon = faVolumeMute;
      if (isActive) {
        activeIcon = faVolumeUp;
      }
      break;
    case "play":
      activeIcon = faPlay;
      if (isActive) {
        activeIcon = faPause;
      }
      break;
  }


  return (
    <StyledButton className="Button" onClick={handleClick}>
      <FontAwesomeIcon icon={activeIcon} />   
    </StyledButton>
  );
}

export default IconButton;

