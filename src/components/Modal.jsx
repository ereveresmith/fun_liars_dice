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
    display: block;
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
  min-width: 480px;
  z-index: 1000;
  border-radius: 16px;
  box-sizing: border-box;
  padding: 16px;
`;

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr 30px;
  align-items: center;
`;

const Title = styled.h1`
  color: rgba(0, 0, 0, 0.87);
  font-weight: 500;
  line-height: 40px;
  font-size: ${Styles.fontSizes.m5};
  margin: 0;
`;

export const Modal= ({
  title,
  active = false,
  children,
  minHeight,
  closeOnBlur,
  minWidth,
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
          <Header>
            <Title>{title}</Title>
          </Header>
        {children}
        </Wrapper>
      </Container>
      <Background active={isActive} onClick={handleBlur} data-testid="modal-background" />
    </Fragment>
  );
};
