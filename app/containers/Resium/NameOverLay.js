import React, { useRef } from 'react';
import styled from 'styled-components';



const OverLay = (props) => {
  const nameOverlay = useRef(null)
  // console.log(props)
  const Wrapper = styled.div`
    position: absolute;
    bottom: ${props.position ? props.position.bottom + 'px' : '100%'};
    left: ${props.position ? props.position.left + 'px' : '100%'};
    pointer-events: none;
    padding: .4rem;
    background-color: black;
    color: white;
    font-size: .7rem;
  `;
  return (
    <Wrapper
    className={`${props.show? 'd-block' : 'd-none'}`}
      ref={nameOverlay}>
    <div className="mb-1 border-bottom border-light">{props.name}</div>
    {/* Lon: {props.position.lon} <br />
    Lat: {props.position.lat} <br />
    Height: {props.position.height} <br /> */}
    </Wrapper>
  )
}

export default OverLay
