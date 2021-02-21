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
import {makeSelectProvider,
    makeSelectProviderOrganizations,
    makeSelectProviderUsers,
    makeSelectProviderRoles,
    makeSelectOrganizationUsers,
    makeSelectOrganizationUsersByOrg,
    makeSelectSelectedOrganization,
    makeSelectOrganizationRolesByOrg,
    makeSelectSelectedComponent,
    makeSelectUniqueProviderUsers
} from './selectors'
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
import { all } from "redux-saga/effects";
const ActionsWrapper = styled.div`
position: absolute;
top: 1.4rem;
right: 8rem;
`;
const UserManagement = ({
  currentUser,
  provider,
  providerUsers,
  uniqueProviderUsers,
  providerRoles,
  organizationsRolesByOrg,
  organizationsUsersByOrg,
  roleTypes,
  currentUserRole,
  selectedOrganization,
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
    
  const [selected, setSelected] = useState(null)
  // console.log('providerRoles', providerRoles)
  // console.log('organizationsRolesByOrg', organizationsRolesByOrg)
  // console.log('providerUsers', providerUsers)
  let allRoles = sortBy('id', [...providerRoles, ...organizationsRolesByOrg]);
  // console.log('allRoles', allRoles)
  const handleSelected = (users) => {
    console.log(users)
    console.log('selected', selected)
    setSelected(users)
    // setshowActions(true)
  }
  const handleAction = (name, value) => {
    console.log(name, value);
  
    switch (name) {
      case 'Create new user':
        onToggleModal({
          title: 'Create new user',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          data: {
            editMode: 'create',
            colWidth: 12,
            roles: [...providerRoles, ...organizationsRolesByOrg],
          },
          formType: 'registerUserForm',
          confirmFunction: data => {
            console.log(data);
            let role = [
              ...providerRoles,
              ...organizationsRolesByOrg,
            ].find(role => role.id === data.role_id);
            console.log(role);
            data['roleName'] = role.name;
            if (role.provider_id) {
              onCreateUserAndConnection(data, provider, null);
            } else if (role.organization_id) {
              // data['from_provider_id'] = provider_id
              onCreateUserAndConnection(
                data,
                provider,
                selectedOrganization,
              );
            }
          },
          onBlurFunction: value => {
            console.log(value);
            const searchResults = searchBy(
              'email',
              value.value,
              [],
              [],
              [...organizationsUsersByOrg, ...providerUsers],
            );
            console.log(searchResults);
            if (searchResults) {
              searchResults['allocated'] = true;
              return searchResults;
            } else {
              onFindEntity('email', value.value);
            }
          },
        });
        break;

      case 'Allocate users to role':
        // console.log(providerUsers, typeof(providerUsers))
        onToggleModal({
          title: `Allocate user to ${selectedOrganization.name}`,
          text:
            'Choose users and role to allocate to ' +
            selectedOrganization.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'organizaionUserAllocationForm',

          data: {
            // providerUsers: allProvidersUsers,
            users: uniqueProviderUsers,
            roles: organizationsRolesByOrg.filter(
              orgRole =>
                orgRole.organization_id === selectedOrganization.id,
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
        console.log(selected[0])
        if (selected[0].id) {
          const userRoles = getRolesByUserId(selected[0].user_id, providerUsers, allRoles);
          console.log(userRoles)
          const availableRoles = getAvailableRolesByUserId(allRoles, userRoles)
          console.log(availableRoles)
          onToggleModal({
            title: `Add role to ${selected[0].first_name} ${selected[0].last_name} (${selected[0].id})`,
            text: 'Choose role to allocate to users',
            // confirmButton: 'Create',
            cancelButton: 'Cancel',
            formType: 'rolesForm',
  
            data: {
              // providerUsers: allProvidersUsers,
              // users: uniqueProviderUsers,
              roles: availableRoles,
              editMode: 'Add',
              colWidth: 12,
            },
            confirmFunction: (data, event) => {
              console.log(data);
              const role = allRoles.find(role => role.id == data.role_id)
         
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
        // console.log(selected)
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
              roles: allRoles,
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
              onUpdateUserConnection(updatedUserRoles)
            },
          });
        } else {
          console.log(selected[0])
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
              console.log(data.role_id);
              console.log(allRoles);
              console.log(selected[0]);
              console.log(connectionStatuses);
              const role = allRoles.find(role => role.id == data.role_id)
              console.log(role)
              const status = connectionStatuses.find(status => status.id == data.connectionStatus[0])
              console.log(status);
              let updatedUserRole = {...selected[0], ...data};
              updatedUserRole.roleName = role.name
              updatedUserRole.role_type_id = role.role_type_id;
              updatedUserRole.status = status.name;
              onUpdateUserConnection([updatedUserRole])
              setSelected(updatedUserRole)
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
  //       data={providerUsers}
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
  //   providerUsers,
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
      {/* <UsersGroupedTable 
        data={providerUsers}
        tableConfig={{
          exludesFields: [
            'id',
            'user_id',
            'provider_id',
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
          groupHeaderFormat: `<b>{value}</b> ({count:n0} roles)`,
          hideGroupPanel: true,
          allowPinning: "SingleColumn",
          selectionMode: "Row",
          showSearch: true,
          allowDragging: false
          // 
        }}
        onRowClick={selectedItems => handleSelected(selectedItems)}/> */}
      <GroupedTable 
        data={providerUsers}
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
        data={providerUsers}
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
  provider: makeSelectProvider(),
  organizations: makeSelectProviderOrganizations(),
  providerUsers: makeSelectProviderUsers(),
  uniqueProviderUsers: makeSelectUniqueProviderUsers(),
  providerRoles: makeSelectProviderRoles(),
  organizationsRolesByOrg: makeSelectOrganizationRolesByOrg(),
  organizationsUsersByOrg: makeSelectOrganizationUsersByOrg(),
  roleTypes: makeSelectRoleTypes(),
  currentUserRole: makeSelectCurrentUserRole(),
  selectedOrganization: makeSelectSelectedOrganization(),
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



