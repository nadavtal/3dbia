import React, { memo, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import TableRowWrapper from "../TableRow";
import IconButtonToolTip from "../IconButtonToolTip/IconButtonToolTip";
import Actions from '../Actions';
import { MDBInput, MDBBtn } from "mdbreact";
import  useOutsideAlerter  from 'utils/customHooks/useOutSideClick';
import { toggleAlert } from 'containers/App/actions';
import { updateRole } from 'containers/AppData/actions';
import Select from 'components/Select/Select';

import {
  makeSelectCurrentUser,
} from 'containers/App/selectors';
const RoleRow = ({role, onUpdateRole}) => {
  const [editMode, setEditMode] = useState(false);
  const [roleName, setRoleName] = useState(role.name);
  const [roleDescription, setRoleDescription] = useState(role.description);
  const [roleVisibility, setRoleVisibility] = useState(role.visibility);
  const wrapperRef = useRef(null);
  const clickedOutSide = useOutsideAlerter(wrapperRef);
  if (editMode && clickedOutSide) {
    console.log('clickedOutSide', clickedOutSide)

    const updatedRole = {...role}
    updatedRole.name = roleName;
    updatedRole.description = roleDescription;
    updatedRole.visibility = roleVisibility;
    onUpdateRole(updatedRole);
    setEditMode(false)
  }
  useEffect(() => {
    setRoleName(role.name)

  }, [role])  
 const actions = [
    { name: `Edit role`, icon: 'edit', type: 'info'},
    // { name: `Delete role`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
  ]
  // console.log(roleName)
  const handleAction = (actionName, val) => {
    
    switch (actionName) {
      
      case 'Edit role':
        if (editMode) {
          const updatedRole = {...role}

          console.log(roleName)
          updatedRole.name = roleName;
          updatedRole.description = roleDescription;
          updatedRole.visibility = roleVisibility;
          onUpdateRole(updatedRole)
          setEditMode(!editMode)
        } else {
          setEditMode(!editMode)

        }
        break
      case 'Change visibility':
        if (editMode) {
          console.log(actionName, val);
          setRoleVisibility(val)
          // setEditMode(!editMode)
        } else {
          setEditMode(!editMode)

        }
        break
 
      default:
        break
    }

  }
  return (
    <TableRowWrapper
      className={`row nu-gutters text-center py-1 tableRow hoverBgPrimaryFaded1 ${editMode && 'active'}`}
      ref={wrapperRef}
    >
      <div className="col-2 text-left">
        {editMode ? (
          <MDBInput
            value={roleName}
            onChange={val => setRoleName(val.target.value)}
            // onBlur={val => handleAction('editRole', val)}
          />
        ) : (
          roleName
        )}
      </div>
      <div className="col-2">{role.companyName}</div>
      <div className="col-3">
        {editMode ? (
          <MDBInput
            value={roleDescription}
            onChange={val => setRoleDescription(val.target.value)}
            // onBlur={val => handleAction('editRole', val)}
          />
        ) : (
          roleDescription
        )}
      </div>
      <div className="col-2">{role.type}</div>
      <div className="col-1">
        {editMode ? (
          <Select
            value={roleVisibility}
            selected="Visibility"
            className="fullWidth"
            options={
              [
                {id: 'Public',  name: 'Public'},
                {id: 'Private',  name: 'Private'},
              ]  
            }
            onChange={val => handleAction('Change visibility', val)}
          />
        ) : (
          roleVisibility
        )}
      </div>
      <div className="col-2">
        <Actions
          actions={actions}
          handleAction={actionName => handleAction(actionName)}
        />
      </div>
    </TableRowWrapper>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onUpdateRole: (role) => dispatch(updateRole(role)),
    
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(RoleRow);
