import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { addOrganizationToRoles, getOrgById, getRoleById, searchBy, sortBy } from 'utils/dataUtils'
import { makeSelectLoading, makeSelectError, makeSelectCurrentUser,
  makeSelectRoleTypes, makeSelectCurrentUserRole, makeSelectShowChat,
  makeSelectMenuItem
} from 'containers/App/selectors';
import axios from 'axios';
import {makeSelectProvider,
    makeSelectProviderOrganizations,
    makeSelectProviderUsers,
    makeSelectProviderRoles,
    makeSelectOrganizationUsers,
    makeSelectOrganizationUsersByOrg,
    makeSelectSelectedOrganization,
    makeSelectOrganizationRolesByOrg,
    makeSelectSelectedComponent
} from './selectors'
import { toggleModal, toggleAlert, toggleLoadingSpinner } from 'containers/App/actions';
import { updateTask, createNewRole, createUserAndConnection, registerNewOrgUser,
  allocateUserToOrg, updateProvider, getProviderbyId, logout, findEntityBy, 
  createNewProviderUserAndThenAllocateToOrganization, updatedUser,
   } from 'containers/AppData/actions';
import { setSelectedComponent } from './actions'
import Roles from 'components/Roles';
import Basic from 'components/Basic/Basic';
import ManagementModule from "containers/Management/ManagementModule";
import PageHeader from 'components/PageHeader/PageHeader';
import Menu from 'containers/Management/Menu'
import Layout from 'containers/Management/Layout';
import UserManagementModule from 'containers/UserManagementModule/UserManagementModule'
import UserManagement from './UsersManagement';
import RolesManagement from './RolesManagement';
import CompaniesTable from "../../../components/CompaniesTable";
import {apiUrl} from 'containers/App/constants';

