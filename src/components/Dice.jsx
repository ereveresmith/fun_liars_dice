import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles'

const Arrow = Styled.div`
    content: '';
    position: absolute;
    left: 50%;
    top: -20px;
    display: block;
    border-right: 5px solid ${Styles.colors.black};
    border-bottom: 5px solid ${Styles.colors.black};
    box-shadow: 6px 2px 1px ${Styles.colors.darkGrey};
    width: 20px;
    height: 20px;
    z-index: 3;
    transform: translate(-50%, -50%) rotate(45deg);
`

const Wrapper = Styled.div`
    position: relative;
    align-self: center;
    display: flex;
    border: 2px solid ${Styles.colors.darkGrey};
    border-radius: 4px;
    background-color: ${Styles.colors.white};
    transition: all ease 250ms;

    ${props => props.size && `
        width: ${props.size};
        height: ${props.size};
    `}

    ${props => props.visible === false && `
        background-color: ${Styles.colors.grey};
    `}

    ${props => props.disabled === true && `
        border: 2px dashed ${Styles.colors.red};
        opacity: 0.3;
    `}

    ${props => props.highlight === true && `
        background-color: ${props.highlightColor};
        opacity: 1;
    `}
`

const Grid = Styled.div`
    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: auto auto auto;
    grid-gap: 4px;  
    padding: 4px;
    width: 100%;
`

const Dot = Styled.div`
    background-color: #939796;
    border-radius: 50%;
    width: 100%;
    grid-column: ${props => props.column} / ${props => props.column + 1};
    grid-row: ${props => props.row} / ${props => props.row + 1};
`

const renderedDots = (value) => {
  switch(value) {
      case 0:
          return <Grid>
          </Grid>
      case 1:
          return <Grid>
                  <Dot row={2} column={2}></Dot>
              </Grid>
      case 2:
          return <Grid>
                  <Dot row={1} column={1}></Dot>
                  <Dot row={3} column={3}></Dot>
              </Grid>
      case 3:
          return <Grid>
                  <Dot row={1} column={3}></Dot>
                  <Dot row={2} column={2}></Dot>
                  <Dot row={3} column={1}></Dot>
              </Grid>
      case 4:
          return <Grid>
                  <Dot row={1} column={1}></Dot>
                  <Dot row={3} column={3}></Dot>
                  <Dot row={3} column={1}></Dot>
                  <Dot row={1} column={3}></Dot>
              </Grid>
      case 5:
          return <Grid>
              <Dot row={1} column={1}></Dot>
                  <Dot row={3} column={3}></Dot>
                  <Dot row={3} column={1}></Dot>
                  <Dot row={1} column={3}></Dot>
                  <Dot row={1} column={1}></Dot>
                  <Dot row={2} column={2}></Dot>
              </Grid>
      case 6:
          return <Grid>
                  <Dot row={1} column={1}></Dot>
                  <Dot row={2} column={1}></Dot>
                  <Dot row={3} column={1}></Dot>
                  <Dot row={1} column={3}></Dot>
                  <Dot row={2} column={3}></Dot>
                  <Dot row={3} column={3}></Dot>
              </Grid>
      default:
          return <Grid>
              </Grid>
  }
}

const Dice = ({ visible, fv, size, disabled, highlight, hasArrow, highlightColor }) => {
  return ( 
      <Wrapper fv={fv} size={size} visible={visible} disabled={disabled} highlight={highlight} highlightColor={highlightColor}>
          {hasArrow && <Arrow></Arrow>}
          {visible && !disabled && renderedDots(fv)}
      </Wrapper>   
  )
}

export default Dice;

