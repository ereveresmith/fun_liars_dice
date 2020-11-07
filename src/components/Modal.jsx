import React, { useEffect, useState, Fragment } from 'react';
import styled, { css } from 'styled-components';
import { Styles } from '../util/Styles';

const Background = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background-color: ${Styles.colors.black}; 
  z-index: 4;
  display: none;
  opacity: 0;
  transition: 0.8s;
  ${({active}) => active && css`
    opacity: 0.5;
    display: grid;
    justify-items: center;
    justify-content: center;
  `}
`;

const Container = styled.div`
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  align-items: center;
  height: 100%;
  justify-content: center;
  opacity: 0.5;
  display: none;

  ${({ active }) => active && css`
    display: grid;
    opacity: 1;
  `}
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  background-color: ${Styles.colors.white};
  min-width: 440px;
  min-height: 180px;
  height: 25vh;
  z-index: 5;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 16px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px;
  align-items: center;
`;

export const Modal= ({
  active = false,
  children,
  closeOnBlur,
  closeCallback,
}) => {
  const [isActive, setIsActive] = useState(active);

  useEffect(() => {
    setIsActive(active);
  },[active]);

  const handleClose = () => {
    setIsActive(false);
    closeCallback && closeCallback();
  };

  const handleBlur = () => {
    closeOnBlur && handleClose();
  };

  return (
    <Fragment>
      <Container active={isActive}>
        <Wrapper>
            {children}
        </Wrapper>
      </Container>
      <Background active={isActive} onClick={handleBlur} data-testid="modal-background" />
    </Fragment>
  );
};
