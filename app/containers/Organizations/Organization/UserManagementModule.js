import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { ExportService } from 'containers/Wijmo/export';
import { addOrganizationToRoles, getOrgById, getRoleById, searchBy, sortBy } from 'utils/dataUtils'
import { makeSelectLoading, makeSelectError, makeSelectCurrentUser,
  makeSelectRoleTypes, makeSelectCurrentUserRole, makeSelectShowChat,
  makeSelectMenuItem
} from 'containers/App/selectors';
import UserManagement from './UsersManagement';
import {
    makeSelectOrganizationProviders,
    makeSelectUniqueOrganizationUsers,
    makeSelectProvidersRoles,
    makeSelectOrganizationRoles,
    makeSelectOrganizationUsers,
    makeSelectSelectedComponent,
    makeSelectOrganization
} from './selectors'
import { toggleModal, toggleAlert, onToggleLoadingSpinner } from 'containers/App/actions';
import { updateTask, createNewRole, registerNewProvUser, createUserAndConnection,
  allocateUserToOrg, updateProvider, getProviderbyId, logout, findEntityBy, 
  createNewProviderUserAndThenAllocateToOrganization, updatedUser, addProvider
   } from 'containers/AppData/actions';
import { setSelectedComponent } from './actions'
import Roles from 'components/Roles';
import MyWijmoCheckBoxTable from 'containers/MyTables/MyWijmoCheckBoxTable';
import PageHeader from 'components/PageHeader/PageHeader';
import Menu from 'containers/Management/Menu'
import Layout from 'containers/Management/Layout';
import RolesManagement from "./RolesManagement";

const UserManagementModule = ({
  currentUser,
  organization,
  providers,
  organizationUsers,
  uniqueProviderUsers,
  providersRoles,
  organizationRoles,
  roleTypes,
  currentUserRole,
  onToggleModal,
  onCreateNewRole,
  onToggleAlert,
  onAllocateUser,
  onCreateUserAndConnection,
  // onCreateNewProviderUserAndOrganizationUser,
  onAllocateUserToOrg,
  onFindEntity,
  selectedComponent,
  onSetSelectedComponent,
  onToggleLoadingSpinner,
  // type = 'organization'
}) => {

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
        name: `Create new organization`,
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

  const handleAction = (name, value) => {
    console.log(name, value);
    let url;
    switch (name) {
      case 'Create new role':
        onToggleModal({
          title: `Create new role `,
          text: 'Create new role for ' + organization.name,
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
            data['organization_id'] = organization.id;

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
            roles: organizationRoles,
          },
          formType: 'registerUserForm',
          confirmFunction: data => {
            console.log(data);
            console.log(organizationRoles);
            let role = organizationRoles.find(
              role => role.id == data.role_id[0],
            );
            console.log(role);
            data['roleName'] = role.name;
            data.role_id = data.role_id[0];
            onCreateUserAndConnection(data, null, organization);
          },
          onBlurFunction: value => {
            // console.log(value);
            // const searchResults = searchBy(
            //   'email',
            //   value.value,
            //   [],
            //   [],
            //   [...organizationsUsersByOrg, ...providerUsers],
            // );
            // console.log(searchResults);
            // if (searchResults) {
            //   searchResults['allocated'] = true;
            //   return searchResults;
            // } else {
            //   onFindEntity('email', value.value);
            // }
          },
        });
        break;
      default:
        break;
    }
  };
  const Component = () => {
    switch (selectedComponent) {
      case 'Users':
        return <UserManagement />
      case 'Roles': 
        return <>
          <RolesManagement />
        </>
      
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
        className="color-white"
        iconColor="colorPrimary"
        actions={actions[selectedComponent]}
        handleAction={(actionName, val) => handleAction(actionName, val)}
      />
    }
    component={<Component />}
  />
  );
};

const mapStateToProps = createStructuredSelector({
  selectedComponent: makeSelectSelectedComponent(),
  currentUser: makeSelectCurrentUser(),
  organization: makeSelectOrganization(),
  providers: makeSelectOrganizationProviders(),
  // uniqueProviderUsers: makeSelectUniqueOrganizationUsers(),
  // organizationUsers: makeSelectOrganizationUsers(),
  organizationRoles: makeSelectOrganizationRoles(),
  // providersRoles: makeSelectProvidersRoles(),
  roleTypes: makeSelectRoleTypes(),
  currentUserRole: makeSelectCurrentUserRole(),

//   roleTypes: makeSelectRoleTypes()
});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onCreateNewRole: (data) => dispatch(createNewRole(data)),
    onCreateNewProviderUser: (newUser, organization, org) => dispatch(registerNewProvUser(newUser, organization, org)),
    onCreateUserAndConnection: (newUser, provider, org) => dispatch(createUserAndConnection(newUser, provider, org)),
    onAllocateUser: (newProviderUser) => dispatch(actions.allocateUser(newProviderUser)),
    // onCreateNewOrganizationUser: (newUser, organization) => dispatch(registerNewOrgUser(newUser, organization)),
    // onCreateNewProviderUserAndOrganizationUser: (newUser, organization, organization) => dispatch(createNewProviderUserAndThenAllocateToOrganization(newUser, organization, organization)),
    onAllocateUserToOrg: (user, org, role_id, roleName, remarks, provider_id) => dispatch(allocateUserToOrg({user, org, role_id, roleName, remarks, provider_id})),
    onFindEntity: (type, value) => dispatch(findEntityBy(type, value)),
    onToggleLoadingSpinner: (msg) => dispatch(toggleLoadingSpinner(msg)),
    onSetSelectedComponent: componentName => dispatch(setSelectedComponent(componentName)),
    
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



