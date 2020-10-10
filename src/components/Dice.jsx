import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles'

const Wrapper = Styled.div`
    align-self: center;
    display: flex;
    border: 2px solid #979797;
    border-radius: 4px;
    max-width: 38px;
    height: 38px;
    width: 100%;
    background-color: rgb(255, 255, 255, 0.85);

    &:hover {
      background-color: ${Styles.colors.darkGrey};
    }
`

const Grid = Styled.div`
    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: auto auto auto;
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

const Dice = (props) => {
  return ( 
      <Wrapper fv={props.fv}>
          {renderedDots(props.fv)}
      </Wrapper>   
  )
}

export default Dice;

