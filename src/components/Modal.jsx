import React, { useEffect, useState, Fragment } from 'react';
import Styled, { css } from 'styled-components';
import { Styles } from '../util/Styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const IconWrapper = Styled.div`
  font-size: 40px;
  padding: 4px;
  opacity: 0.6;
  margin-top: 8px;
  display: grid;
  justify-content: center;
  justify-items: center;
`

const DoubleGrid = Styled.div`
  grid-template-columns: auto auto;
  display: grid;
  justify-content: space-between;
  justify-items: space-between;
`

const GridSection = Styled.div`
  grid-template-rows: auto auto;
`

const ModalText = Styled.div`
  padding: 8px 0;
  max-width: 300px;
`

const Background = Styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${Styles.colors.black}; 
  z-index: 4;
  display: none;
  opacity: 0;
  transition: 1s all ease-in;
  ${({active}) => active && css`
    opacity: 0.8;
    display: grid;
    justify-items: center;
    justify-content: center;
  `}
`;

const Container = Styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  min-width: 200px;
  height: 100%;
  align-items: center;
  height: 100%;
  justify-content: center;
  opacity: 0.8;
  display: none;

  ${({ active }) => active && css`
    display: grid;
    opacity: 1;
  `}
`;

const TopGrid = Styled.div`
  display: grid;
  grid-template-columns: 70% auto;
`

const Wrapper = Styled.div`
  display: grid;
  grid-template-rows: 80% auto;
  background-color: ${Styles.colors.white};
  min-height: 160px;
  z-index: 50;
  border-radius: 16px;
  box-sizing: border-box;
  justify-content: center;
  align-content: center;
  padding: 12px 48px;
`;

export const Modal= ({
  active = false,
  title,
  text,
  children,
  icon,
  onClose,
}) => {
  const [isActive, setIsActive] = useState(active);

  useEffect(() => {
    setIsActive(active);
  },[active]);

  const handleClose = () => {
    setIsActive(false);
    onClose();
  };

  const handleBlur = () => {
    handleClose();
  };

  const renderedIcon = () => {
    let elem = <div></div>
    if (icon) {
      elem = <IconWrapper>
        <FontAwesomeIcon icon={icon}/>
      </IconWrapper>   
    }

    return elem;
  }

  return (
    <Fragment>
      <Container active={isActive}>
        <Wrapper>
          <TopGrid>
            <GridSection>
              <h2>{title}</h2>
              <ModalText>{text}</ModalText>
            </GridSection>
            {renderedIcon()}
          </TopGrid>
          <DoubleGrid>
            {children}
          </DoubleGrid>
        </Wrapper>
      </Container>
      <Background active={isActive} onClick={handleBlur} data-testid="modal-background" />
    </Fragment>
  );
};
