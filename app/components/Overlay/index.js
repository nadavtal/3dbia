import React, { Component, memo, useState } from 'react';

import styled from 'styled-components';

// import { Container, Button, Overlay } from 'react-bootstrap';
import { MDBIcon, MDBBtn } from 'mdbreact';

import { CSSTransition } from 'react-transition-group';

import './Overlay.css';

const Overlay = ({
    overlayOpen,
    children,
    animationType,
    toggleOverlay
}) => {

  const CloseIcon = styled.div`
    position: absolute;
    top: .2rem;
    left: 0;
    z-index: 11;
  `;
  const OverlayWrapper = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: white;
    z-index: 11;
  `;
  return (
    <CSSTransition
      in={overlayOpen}
      timeout={300}
      classNames={animationType}
      unmountOnExit
      // onEnter={() => console.log('ENTER')}
      // onExited={() => console.log('EXIT')}
    >
       <OverlayWrapper>
         <CloseIcon>
          <MDBIcon icon="chevron-left"
            size="lg"
            onClick={toggleOverlay}
            className="position-absolute m-2 cursor-pointer"/>

         </CloseIcon>
         {children}

       </OverlayWrapper>
    </CSSTransition>

  )



}

export default Overlay
// const mapStateToProps = createStructuredSelector({
//     overlayOpen: makeSelectOverlayOpen(),
//     overlayData: makeSelectOverlayData(),
//   });
  
//   const mapDispatchToProps = dispatch => {
//     return {
//       onToggleOverlay: () => dispatch({type: TOGGLE_OVERLAY}),
//     }
//   }
//   const withConnect = connect(
//     mapStateToProps,
//     mapDispatchToProps,
//   );
  
//   export default compose(
//     withConnect,
//     memo,
//   )(Overlay);
