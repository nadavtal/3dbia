import React, { Component, memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectLoadingMessage } from '../../containers/App/selectors';
import LoadingIndicator from 'components/LoadingIndicator'
import { MDBIcon } from 'mdbreact';
import { CSSTransition } from 'react-transition-group';


const SpinnerMessage = ({
    loading,
    message
}) => {


  return <>
   {loading && <div className="overlapblackbgFullScreen"></div>}
      <CSSTransition
        in={loading}
        timeout={300}
        classNames="alert"
        unmountOnExit
        // onEnter={() => console.log('ENTER')}
        // onExited={() => console.log('EXIT')}
      >
        <div className="absCenter">
           <LoadingIndicator msg={message}/>

        </div>
   
      </CSSTransition>
    
  </>
}
const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    message: makeSelectLoadingMessage(),
  });
  
  const mapDispatchToProps = dispatch => {
    return {
     
    }
  }
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(
    withConnect,
    memo,
  )(SpinnerMessage);
