import React from 'react'
import { MDBIcon } from 'mdbreact'
import styled from 'styled-components';
import Hoverable from '../Hoverable/Hoverable'

const IconName = ({
    onClick,
    name,
    iconName,
    active,
    className
}) => {
    const IconNameWrapper = styled.div`
        color: ${active ? 'white' : 'black'};
        transition: all .3s;     
        background-color: ${active ? 'hsla(30, 100%, 48%, 0.743)' : 'hsla(30, 100%, 48%, 0.243)'};
        // border-bottom: ${active ? '2px solid black' : ''};
        &:hover {
            color: ${active ? '' : '#6cc0e5'};
            background-color: ${active ? 'hsla(30, 100%, 48%, 0.743)' : 'hsla(30, 100%, 48%, 0.343)'};
        }
        `; 
    return <IconNameWrapper 
        onClick={() => onClick()} 
        className={`${className} mx-auto fullWidth ${active ? 'active' : 'faded'}`}
        active={active}
        hoverColor={'white'}
        hoverBgColor={'hsla(30, 100%, 48%, 0.743)'}>
            <div className={`mx-auto`} style={{'width': '1rem'}}>
            <MDBIcon icon={iconName} size={'sm'} className='mx-auto' />
            </div>
            <div className={`text-center`}>
            {name}
            </div>  
        </IconNameWrapper>
}

export default IconName