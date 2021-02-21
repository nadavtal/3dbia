import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Resizable } from "re-resizable";
import { useInjectReducer } from 'utils/injectReducer';
import { createStructuredSelector } from 'reselect';
import * as selectors from './selectors';
import * as actions from './actions';
import { makeSelectShowBottomView } from '../BridgeModul/BottomViewComponent/selectors'
import MainViewWrapper from './MainView'
import reducer from './reducer';
import BottomViewComponent from "../BridgeModul/BottomViewComponent/BottomViewComponent";
import MainViewComponent from "../BridgeModul/MainViewComponent/MainViewComponent";
import LeftViewComponent from "../BridgeModul/LeftViewComponent/LeftViewComponent";
import { MDBAnimation } from "mdbreact";

const key = "resizableLayout";

const ResizableLayOut = ({
    leftViewSize,
    showBottomView,
    bottomViewSize,
    onSetBottmViewHeight
}) => {
    
  useInjectReducer({ key, reducer });
  
  return leftViewSize ? (
    <div className="d-flex justify-content-between">
      <Resizable
        enable={{
          right: true,
        }}
        className=""
        // style={this.secondaryStyle}
        // size={this.props.leftViewSize}
        defaultSize={leftViewSize}
        minWidth={leftViewSize.width}
        maxWidth="93%"
        //   // maxHeight="83vh"
        //   onResize={this.secondaryResize}
      >
        {/* <LeftViewComponent /> */}
        <LeftViewComponent />
      </Resizable>
      <MainViewWrapper>
        <MainViewComponent />
        {/* <MDBAnimation type="bounceInUp" className=""> */}
        <Resizable
          enable={{
            top: true,
          }}
          className={`${!showBottomView && 'offScreenBottom'}`}
          style={{
            // transition: '.3s all',
            position: 'absolute',
            // bottom: this.props.showBottomView ? 0 : '-100%',
            bottom: 0,
            backgroundColor: 'white',
            border: '1-x solid black',
          }}
          defaultSize={{
            width: '100%',
            height: 300,
          }}
          minHeight={80}
          maxHeight={'100%'}
          // onResizeStop={e => console.log(e)}
          onResizeStop={e => onSetBottmViewHeight((800 - e.pageY))}
        >
          
          <BottomViewComponent />
        </Resizable>

        {/* </MDBAnimation> */}
      </MainViewWrapper>
    </div>
  ) : null;
}

const mapStateToProps = createStructuredSelector({
    leftViewSize: selectors.makeSelectLeftViewSize(),
    rightViewSize: selectors.makeSelectRightViewSize(),
    // bottomViewSize: selectors.makeSelectBottomViewSize(),
    showBottomView: makeSelectShowBottomView(),
    
  });


const mapDispatchToProps = (dispatch) => {
  return {
    onShowInView: (view, componentName, mode, id) => dispatch(showInView(view, componentName, mode, id)),
    onSetBottmViewHeight:(height) => dispatch(actions.setBottomViewHeight(height)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ResizableLayOut);

