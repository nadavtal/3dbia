import React, { Component, memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectQuickPanelOpen, makeSelectQuickPanelBody } from 'containers/App/selectors';
import { TOGGLE_QUICK_PANEL } from 'containers/App/constants';
import { MDBIcon } from 'mdbreact';
import { CSSTransition } from 'react-transition-group';

import './QuickPanel.css';
import { toggleQuickPanel } from 'containers/App/actions';

const QuickPanel = ({ quickPanelOpen, onToggleQuickPanel }) => {
  return <>
    <div className={`sidePanel ${quickPanelOpen ? '' : 'offScreenRight'}`}>
    </div>
      {quickPanelOpen && <div
            className="overlapblackbgFullScreen"
            onClick={onToggleQuickPanel}
          />}
  </>;
}
const mapStateToProps = createStructuredSelector({
    quickPanelOpen: makeSelectQuickPanelOpen(),
    quickPanelBody: makeSelectQuickPanelBody(),
  });
  
  const mapDispatchToProps = dispatch => {
    return {
      onToggleQuickPanel: () => dispatch(toggleQuickPanel()),
    }
  }
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default compose(
    withConnect,
    memo,
  )(QuickPanel);
