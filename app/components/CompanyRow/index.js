import React, { memo, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { getRoleById, getOrganizationUser } from 'utils/dataUtils'
import {
  makeSelectLoading,
  makeSelectCurrentUser,
  makeSelectGeneralUserStatuses,
  makeSelectConnectionStatuses
} from 'containers/App/selectors';

import { toggleAlert } from 'containers/App/actions';
import { updateProviderOrgConnection } from 'containers/AppData/actions';
import PropTypes from 'prop-types';
import { MDBInput } from 'mdbreact';
import styled from 'styled-components';
import Select from 'components/Select/Select';
import Status from 'components/Status';
import DateField from '../DateField/DateField';
import Actions from '../Actions'
import TableRow from 'components/TableRow';
import TableRowWrapper from "../TableRow";
import PopperMenu from '../PopperMenu/PopperMenu';

const key = 'companyRow';

function CompanyRow({
  company,
  
  checked,
  onClick,
  connectionStatuses,
  // statusesType,
  statuses,
  roles,
  onToggleAlert,
  updateOrgUser,
  updateProviderOrgConnection
}) {
  // console.log(company);
  const [editMode, setEditMode] = useState(false);
  // console.log(user, roles)
  // const role = getRoleById(user.role_id, roles);
  // const getStatusByName = statusName => {
  //   Object.keys(statuses)
  //   statuses.find(status => status.name === statusName)
  // }
  // console.log('role', role)
  const actions = [
    // { name: `Switch roles`, icon: 'random', type: 'info', selectOptionsType: 'role'},
    // { name: `Change status`, icon: 'sync', type: 'info', selectOptionsType: 'status'},
    { name: `Edit role`, icon: 'edit', type: 'info'},
    // { name: `Edit dataBase`, icon: 'eye', type: 'info'},
    // { name: `Remove provider`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
  ]
  const handleAction = (actionName, val) => {
    console.log(actionName, val)
    switch (actionName) {
      case 'Switch roles':
        
        if (existingOrgUser) {
          onToggleAlert({
            title: `Oops...`,
            text: `${user.first_name} ${user.last_name} is allready allocated as ${role.name}`,
            confirmButton: 'Got it',
            cancelButton: 'Cancel',
            alertType: 'danger',
            confirmFunction: () => onToggleAlert()
          });
          break
        } else {
          onToggleAlert({
            title: `${actionName} for ${user.first_name} ${user.last_name}`,
            text: `Are you sure you want to switch to ${role.name} ?`,
            confirmButton: 'Yes',
            cancelButton: 'Cancel',
            
            confirmFunction: () => updateOrgUser(user, role, {})
          });
          break

        }
      case 'Change status':
        // const status = statuses.find(status => status.id === val)
        console.log(connectionStatuses)
        console.log(val)
        const status = connectionStatuses.find(status => status.id == val)
 
        onToggleAlert({
          title: `${actionName} for ${company.name}`,
          text: `Are you sure you want to switch to ${status.name} ?`,
          confirmButton: 'Yes',
          cancelButton: 'Cancel',
          
          confirmFunction: () => updateProviderOrgConnection(company, status)
        });
        break
        
      case 'Edit role':
        setEditMode(!editMode)
        break
      default:
        break
    }

  }
  // console.log(company)
  return (
    <TableRowWrapper className="row no-gutters tableRow py-1 p-3"
      >
      <div className="col-1" onClick={onClick}>{`${company.name}`}</div>
      <div className="col-1" onClick={onClick}>{`${company.contact_name}`}</div>
      <div className="col-3" onClick={onClick}>{company.remarks}</div>
      <div className="col-2" onClick={onClick}>{company.region}</div>
      <div className="col-2" onClick={onClick}>{company.phone}</div>
      <div className="col-2">
        {editMode ? (
          <Select
            value={company.status}
            className="fullWidth"
            options={connectionStatuses}
            onChange={val => handleAction('Change status', val)}
          />
        ) : (
          
          <Status statusName={company.status ? company.status : company.general_status} />
        )}
      </div>
      <div className="col-1">
        <Actions
          actions={actions}
          handleAction={actionName => handleAction(actionName)}
        />
      </div>
    </TableRowWrapper>
  );
}

CompanyRow.propTypes = {
  company: PropTypes.any,
};
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  statuses: makeSelectGeneralUserStatuses(),
  connectionStatuses: makeSelectConnectionStatuses(),
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    updateProviderOrgConnection: (company, status) => dispatch(updateProviderOrgConnection(company, status))
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(CompanyRow);
