import React, { memo } from 'react';
import ToolBar from '../../components/ToolBar/ToolBar';
import ButtonsSection from '../../components/ToolBar/ButtonsSection/ButtonsSection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import * as actions  from './actions';
import { toggleModal } from '../App/actions'
import { makeSelectRoles, makeSelectPermissions } from './selectors';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from './reducer';
import Input from '../../components/Input/Input';
import ActionRow from '../../components/ActionRow/ActionRow';
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip'

const key = 'surveysManagementModule';

const SurveysManagementModule  = ({
    surveys
}) => {

  

    return (
      <div >
        
      </div>
    )
}


const mapStateToProps = createStructuredSelector({
  // users: makeSelectUsers(),
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});


const mapDispatchToProps = dispatch => {
  return {
    
    // openModal: (modalData) => dispatch()
  }
}
const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(SurveysManagementModule);