const ProviderManagementModule = ({
  currentUser,
  provider,
  organizations,
  providerUsers,
  providerRoles,
  organizationsRolesByOrg,
  organizationsUsersByOrg,
  roleTypes,
  currentUserRole,
  selectedOrganization,
  onToggleModal,
  onToggleAlert,
  onCreateNewProviderUser,
  onAllocateUser,
  onCreateNewOrganizationUser,
  onCreateNewProviderUserAndOrganizationUser,
  onAllocateUserToOrg,
  onCreateNewRole,
  onCreateUserAndConnection,
  onFindEntity,
  selectedComponent,
  onSetSelectedComponent,
  onUpdateProvider,
  onUpdateUser,
  onToggleLoadingSpinner,
  type = 'provider'
}) => {
  
  const menu = [
    { name: 'User Info', icon: 'user' },
    { name: 'Provider Info', icon: 'info' },
    { name: 'Organizations', icon: 'briefcase' },
    { name: 'Roles', icon: 'briefcase' },
    { name: 'Users', icon: 'users' },
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
    let url
    switch (name) {
      case 'Update provider':
        console.log(value)
        console.log(provider)
        value.general_status = 'Active';
        value.profile_image = provider.profile_image
        onUpdateProvider(value)
        break;
      case 'Update provider image':
        // console.log(value)
        console.log(value)
        toggleLoadingSpinner(`Updating ${provider.name} image`)
        const imageFile = value.get('file')
        // url = `profile_images/provider/${provider.id}`;
        url = 'cloud-upload'
        const newFileFullName = `Provider_files/provider_${provider.id}/images/${imageFile.name}`
        // formData.append('file', file);
        value.append('bucketName', `3dbia_general`)
        value.append('fileName', newFileFullName)
        // onUpdateImage('provider', provider, value)
        let updatedProv = {...provider}
        axios.post(apiUrl + url, value, {
        }).then(res => {
            console.log(res)
            updatedProv.profile_image = res.data.fileUrl
            onUpdateProvider(updatedProv);
            toggleLoadingSpinner()
        })
        break
      case 'Update user':
        console.log(value)
        value.general_status = 'Active';
        value.profile_image = currentUser.userInfo.profile_image
        onUpdateUser(value)
        break;
      case 'Update user image':
        // console.log(value)
         toggleLoadingSpinner(`Updating ${currentUser.userInfo.first_name} image`)
        
        const file = value.get('file')
        // url = `profile_images/user/${currentUser.userInfo.id}`
        let updatedUser = {...currentUser.userInfo}
        const fileName = `User_files/user_${updatedUser.id}/images/${file.name}`
        // formData.append('file', file);
        value.append('bucketName', '3dbia_general')
        value.append('fileName', fileName)
        axios.post(apiUrl + 'cloud-upload', value, {})
          .then(res => {
              console.log(res)
              updatedUser.profile_image = res.data.fileUrl
              onUpdateUser(updatedUser)
              toggleLoadingSpinner()
          })
        break;
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
                role => role.id == data.role_id[0],
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
              console.log(organizationsUsersByOrg);
              console.log(providerUsers);
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
    switch (selectedComponent) {
      case 'Provider Info':
        
        return <Basic
          item={provider}
          updateItem={data => handleAction('Update provider', data)}
          uploadImage={data => handleAction('Update provider image', data)}
          dataType="updateProviderForm"
        />
      case 'User Info':
        return (
          <>
            <Basic
              item={currentUser.userInfo}
              updateItem={data => handleAction('Update user', data)}
              uploadImage={data => handleAction('Update user image', data)}
              dataType="userForm"
              />
            <br/>
            <br/>
            <Roles
              roles={currentUser.userProviderRoles}
              users={searchResults ? searchResults : organizationsUsersByOrg}
              type="userRoles"
              handleAction={(actionName, val) =>
                handleAction(actionName, val)
              }
            />
          </>
        )
      case 'Organizations':
        return organizations && organizations.length ? <>
          {/* <TextSearch
              className="ml-3 mt-0 managementSearch"
              value=""
              onChange={val => handleSearch(val, organizations)}
            /> */}
          <CompaniesTable
            companies={searchResults ? searchResults : organizations}
            type="organization"
            // handleAction={(actionName, val) => handleAction(actionName, val)}
          />
        </> : (
          <div>There are no providers</div>
        );
      case 'Roles': 
        return (
          <>
            <RolesManagement />
          </>
        );
      case 'Users':
        return <UserManagement />
        // return <UserManagementModule users={providerUsers}/>
      default:
        return null;
    }

  }
  return (
    // <ManagementModule
    //   handleAction={(actionName, value) => handleAction(actionName, value)}
    //   users={providerUsers}
    //   roles={providerRoles}
    //   company={provider}
    //   organizations={organizations}
    //   organizationsRoles={organizationsRolesByOrg}
    //   organizationsUsers={organizationsUsersByOrg}
    //   type="provider"
    //   //  title="Manage user and roles"
    //   currentUser={currentUser}
    //   currentUserRole={currentUserRole}
    // />
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
  provider: makeSelectProvider(),
  organizations: makeSelectProviderOrganizations(),
  currentUserRole: makeSelectCurrentUserRole(),
  selectedOrganization: makeSelectSelectedOrganization(),
  providerRoles: makeSelectProviderRoles(),
  organizationsRolesByOrg: makeSelectOrganizationRolesByOrg(),
  providerUsers: makeSelectProviderUsers(),
  roleTypes: makeSelectRoleTypes(),
  organizationsUsersByOrg: makeSelectOrganizationUsersByOrg(),
});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onUpdateProvider: (data, id) => dispatch(updateProvider(data,id)),
    onUpdateUser: user => dispatch(updatedUser(user)),
    onToggleLoadingSpinner: (msg) => dispatch(toggleLoadingSpinner(msg)),
    onSetSelectedComponent: componentName => dispatch(setSelectedComponent(componentName)),
    onCreateNewRole: (data) => dispatch(createNewRole(data)),
    onFindEntity: (type, value) => dispatch(findEntityBy(type, value)),
    onCreateUserAndConnection: (newUser, provider, org) => dispatch(createUserAndConnection(newUser, provider, org)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(ProviderManagementModule);



