import React, { useEffect, memo } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import ToolBar from '../../components/ToolBar/ToolBar';
import reducer from './reducer';
// import Basic from 'components/Basic/Basic';
// import Extended from './Extended/Extended';
import { makeSelectUser } from './selectors';
import * as actions from './actions'

const key = 'userPage';

export function UserPage({
  getUser,
  user
}) {
  useInjectReducer({ key, reducer });

  useEffect(() => {

  }, []);
  getUser()
  return (

    <div className="userPage">
      <ToolBar position="topToolBar">

      </ToolBar>
      <br></br>
      <Basic></Basic>
      <Extended></Extended>
    </div>
  )
}


const mapStateToProps = createStructuredSelector({
  user: makeSelectUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),

});

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (userId) => dispatch(actions.getUser(userId))

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserPage);


