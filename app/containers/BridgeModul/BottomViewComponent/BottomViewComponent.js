import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import reducer from './reducer';
import { makeSelectBottomViewComponent } from './selectors';

import * as selectors from './selectors'
import SpansModule from 'containers/BridgeModul/SpansModul/SpansModul'
import EditElementsModule from 'containers/BridgeModul/EditElementsModule/EditElementsModule';
import { showInView } from '../actions'
import { MDBIcon, MDBAnimation } from 'mdbreact';
const key = "bottomView";

const BottomViewComponent = ({
  componentName,
  onShowInView
}) => {
    
  useInjectReducer({ key, reducer });
  

  const Component = () => {
     switch (componentName) {
        case 'spans':
            return <SpansModule />
        case 'elements':
           
          return <EditElementsModule />
        default: return ''
        }
      }

  return (
    <MDBAnimation type="bounceInUp">
      {/* <div className="background-white"> */}
        <MDBIcon
          icon="times-circle"
          className="rightTopCorner mt-2 hover-red cursor-pointer mr-3 z-100"
          size="lg"
          onClick={() => onShowInView('bottomView')}
        />
        <Component />
      {/* </div> */}

    </MDBAnimation>
  );
  
}

const mapStateToProps = createStructuredSelector({
  componentName: makeSelectBottomViewComponent(),
  showBottmView: selectors.makeSelectShowBottomView(),
  
});


const mapDispatchToProps = (dispatch) => {
  return {
    onShowInView: (view, componentName, mode, id) => dispatch(showInView(view, componentName, mode, id)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BottomViewComponent);

