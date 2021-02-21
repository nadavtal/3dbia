import React, { useEffect, memo, useState } from 'react'
import { connect } from 'react-redux'
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectStatus } from './selectors';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions'
import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBMask,
    MDBInput,
    MDBIcon,
    MDBView,
  } from 'mdbreact';
import './Confirmation.css';
const key = 'confirmation';

export const Confirmation = ({
    sendConfirmation,
    match,
    status
}) => {
    useInjectReducer({ key, reducer });
    useInjectSaga({ key, saga });

    useEffect(() => {
        console.log(match)
        sendConfirmation(match.params.type , match.params.token)
        return () => {
            
        }
    }, [])

    return <div id="register">
       
    <MDBView>
        <MDBMask className="d-flex justify-content-center" overlay="gradient">
          <MDBContainer className="h-100 d-flex justify-content-center mt-5">
              
            <MDBCard>
                <MDBCardBody>
                    {status}
                </MDBCardBody>
            </MDBCard>
          </MDBContainer>

        </MDBMask>
      </MDBView>


    </div>
}

const mapStateToProps = createStructuredSelector({
    status: makeSelectStatus()
  });
const mapDispatchToProps = (dispatch) => {
    return {
        sendConfirmation: (confirmationType, token) => dispatch(actions.sendConfirmation(confirmationType, token))

    }
}

const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(
    withConnect,
    memo,
  )(Confirmation);


