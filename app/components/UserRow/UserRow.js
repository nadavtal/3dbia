import React, { memo, useState, useRef } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getRoleById, getOrganizationUser } from 'utils/dataUtils'
import  useOutsideAlerter  from 'utils/customHooks/useOutSideClick';
import {
  makeSelectLoading,
  makeSelectCurrentUser,
  makeSelectGeneralUserStatuses,
  makeSelectConnectionStatuses,
  makeSelectCurrentUserRole
} from 'containers/App/selectors';
import { makeSelectOrganizationUsers } from 'containers/Organizations/Organization/selectors'
import { toggleAlert, toggleModal } from 'containers/App/actions';
import { updateOrgUser, updateProvUser, addProviderUser, addOrganizationUser } from 'containers/AppData/actions';
import PropTypes from 'prop-types';
import Select from 'components/Select/Select';
import Status from 'components/Status';
import DateField from '../DateField/DateField';
import Actions from '../Actions'
import TableRow from 'components/TableRow';
import { MDBInput } from "mdbreact";

import './UserRow.css'

function UserRow({
  user,
  currentUserRole,
  orgUsers,
  checked,
  onClick,
  index,
  handleChecked,
  statuses,
  connectionStatuses,
  statusesType,
  roles,
  onToggleAlert,
  onUpdateOrgUser,
  onUpdateProvUser,
  onToggleModal,
  type,
  onAddProviderUser,
  onAddOrganizationUser,
  
}) {
  // console.log(user);
  const [editMode, setEditMode] = useState(false);
  const wrapperRef = useRef(null);
  const clickedOutSide = useOutsideAlerter(wrapperRef);
  if (editMode && clickedOutSide) {
    // console.log('clickedOutSide', clickedOutSide)
    setEditMode(false)
  }
  let actions = [
    // { name: `Switch roles`, icon: 'random', type: 'info', selectOptionsType: 'role'},
    // { name: `Change status`, icon: 'sync', type: 'info', selectOptionsType: 'status'},
    { name: `Edit role`, icon: 'edit', type: 'info'},
    
    // { name: `Delete role`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
  ]
  if (type === 'extended' && currentUserRole.role_type == 'Provider admin') {
    // console.log(currentUserRole)
    actions = [ ...actions, { name: `Add role`, icon: 'plus', type: 'info'}]
  }
  const handleAction = (actionName, val) => {
    // console.log(actionName, val)
    switch (actionName) {
      case 'Switch roles':
        const role = getRoleById(val, roles)
        const existingOrgUser = getOrganizationUser(user.user_id, user.organization_id, val, orgUsers);
        // console.log(existingOrgUser)
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
            title: <span>Change <span className="bold border-bottom border-dark">role</span> for {`${user.first_name} ${user.last_name}`}</span>,
            text: `Are you sure you want to switch to ${role.name} ?`,
            confirmButton: 'Yes',
            cancelButton: 'Cancel',
            
            confirmFunction: () => onUpdateOrgUser(user, role, {})
          });
          break

        }
      case 'Change status':
        console.log('Change status')
        // const status = statuses.find(status => status.id === val)
        console.log(val, connectionStatuses, statuses, statusesType)
        const status = statusesType === 'connectionStatuses' ? connectionStatuses[val] : statuses[val]
        console.log(status)
        onToggleAlert({
          title: <span>Change <span className="bold border-bottom border-dark">status</span> for {`${user.first_name} ${user.last_name}`}</span>,
          text: `Are you sure you want to switch to ${status.name} ?`,
          confirmButton: 'Yes',
          cancelButton: 'Cancel',
          
          confirmFunction: () => {
            console.log(user)
            if (user.organization_id && user.provider_id || !user.provider_id && user.organization_id) onUpdateOrgUser(user, {}, status)
            else if (user.provider_id && !user.organization_id) onUpdateProvUser(user, {}, status)
           
          }
        });
        break
        
      case 'Edit role':
        setEditMode(!editMode)
        break
      case 'Add role':
        if (!roles.length) {
          onToggleAlert({
            title: `No available roles for ${user.first_name} ${user.last_name}`,
            text: `${user.first_name} ${user.last_name} is allready allocated to all roles`,
            confirmButton: 'Ok',
            // cancelButton: 'Cancel',
            alertType: 'danger',
            // confirmFunction: () => {
            //   // onToggleAlert()
            // }
          });
        }
        else onToggleModal({
          title: 'Add role',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          data: {
            editMode: 'edit',
            roles: roles
          },
          colWidth: 6,
          formType:'rolesForm',
          confirmFunction: (data) => {
           console.log(user)
           const role = roles.find(role => role.id === data.roles);
           console.log(role)
           let newUserRole
           if (!role.organization_id) {
             newUserRole = {
               user_id: user.user_id,
               provider_id: user.provider_id ? user.provider_id : 0,
               organization_id: role.organization_id ? role.organization_id : 0,
               role_id: role.id,
               remarks:user.remarks,
               date_created: Date.now(),
               status: 'Awaiting approvement'
             }
            //  console.log(newUserRole)
             onAddProviderUser(newUserRole, {first_name: user.first_name, last_name: user.last_name})
           } else {
            newUserRole = {
              user_id: user.user_id,
              provider_id: user.provider_id ? user.provider_id : user.provider_id,
              organization_id: role.organization_id,
              role_id: role.id,
              remarks:user.remarks,
              date_created: Date.now(),
              status: 'Awaiting approvement'
            }
            // console.log(newUserRole)
            onAddOrganizationUser(newUserRole, {first_name: user.first_name, last_name: user.last_name})
           }

          },
        })
        break
      default:
        break
    }

  }
  if (type === 'simple') {

    return (
      <TableRow
        className={`row py-2 tableRow hoverBgPrimaryFaded1 ${editMode && 'active'}`}
        onClick={onClick}
      >
        <div className="col-2 text-left">
          {handleChecked ? 
             <MDBInput
             label={`${user.first_name} ${user.last_name}`}
             filled
             type="checkbox"
             id={`checkbox${user.id ? user.id : user.user_id}_${index}`}
             containerClass=""
             checked={checked}
             // onChange={() =>
             //   selectedUser.id === user.id
             //     ? setSelectedUser()
             //     : setSelectedUser(user)
             // }
           /> :
           <span>{user.first_name} {user.last_name}</span>}
         
        </div>
        <div className="col-2">{user.email}</div>
        <div className="col-3">{user.remarks}</div>
        <div className="col-1">
          <DateField date={user.date_created} />
        </div>
        <div className="col-2">
          {editMode ? (
            <Select
              value={
                statusesType === 'connectionStatuses'
                  ? user.status
                  : user.general_status
              }
              className="fullWidth"
              options={
                statusesType === 'connectionStatuses'
                  ? Object.keys(connectionStatuses).map(key => {
                    return {id: connectionStatuses[key].name,  name: connectionStatuses[key].name} 
                  })
                  : Object.keys(statuses).map(key => {
                    return {id: connectionStatuses[key].name,  name: connectionStatuses[key].name} 
                  })
              }
              onChange={val => handleAction('Change status', val)}
            />
          ) : (
            <Status statusName={user.status}
            />
          )}
        </div>
        <div className="col-2">
          <Actions
            actions={actions}
            handleAction={actionName => handleAction(actionName)}
          />
          {/* <PopperMenu
            actions={actions}
            roles={roles}
            bgColor={'blue'}
            handleAction={(actionName, val) => handleAction(actionName, val, user)}
          /> */}
        </div>
      </TableRow>
    );
  } else if (type === 'extended') {
    // console.log(user.status)
    // console.log(connectionStatuses)
    return (
      <TableRow
        className={`row py-2 tableRow hoverBgPrimaryFaded1 ${editMode && 'active'}`}
        onClick={onClick}
        ref={wrapperRef}
      >
        <div className="col-2 text-left">
          {handleChecked ? (
            <MDBInput
              label={`${user.first_name} ${user.last_name}`}
              filled
              type="checkbox"
              id={`checkbox${user.id ? user.id : user.user_id}_${index}`}
              containerClass=""
              checked={checked}
              // onChange={() =>
              //   selectedUser.id === user.id
              //     ? setSelectedUser()
              //     : setSelectedUser(user)
              // }
            />
          ) : (
            <span>
              {user.first_name} {user.last_name}
            </span>
          )}
        </div>
        {user.companyName && (
          <div className="col-1">{user.companyName}</div>
        )}
        {user.roleName ? (
          <div className="col-2">
            {editMode && currentUserRole === 'Provider administrator' ? (
              <Select
                value={user.roleName}
                options={roles}
                onChange={val => handleAction('Switch roles', val)}
              />
            ) : (
              user.roleName
            )}
          </div>
        ) : (
          ''
        )}
        {/* <div className="col-3">{user.email}</div> */}
        <div className="col-2">{user.description}</div>
        <div className="col-2">{user.remarks}</div>
        <div className="col-1">
          <DateField date={user.date_created} />
        </div>
        <div className="col-1">
          {editMode ? (
            <Select
              value={
                statusesType === 'connectionStatuses'
                  ? user.status
                  : user.general_status
              }
              className="fullWidth"
              options={
                statusesType === 'connectionStatuses'
                  ? connectionStatuses
                  : statuses
              }
              onChange={val => handleAction('Change status', val)}
            />
          ) : (
            <Status statusName={user.status}
            />
          )}
        </div>
        <div className="col-1 d-flex align-items-center">
          {/* <MDBPopover placement="left" popover clickable id="popper1">
            <MDBBtn 
              className="userRowActionButton"
              size="sm"
              rounded>
              <IconButtonToolTip
                iconName={'plus'}
                toolTipType={'info'}
                toolTipPosition="left"
                toolTipEffect="float"
                toolTipText="Add role"
                className={`text-black`}
                onClickFunction={() => handleAction('Add role')}
              />
            </MDBBtn>

            <div>
              <MDBPopoverHeader>Choose role</MDBPopoverHeader>
              <MDBPopoverBody>
                {roles.map(role => {
                  console.log(role)
                  return <div>
                    {role.name}
                  </div>
                })}
              </MDBPopoverBody>
            </div>
          </MDBPopover> */}
          <Actions
            actions={actions}
            handleAction={actionName => handleAction(actionName)}
          />
        </div>
      </TableRow>
    );
  }

}

UserRow.propTypes = {
  user: PropTypes.any,
};
const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  currentUserRole: makeSelectCurrentUserRole(),
  loading: makeSelectLoading(),
  statuses: makeSelectGeneralUserStatuses(),
  connectionStatuses: makeSelectConnectionStatuses(),
  orgUsers: makeSelectOrganizationUsers()
});

const mapDispatchToProps = dispatch => {
  return {
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onToggleModal: modalData => dispatch(toggleModal(modalData)),
    onUpdateOrgUser: (user, role, status) => dispatch(updateOrgUser(user,role, status)),
    onUpdateProvUser: (user, role, status) => dispatch(updateProvUser(user,role, status)),
    onAddProviderUser: (provUser, user) => dispatch(addProviderUser(provUser, user)),
    onAddOrganizationUser: (provUser, user) => dispatch(addOrganizationUser(provUser, user)),
  };
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserRow);
