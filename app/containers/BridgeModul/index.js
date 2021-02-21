import React, {useEffect, memo} from 'react'
import ResizableLayOut from '../ResizableLayOut/ResizableLayOut'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { makeSelectLoading, makeSelectError, makeSelectCurrentUser,
  makeSelectRoleTypes, makeSelectCurrentUserRole} from 'containers/App/selectors';
import * as selectors from './selectors'
import { getOrgTechnicalInfo, getOrgCustomFieldsTemplate } from '../AppData/actions'
import * as actions from './actions';
const key = "bridgeModule";
import './BridgeModule.css'
const BridgeModule = ({
  bridgeLoaded,
  orgId,
  bridgeId,
  onGetBridge, 
  getOrgTechnicalInfo,
  getFolderStructure
}) => { 
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  useEffect(() => {
    if (bridgeId) {
      onGetBridge(bridgeId);

    }
    return () => {
      
    }
  }, [])
  useEffect(() => {
    if (orgId) {
      getOrgTechnicalInfo(orgId)
      
    }
    return () => {
      
    }
  }, [])
  return (

      <div className="">
        {bridgeLoaded ? (
          <ResizableLayOut />
        ) : (
          <div>Loading bridge assets...</div>
        )}
      </div>

  ); 
}

const mapStateToProps = createStructuredSelector({
  // users: makeSelectUsers(),
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  roleTypes: makeSelectRoleTypes(),
  bridgeLoaded: selectors.makeSelectBridgeLoaded()
});


const mapDispatchToProps = (dispatch) => {
  return {
    onGetBridge: (id, orgId) => dispatch(actions.getBridge(id, orgId)),
    getOrgTechnicalInfo: (orgId) => dispatch(getOrgTechnicalInfo(orgId)),

  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(BridgeModule);