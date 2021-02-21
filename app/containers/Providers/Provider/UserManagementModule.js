import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getRolesByUserId, getAvailableRolesByUserId, getOrgById, getRoleById, searchBy, sortBy } from 'utils/dataUtils'
import { makeSelectLoading, makeSelectError, makeSelectCurrentUser,
  makeSelectRoleTypes, makeSelectCurrentUserRole, makeSelectShowChat,
  makeSelectMenuItem, makeSelectGeneralUserStatuses
} from 'containers/App/selectors';
import { ExportService } from 'containers/Wijmo/export';
import {makeSelectProvider,
    makeSelectProviderOrganizations,
    
    makeSelectProviderRoles,
    
    makeSelectSelectedOrganization,
    makeSelectOrganizationRolesByOrg,
    makeSelectSelectedComponent,

} from './selectors'
import { toggleModal, toggleAlert, toggleLoadingSpinner } from 'containers/App/actions';
import { updateTask, createNewRole, createUserAndConnection, updateUserConnection, registerNewOrgUser,
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
import UserManagement from './UsersManagement';
import RolesManagement from './RolesManagement';
import MyWijmoCheckBoxTable from 'containers/MyTables/MyWijmoCheckBoxTable';
import MyWijmoDetailedTable from 'containers/MyTables/MyWijmoDetailedTable';
// import SimpleTable from 'containers/MyTables/SimpleTable';
import styled from "styled-components";

const UserManagementModule = ({
  currentUser,
  provider,
  organizations,
  providerRoles,
  organizationsRolesByOrg,
  
  roleTypes,
  currentUserRole,
  selectedOrganization,
  onToggleModal,
  onCreateNewRole,
  onToggleAlert,
  onCreateUserAndConnection,
  onAllocateUser,

  onCreateNewProviderUserAndOrganizationUser,
  onAllocateUserToOrg,
  onFindEntity,
  selectedComponent,
  onSetSelectedComponent,
  onToggleLoadingSpinner,
  onUpdateUserConnection
}) => {
  const [showActions, setshowActions] = useState(false)
  const menu = [
    { name: 'Roles', icon: 'briefcase' },
    { name: 'Users', icon: 'users' },
    // { name: 'Users - roles', icon: 'users-cog' },
  ]
  const actions = {
    'Roles': [{ name: `Create new role`, icon: 'plus', type: 'info' }],
    'In-house users': [
      { name: `Create new user`, icon: 'user-plus', type: 'info' },
    ],
    'Users': [
      { name: `Create new user`, icon: 'user-plus', type: 'info' },
    ],
    'Providers': [
      {
        name: `Create new provider`,
        icon: 'plus-square',
        type: 'info',
        roles: 'isSysAdmin',
      },
    ],
    'Organizations': [
      {
        name: `Allocate user to organization role`,
        icon: 'plus-square',
        type: 'info',
        roles: 'isSysAdmin',
      },
    ],
    'Providers-users': [
      {
        name: `Allocate user to organization`,
        icon: 'plus-circle',
        type: 'info',
        roles: 'isSysAdmin',
      },
    ],
    'Organization-users': [
      {
        name: `Allocate users to role`,
        icon: 'plus-circle',
        type: 'info',
        roles: '',
      },
    ],
    'Users - roles': [
      // {
      //   name: `Allocate users to role`,
      //   icon: 'plus-circle',
      //   type: 'info',
      //   roles: '',
      // },
    ],
  };
  
  const [searchResults, setSearchResults] = useState()

  const handleAction = (name, value) => {
    console.log(name, value);
    let url;
    switch (name) {
      case 'Create new role':
        onToggleModal({
          title: `Create new role `,
          text: 'Create new role for ' + provider.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'generalRoleForm',

          data: {
            editMode: 'Create',
            colWidth: 12,
            roleTypes: roleTypes,
          },
          confirmFunction: (data, event) => {
            console.log(data);
            data['provider_id'] = provider.id;

            data['type'] = 'General';
            data['role_type_id'] = 13;
            onCreateNewRole(data);
          },
        });
        break;
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
            let role = [...providerRoles, ...organizationsRolesByOrg].find(
              role => role.id === data.role_id,
            );
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
      default:
        break;
    }
  };

  
  const Component = () => {



    let allRoles = [...providerRoles, ...organizationsRolesByOrg];
    console.log('selectedComponent', selectedComponent)
    switch (selectedComponent) {
      case 'Roles': 
        return (
          <>
            <RolesManagement />
          </>
        );
      case 'Users':
      return <UserManagement />
      
      default:
        return  <div>No menu item selected</div>
    }

  }
  return (
    <Layout
    bodyTitle={selectedComponent}
    menuTitle="Menu"
    menu={
      <Menu
        menu={menu}
        handleClick={item => onSetSelectedComponent(item)}
        selected={selectedComponent}
      />
    }
    headerComponent={
      <PageHeader
        text={selectedComponent}
        hideSearch={true}
        className="color-white"
        iconColor="colorPrimary"
        actions={actions[selectedComponent]}
        handleAction={(actionName, val) => handleAction(actionName, val)}
      />
    }
    component={useMemo(() => <Component />, selectedComponent)}
  />
  );
};

const mapStateToProps = createStructuredSelector({
  selectedComponent: makeSelectSelectedComponent(),
  currentUser: makeSelectCurrentUser(),
  provider: makeSelectProvider(),
  organizations: makeSelectProviderOrganizations(),
  providerRoles: makeSelectProviderRoles(),
  organizationsRolesByOrg: makeSelectOrganizationRolesByOrg(),

  roleTypes: makeSelectRoleTypes(),
  currentUserRole: makeSelectCurrentUserRole(),
  selectedOrganization: makeSelectSelectedOrganization(),

//   roleTypes: makeSelectRoleTypes()
});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onCreateNewRole: (data) => dispatch(createNewRole(data)),
    onCreateUserAndConnection: (newUser, provider, org) => dispatch(createUserAndConnection(newUser, provider, org)),
    onUpdateUserConnection: (users) => dispatch(updateUserConnection(users)),
    onAllocateUser: (newProviderUser) => dispatch(actions.allocateUser(newProviderUser)),
    onCreateNewProviderUserAndOrganizationUser: (newUser, organization, provider) => dispatch(createNewProviderUserAndThenAllocateToOrganization(newUser, organization, provider)),
    onAllocateUserToOrg: (user, org, role_id, roleName, remarks, provider_id) => dispatch(allocateUserToOrg({user, org, role_id, roleName, remarks, provider_id})),
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
)(UserManagementModule);



