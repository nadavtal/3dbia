import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getRolesByUserId, getAvailableRolesByUserId, getOrgById, getRoleById, searchBy, sortBy } from 'utils/dataUtils'
import { makeSelectLoading, makeSelectError, makeSelectCurrentUser,
  makeSelectRoleTypes, makeSelectCurrentUserRole, makeSelectShowChat,
  makeSelectMenuItem, makeSelectGeneralUserStatuses, makeSelectConnectionStatuses
} from 'containers/App/selectors';
import { ExportService } from 'containers/Wijmo/export';
import {
  makeSelectUniqueOrganizationUsers,
  makeSelectProvidersRoles,
  makeSelectProviderUsers,
  makeSelectOrganizationRoles,
  makeSelectOrganizationUsers,
  makeSelectOrganizationProviders,
  makeSelectOrganization
} from './selectors';
import { reArrangeObject } from 'utils/dataUtils'
import { toggleModal, toggleAlert, toggleLoadingSpinner } from 'containers/App/actions';
import { updateTask, createNewRole, createUserAndConnection, createUserConnection, updateUserConnection, registerNewOrgUser,
  allocateUserToOrg, updateProvider, getProviderbyId, logout, findEntityBy, 
  createNewProviderUserAndThenAllocateToOrganization, updatedUser,
   } from 'containers/AppData/actions';
