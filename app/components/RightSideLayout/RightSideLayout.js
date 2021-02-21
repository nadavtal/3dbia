import React, { useState, memo } from 'react';
import ChatPanel from 'components/RightSideLayout/Chat/Chat';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectShowChat } from 'containers/App/selectors';
import QuickPanel from 'components/RightSideLayout/QuickPanel/QuickPanel';
import './RightSideLayout.css'
const RightSideLayout = ({
  showChat
}) => {

    return (
      <>
        {showChat && <ChatPanel />}

        <QuickPanel />
      </>
    );
}

const mapStateToProps = createStructuredSelector({
  showChat: makeSelectShowChat()
});

const mapDispatchToProps = dispatch => {
  return {
    // onToggleQuickPanel: () => dispatch(toggleQuickPanel()),
  }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RightSideLayout);

