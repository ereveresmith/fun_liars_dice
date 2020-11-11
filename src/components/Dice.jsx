import React from 'react';
import Styled from 'styled-components';
import { Styles } from '../util/Styles'

const Arrow = Styled.div`
    content: '';
    position: absolute;
    left: 50%;
    z-index: 6;
    opacity: 0.9;
    top: -12px;
    display: block;
    border-right: 1px solid ${Styles.colors.darkGrey};
    border-bottom: 1px solid ${Styles.colors.darkGrey};
    box-shadow: 2px 2px 2px ${Styles.colors.darkGrey};
    width: 16px;
    height: 16px;
    z-index: 3;
    transform: translate(-50%, -50%) rotate(45deg);
`

const Wrapper = Styled.div`
    position: relative;
    align-self: center;
    display: flex;
    border: 1px solid ${Styles.colors.black};
    border-radius: 3px;
    transition: all ease 250ms;


    ${props => props.visible && `
        background-color: ${Styles.colors.white};
    `}

    ${props => props.isClickable && props.visible && `
        cursor: pointer;

        &:hover {
            background-color: ${Styles.colors.lightGrey};
        }
    `}


    ${props => props.size && `
        width: ${props.size};
        height: ${props.size};
    `}

    ${props => props.visible === false && `
        background: linear-gradient(to bottom right, ${Styles.colors.grey}, ${Styles.colors.white});

        &:hover {
            background-color: ${Styles.colors.darkGrey}
        }
    `}

    ${props => props.disabled === true && `
        border: 2px dashed ${Styles.colors.red};
        opacity: 0.3;
    `}

    ${props => props.highlight === true && `
        background: linear-gradient(137deg, ${props.highlightColor} 35%, ${Styles.colors.white} 99%);
        opacity: 1;
    `}
`

const DotGrid = Styled.div`
    display: grid;
    grid-template-rows: auto auto auto;
    grid-template-columns: auto auto auto;
    margin: 1px;
    grid-gap: 1px;
    width: 100%;
`

const Dot = Styled.div`
    background-color: ${Styles.colors.darkGrey};
    border-radius: 50%;
    width: 97%;
    height: 97%;
    align-self: center;
    justify-self: center;
    grid-column: ${props => props.column} / ${props => props.column + 1};
    grid-row: ${props => props.row} / ${props => props.row + 1};
`

const renderedDots = (value) => {
    switch (value) {
        case 0:
            return <DotGrid>
            </DotGrid>
        case 1:
            return <DotGrid>
                <Dot row={2} column={2}></Dot>
            </DotGrid>
        case 2:
            return <DotGrid>
                <Dot row={1} column={1}></Dot>
                <Dot row={3} column={3}></Dot>
            </DotGrid>
        case 3:
            return <DotGrid>
                <Dot row={1} column={3}></Dot>
                <Dot row={2} column={2}></Dot>
                <Dot row={3} column={1}></Dot>
            </DotGrid>
        case 4:
            return <DotGrid>
                <Dot row={1} column={1}></Dot>
                <Dot row={3} column={3}></Dot>
                <Dot row={3} column={1}></Dot>
                <Dot row={1} column={3}></Dot>
            </DotGrid>
        case 5:
            return <DotGrid>
                <Dot row={1} column={1}></Dot>
                <Dot row={3} column={3}></Dot>
                <Dot row={3} column={1}></Dot>
                <Dot row={1} column={3}></Dot>
                <Dot row={1} column={1}></Dot>
                <Dot row={2} column={2}></Dot>
            </DotGrid>
        case 6:
            return <DotGrid>
                <Dot row={1} column={1}></Dot>
                <Dot row={2} column={1}></Dot>
                <Dot row={3} column={1}></Dot>
                <Dot row={1} column={3}></Dot>
                <Dot row={2} column={3}></Dot>
                <Dot row={3} column={3}></Dot>
            </DotGrid>

        //T
        case 7:
            return <DotGrid>
                <Dot row={1} column={1}></Dot>
                <Dot row={1} column={2}></Dot>
                <Dot row={1} column={3}></Dot>
                <Dot row={2} column={2}></Dot>
                <Dot row={3} column={2}></Dot>
            </DotGrid>

        //I
        case 8:
            return <DotGrid>
                <Dot row={1} column={2}></Dot>
                <Dot row={2} column={2}></Dot>
                <Dot row={3} column={2}></Dot>
            </DotGrid>

        //N
        case 9:
            return <DotGrid>
                <Dot row={1} column={1}></Dot>
                <Dot row={2} column={1}></Dot>
                <Dot row={3} column={1}></Dot>
                <Dot row={2} column={2}></Dot>
                <Dot row={3} column={2}></Dot>
                <Dot row={2} column={3}></Dot>
                <Dot row={3} column={3}></Dot>
            </DotGrid>

        //Y
        case 10:
            return <DotGrid>
                <Dot row={1} column={1}></Dot>
                <Dot row={1} column={3}></Dot>
                <Dot row={2} column={2}></Dot>
                <Dot row={3} column={2}></Dot>
            </DotGrid>
        default:
            return <DotGrid>
            </DotGrid>
    }
}

const Dice = ({ visible, fv, size, disabled, highlight, hasArrow, highlightColor, onClick }) => {
    const handleClick = () => {
        if (onClick && !disabled && visible) {
            onClick(fv);
        }
    }

    const isClickable = (onClick !== undefined);

    return (
        <Wrapper onClick={handleClick} isClickable={isClickable} fv={fv} size={size} visible={visible} disabled={disabled} highlight={highlight} highlightColor={highlightColor}>
            {hasArrow && <Arrow></Arrow>}
            {visible && !disabled && renderedDots(fv)}
        </Wrapper>
    )
}

export default Dice;