import { setSelectedComponent } from './actions'
import Roles from 'components/Roles';
import { MDBBtn, MDBIcon } from 'mdbreact'
import IconButtonToolTip from 'components/IconButtonToolTip/IconButtonToolTip';
import PageHeader from 'components/PageHeader/PageHeader';
import Menu from 'containers/Management/Menu'
import Layout from 'containers/Management/Layout';
import MyWijmoCheckBoxTable from 'containers/MyTables/MyWijmoCheckBoxTable';
import GroupedTable from 'containers/MyTables/GroupedTable';
import UsersGroupedTable from 'containers/MyTables/UsersGroupedTable';
import MyWijmoDetailedTable from 'containers/MyTables/MyWijmoDetailedTable';
import SimpleTable from 'containers/MyTables/SimpleTable';
import styled from "styled-components";
const ActionsWrapper = styled.div`
position: absolute;
top: 1.4rem;
right: 8rem;
`;
const UserManagement = ({
  currentUser,
  organization,
  organizationUsers,
  uniqueProviderUsers,
  providersRoles,
  organizationRoles,
  roleTypes,
  currentUserRole,
  onToggleModal,
  onToggleAlert,
  onCreateUserConnection,
  onCreateUserAndConnection,
  onFindEntity,

  statuses,
  connectionStatuses,
  onToggleLoadingSpinner,
  onUpdateUserConnection
}) => {
    
  const [selected, setSelected] = useState()
  
  let allRoles = useMemo(() => sortBy('id', [...organizationRoles, ...providersRoles]), [organizationRoles, providersRoles]);

  const handleSelected = (users) => {
    console.log(users)
    console.log(selected)
    // if (users == selected) setSelected()
    // else 
    setSelected(users)
    // setshowActions(true)
  }
  const handleAction = (name, value) => {
    console.log(name, value);
  
    switch (name) {

      case 'Allocate users to role':
        // console.log(organizationUsers, typeof(organizationUsers))
        onToggleModal({
          title: `Allocate user to ${organization.name}`,
          text:
            'Choose users and role to allocate to ' +
            organization.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'organizaionUserAllocationForm',

          data: {
            // organizationUsers: allProvidersUsers,
            users: uniqueProviderUsers,
            roles: organizationsRolesByOrg.filter(
              orgRole =>
                orgRole.organization_id === organization.id,
            ),
            editMode: 'Allocate',
            colWidth: 12,
          },
          confirmFunction: (data, event) => {
            console.log(data);
            prepareUserAllocation(data);
          },
        });
        break;
      case 'Add role to users':
        if (selected[0].id) {
          const userRoles = getRolesByUserId(selected[0].user_id, organizationUsers, organizationRoles);
          console.log(userRoles)
          const availableRoles = getAvailableRolesByUserId(organizationRoles, userRoles)
          console.log(availableRoles)
          onToggleModal({
            title: `Add role to ${selected[0].first_name} ${selected[0].last_name} (${selected[0].id})`,
            text: 'Choose role to allocate to users',
            // confirmButton: 'Create',
            cancelButton: 'Cancel',
            formType: 'rolesForm',
  
            data: {
              // organizationUsers: allProvidersUsers,
              // users: uniqueProviderUsers,
              roles: availableRoles,
              editMode: 'Add',
              colWidth: 12,
            },
            confirmFunction: (data, event) => {
              console.log(data);
              const role = organizationRoles.find(role => role.id == data.role_id)
         
              let userConnectionData = {
                ...selected[0],
                role_id: data.role_id,
                roleName: role.name,
                role_type_id: role.role_type_id,
                remarks: data.remarks,
                status: 'Awaiting approvement',
              };
              onCreateUserConnection(userConnectionData)
              // prepareUserAllocation(data);
            },
          });
        } else {

        }

        break
      case 'Send message':
        // console.log(selected)
        // const userRoles = getRolesByUserId(user.user_id, users, roles);
        // const availableRoles = getAvailableRolesByUserId(roles, userRoles)
        onToggleModal({
          title: `Send message`,
          // text: 'Choose role to allocate to users',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'messageForm',

          data: {
            editMode: 'Send',
            colWidth: 12,
          },
          confirmFunction: (data, event) => {
            console.log(data);
            // prepareUserAllocation(data);
          },
        });
      case 'Edit user role':
        console.log(selected)
        // const userRoles = getRolesByUserId(user.user_id, users, roles);
        // const availableRoles = getAvailableRolesByUserId(roles, userRoles)
        if (selected.length > 1) {
          onToggleModal({
            title: `Update all roles for ${selected[0].first_name} ${selected[0].last_name} (${selected[0].id})`,
            // text: 'Choose role to allocate to users',
            // confirmButton: 'Create',
            cancelButton: 'Cancel',
            formType: 'statusRemarksForm',

            data: {
              roles: organizationRoles,
              editMode: 'Update',
              colWidth: 12,
            },
            confirmFunction: (data, event) => {
              console.log(data)
              const status = connectionStatuses.find(status => status.id == data.connectionStatus[0])
              const updatedUserRoles = [...selected];
              updatedUserRoles.forEach(userRole => {
                userRole.status = status.name
                userRole.remarks = data.remarks
              })
              setSelected(updatedUserRoles)
              onUpdateUserConnection(updatedUserRoles)
            },
          });
        } else {
          
          onToggleModal({
            title: `Update role for ${selected[0].first_name} ${selected[0].last_name} (${selected[0].id})`,
            // text: 'Choose role to allocate to users',
            // confirmButton: 'Create',
            cancelButton: 'Cancel',
            formType: 'userRoleForm',

            data: {
              item: selected[0],
              roles: allRoles,
              editMode: 'Edit',
              colWidth: 12,
            },
            confirmFunction: (data, event) => {
              // console.log(data);
              // console.log(selected[0]);
              // console.log(allRoles);
              // console.log(connectionStatuses);
              const role = allRoles.find(role => role.id == data.role_id)
              const status = connectionStatuses.find(status => status.id == data.connectionStatus[0])
              console.log(role);
              let updatedUserRole = {...selected[0], ...data};
              updatedUserRole.roleName = role.name
              updatedUserRole.role_type_id = role.role_type_id;
              updatedUserRole.status = status.name;
              onUpdateUserConnection([updatedUserRole])
              // prepareUserAllocation(data);
            },
          });
        }

        break
      default:
        break;
    }
  };
  // const table = useMemo(
  //   () => (
  //     <MyWijmoCheckBoxTable
  //       data={organizationUsers}
  //       // dataService={new DataService()}
  //       exportService={new ExportService()}
  //       handleCheckboxClick={selectedItems => handleSelected(selectedItems)}
  //       multiSelectionMode={false}
  //       // selectedItems={selection}
  //       tableConfig={{
  //         exludesFields: [
  //           'user_id',
  //           'provider_id',
  //           'role_id',
  //           'profile_image',
  //           'confirmation_token',
  //           'role_type_id',
  //         ],

  //         editableFields: [],
  //         longFields: ['remarks', 'description', 'full_name'],
  //         dateFields: ['date_created'],
  //         // fixedColumns: 3,
  //         wholeNumberFields: [],
  //         decimelNumberFields: [],
  //         groups: ['full_name'],
  //         frozenColumns: 1,
  //         groupHeaderFormat: `<b>{value}</b> ({count:n0} roles)`,
  //         hideGroupPanel: true,
  //       }}
  //     />
  //   ),
  //   organizationUsers,
  // );
  
  const Actions = () => {

    return (
      <div className="mt-2 d-flex">
        {/* <MDBBtn>
        Add
        <MDBIcon icon="plus"/>
      </MDBBtn> */}
        <IconButtonToolTip
          className=""
          iconClassName="colorPrimary"
          size="sm"
          iconName="user-tag"
          toolTipType="info"
          toolTipPosition="left"
          toolTipEffect="float"
          toolTipText={`Add role to users`}
          onClickFunction={() => handleAction('Add role to users')}
        />
        <IconButtonToolTip
          className="mx-3"
          iconClassName="colorPrimary"
          size="sm"
          iconName="envelope"
          toolTipType="info"
          toolTipPosition="left"
          toolTipEffect="float"
          toolTipText="Send message"
          onClickFunction={() =>
            handleAction('Send message')
          }
        />
        <IconButtonToolTip
          className=""
          iconClassName="colorPrimary"
          size="sm"
          iconName="edit"
          toolTipType="info"
          toolTipPosition="left"
          toolTipEffect="float"
          toolTipText="Update user role"
          onClickFunction={() =>
            handleAction('Edit user role')
          }
        />
      </div>
    );
  }
  const scrollContainerStyle = {
    width: "100%", 
   //  maxHeight: `calc(100vh)-${theme.layout.topBarSize}`, 
    maxHeight: `50vh`, 
    overFlowY: 'auto',
    overFlowX: 'auto'
   };
  console.log(selected)
  return (
    <>
      {selected && (
        <ActionsWrapper className="">
          <Actions />
        </ActionsWrapper>
      )}
      <GroupedTable 
        data={organizationUsers}
        className="maxHeight65vh"
        selectedItems={selected}
        tableConfig={{
          exludesFields: [
            'id',
            'user_id',
            'provider_id',
            'organization_id',
            'role_id',
            'profile_image',
            'confirmation_token',
            'role_type_id',
          ],

          editableFields: [],
          longFields: ['remarks', 'description', 'email'],
          dateFields: ['date_created'],
          // fixedColumns: 3,
          wholeNumberFields: [],
          decimelNumberFields: [],
          groups: ['user_id'],
          frozenColumns: 2,
          // groupHeaderFormat: `<b>{value}</b> ({count:n0} roles)`,
          hideGroupPanel: true,
          allowPinning: false,
          selectionMode: "ListBox",
          showSearch: true,
          allowDragging: false
          // 
        }}
        onRowClick={selectedItems => handleSelected(selectedItems)}
        exportService={new ExportService()}
        />
      {/* <MyWijmoCheckBoxTable
        // style={scrollContainerStyle}
        className="maxHeight65vh"
        data={organizationUsers}
        // dataService={new DataService()}
        exportService={new ExportService()}
        handleCheckboxClick={selectedItems => handleSelected(selectedItems)}
        multiSelectionMode={false}
        selected={selected}
        // selectedItems={selection}
        tableConfig={{
          exludesFields: [
            'user_id',
            'provider_id',
            'role_id',
            'profile_image',
            'confirmation_token',
            'role_type_id',
          ],

          editableFields: [],
          longFields: ['remarks', 'description', 'full_name'],
          dateFields: ['date_created'],
          // fixedColumns: 3,
          wholeNumberFields: [],
          decimelNumberFields: [],
          groups: ['user_id'],
          frozenColumns: 1,
          groupHeaderFormat: `<b>{value}</b> ({count:n0} roles)`,
          hideGroupPanel: true,
        }}
      /> */}
    </>
  );

}

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  organization: makeSelectOrganization(),
  providers: makeSelectOrganizationProviders(),
  // uniqueProviderUsers: makeSelectUniqueProviderUsers(),
  providersRoles: makeSelectProvidersRoles(),
  organizationRoles: makeSelectOrganizationRoles(),
  organizationUsers: makeSelectOrganizationUsers(),
  roleTypes: makeSelectRoleTypes(),
  currentUserRole: makeSelectCurrentUserRole(),
  statuses: makeSelectGeneralUserStatuses(),
  connectionStatuses: makeSelectConnectionStatuses(),
//   roleTypes: makeSelectRoleTypes()
});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onCreateNewRole: (data) => dispatch(createNewRole(data)),
    onCreateUserAndConnection: (newUser, provider, org) => dispatch(createUserAndConnection(newUser, provider, org)),
    onCreateUserConnection: (userConnectionData) => dispatch(createUserConnection(userConnectionData)),
    onUpdateUserConnection: (users) => dispatch(updateUserConnection(users)),
       
    onFindEntity: (type, value) => dispatch(findEntityBy(type, value)),
    onToggleLoadingSpinner: (msg) => dispatch(toggleLoadingSpinner(msg)),
    onSetSelectedComponent: componentName => dispatch(setSelectedComponent(componentName))
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(UserManagement);



