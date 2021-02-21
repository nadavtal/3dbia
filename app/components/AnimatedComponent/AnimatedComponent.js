import React, { useState } from 'react'
import styled from 'styled-components';


const AnimatedComponent = (props) => {

    const Wrapper = styled.div`
        transition: .3s all;
        position: absolute;
        background-color: lightseagreen;
    `;

    return <Wrapper className={props.className}>
        {props.children}
    </Wrapper>
}

export default AnimatedComponent

