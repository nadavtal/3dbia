import React, {memo} from 'react';
import './ToolBar.css';
import styled from 'styled-components';
import ProfileUserImage from '../ProfileUserImage';
import {MDBIcon} from 'mdbreact'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectCurrentUser,
  makeSelectCurrentUserRole,
  makeSelectShowChat
} from 'containers/App/selectors';
import { toggleQuickPanel } from 'containers/App/actions';

const key = 'topToolBar';
const Toolbar = ({
  currentUser,
  currentUserRole,
  onToggleQuickPanel
}) => {
  // console.log(currentUser)
  return <div className="d-flex align-items-center justify-content-between color-white mt-1 fullWidth">
    <div className="leftToolbar d-flex align-items-center">
      {/* <MDBIcon icon="calendar-week" size="lg" className="mx-2"/>
      <MDBIcon icon="envelope" size="lg"/> */}

    </div>
    <div className="rightToolbar d-flex align-items-center">
      {/* <MDBIcon icon="search" size="lg" className="mx-2"/>
      <MDBIcon icon="bookmark" size="lg" onClick={() => onToggleQuickPanel()}/> */}
      <div className="mx-2" >
        <div>
          {`${currentUser.userInfo.first_name} ${currentUser.userInfo.last_name}`}
        </div>
        <div className="fontSmall">{currentUserRole.role_name}</div>
      </div>

      <ProfileUserImage src={currentUser.userInfo.profile_image}/>

    </div>
  </div>
}
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleQuickPanel: () => dispatch(toggleQuickPanel())
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(Toolbar);

