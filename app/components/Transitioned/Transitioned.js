import React, { Children } from 'react'
import Transition from 'react-transition-group/Transition';
import CSSTransition from 'react-transition-group/CSSTransition';
import styled from 'styled-components';
import { keyframes } from 'styled-components'
// import './animations.css'
const breatheAnimation = keyframes`
    0% { height: 100px; width: 100px; }
    30% { height: 400px; width: 400px; opacity: 1 }
    40% { height: 405px; width: 405px; opacity: 0.3; }
    100% { height: 100px; width: 100px; opacity: 0.6; }
    `
const Wrapper = styled.div`
    transition: 1s all;
    background-color: red;
    margin: 0 auto;
    // animation-name: ${breatheAnimation};
    // animation-duration: 8s;
    // animation-iteration-count: infinite;
    `;

    
const Transitioned = ({
    inProp,
    children,
    style,
    inClass,
    outClass,
    animationTimings
}) => {
    const duration = 1000;
    
  
    const defaultStyle = {
        transition: `all ${duration}ms ease-in-out`,
        opacity: 0,
        width: 100,
        height: 100,
        margin: 'auto',
      }
      
      const transitionStyles = {
        entering: { 
            opacity: 1, 
            backgroundColor: 'red',
            },
        entered:  { opacity: 1, backgroundColor: 'green' },
        exiting:  { opacity: 0, backgroundColor: 'green' },
        exited:  { opacity: 0, backgroundColor: 'red' },
      };
      
    
    return (
        <>
        {/* <Transition in={inProp} timeout={animationTimings}>
          {state => (
            <div style={{
              ...defaultStyle,
              ...transitionStyles[state]
            }}>
              {state}
            </div>
          )}
        </Transition> */}
        <CSSTransition
            in={inProp}
            timeout={animationTimings}
            mountOnEnter
            unmountOnExit
            // classNames="boxAnimation_1_top"
            classNames={{
                enter: '',
                enterActive: 'boxAnimation_1_top-enter-active',
                exit: '',
                exitActive: 'boxAnimation_1_top-exit-active',
                appear: '',
                appearActive: ''
            }}
            >
            <div
                className='transitioned' 
               
                style={{
                    // transition: '1s all',
                    backgroundColor: 'green',
                    // width: '100%',
                    // height: '100%',
                    margin: 'auto',
                // opacity: state === 'exiting' || state === 'entering' ? 0 : 1
        
                }}
                >
                {children}
                </div>
            
        </CSSTransition>
       
        {/* <Transition
            in={inProp}
            timeout={animationTimings}
            mountOnEnter
            unmountOnExit
            >
            {
            state => (<Wrapper
                className={inProp ? inClass : outClass} 
                animation={inProp ? inClass : outClass} 
                // style={{
                //     transition: '1s all',
                //     backgroundColor: 'red',
                //     // width: '100%',
                //     // height: '100%',
                //     margin: 'auto',
                // // opacity: state === 'exiting' || state === 'entering' ? 0 : 1
        
                // }}
                >
                {state === 'entered' && children}
                </Wrapper>)
            }
        </Transition> */}
        </>
    )
}

export default Transitioned