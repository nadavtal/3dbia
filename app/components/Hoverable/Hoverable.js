

import React, { Children } from 'react';
import styled from 'styled-components'; 

const HoverableWrapper = ({
    children,
    useAfter,
    afterBgColor,
    bgColor,
    className,
    style,
    color,
    opacity,
    onClick,
    hoverEffect,
    hoverColor
}) => {

    switch (hoverEffect) {
        case 'backGroundEnterLeft':
            
            break;
    
        default:
            break;
    }
    const after = `&::after {
        content: '';
        position: absolute;
        transition: .3s all;
        width: 0;
        height: 100%;
        top: 0;
        left:0;
        bottom: 0;
        right : 0;
        border-bottom: ${color ? '1px solid green' : ''};
        // background-color: ${afterBgColor ? afterBgColor : 'transparent'};
       
    }`
    const Div = styled.div`
    color: ${color ? color : 'black'};
    transition: all .3s;
    position: relative;
    opacity: ${opacity ? opacity : 1};     
    background-color: transparent;
    
    
    &:hover {
        color: ${hoverColor ? hoverColor : 'inherit'};
        // background-color: ${bgColor && !useAfter ? bgColor : 'transparent'};
        opacity: 1;

        &::after {
            width: 100%;
        }
    }
    ${useAfter ? after : '' }
    
    `
    return <Div 
      className={className}
      style={style} 
      onClick={onClick}>{children}</Div>
      };

export default HoverableWrapper