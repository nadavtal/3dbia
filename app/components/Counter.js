import React from 'react'
import styled from 'styled-components'

const Counter = ({count, bgColor, numColor}) => {

    const CounterWrapper = styled.div`
        position: relative;
        z-index: 2;
        // padding: 7px 7px;
        width: 1rem;
        height: 1rem;
        font-size: 11px;
        color: ${numColor ? numColor : '#fff'};
        background-color: ${bgColor ? bgColor : '#fe1212'};
        border-radius: 50%;
        box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12);
    `

    return <CounterWrapper className=""><span className="absCenter">{count}</span></CounterWrapper>
}

export default Counter