import React, { useState, memo, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBStepper,
  MDBStep,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdbreact';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import HoverableWrapper from 'components/Hoverable/Hoverable';
import CustomSelect from 'components/CustomSelect';
import Overlay from 'components/Overlay';
import PageHeader from 'components/PageHeader/PageHeader';
import {
  makeSelectLoading,
  makeSelectError,
  makeSelectCurrentUser,
  makeSelectCurrentUserRole
} from 'containers/App/selectors';


const Stepper = ({
  steps,
  vertical,
  children,
  activeStep,
  activateButtonClick,
  onStepClick
}) => {
  
  const [active, setActive] = useState();

  useEffect(() => {
    console.log(activeStep)
    setActive(activeStep);
      return () => {
          
      }
  }, [activeStep])

  const swapFormActive = index => {
    onStepClick(index)
    setActive(index);
  };


  return <div className="stepper position-relative">
      <MDBStepper 
        icon 
        vertical={vertical}>
        {steps.map((step, index) => <>
          <MDBStep
            key={index}
            className={`${active == index ? 'active' : ''}`}
            iconClass={'fadedasdsadsd'}
            icon={step.icon}
            stepName={step.name}
            onClick={() => activateButtonClick && swapFormActive(index)}
            vertical={vertical}
          />
          {/* <span className="mt-3">{step.name}</span> */}
        </>)}
      </MDBStepper>
      <div className="d-flex justify-content-between">
        {steps.map(step => <div key={step.name} className="fontSmall">{step.name}</div>)}
      </div>
      <div className="m-3 p-3">
        {children[active]}   

      </div>
  </div>

 
 ;
};

const mapStateToProps = createStructuredSelector({
  
  // roles: makeSelectRoles(),
});

export function mapDispatchToProps(dispatch) {
  return {
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Stepper);
