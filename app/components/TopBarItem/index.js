/**
 * A link to a certain page, an anchor tag
 */
import React from 'react'
import styled from 'styled-components';

const TopBarItem = (props) => {
    // console.log(props)
    let Wrapper
    if (props.position && props.position == 'center') {
        Wrapper = styled.div`
        top: -2.7rem;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        color: white;
        font-size: 1.2rem;
        z-index: 10;
      `;
    } else {
        Wrapper = styled.div`
        position: absolute;
        top: ${props.top}rem;
        font-size: 1.2rem;
        left: ${props.left}rem;
        text-align: center;
        color: white;
        z-index: 10;
      `;
    }
    
    return <Wrapper>
        {props.children}
    </Wrapper>
}

export default TopBarItem;
