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
import {makeSelectOrganization,
    makeSelectOrganizationOrganizations,
    makeSelectOrganizationUsers,
    makeSelectOrganizationRoles,
    makeSelectOrganizationProviders,
    makeSelectSelectedProvider,
    makeSelectSelectedOrganization,
    makeSelectOrganizationRolesByOrg,
    makeSelectSelectedComponent
} from './selectors'
import { toggleModal, toggleAlert, toggleLoadingSpinner } from 'containers/App/actions';
import { updateTask, createNewRole, registerNewProvUser, registerNewOrgUser,
  createUserAndConnection, updateOrg, addProvider, logout, findEntityBy, 
  createNewOrganizationUserAndThenAllocateToOrganization, updatedUser,
   } from 'containers/AppData/actions';
import { setSelectedComponent } from './actions'
import Roles from 'components/Roles';
import UserManagement from './UsersManagement';
import RolesManagement from "./RolesManagement";
import Basic from 'components/Basic/Basic';
import {apiUrl} from 'containers/App/constants'
import ManagementModule from "containers/Management/ManagementModule";
import PageHeader from 'components/PageHeader/PageHeader';
import Menu from 'containers/Management/Menu'
import Layout from 'containers/Management/Layout';
import CompaniesTable from "../../../components/CompaniesTable";

const OrganizationManagementModule = ({
  currentUser,
  organization,
  providers,
  organizationUsers,
  organizationRoles,
  organizationsRolesByOrg,
  organizationsUsersByOrg,
  roleTypes,
  currentUserRole,
  selectedProvider,
  onToggleModal,
  onToggleAlert,
  onCreateNewRole,
  onAllocateUser,
  onCreateNewOrganizationUserAndOrganizationUser,
  onAllocateUserToOrg,
  onCreateUserAndConnection,
  onFindEntity,
  selectedComponent,
  onSetSelectedComponent,
  onUpdateOrganization,
  onUpdateUser,
  onToggleLoadingSpinner,
  onCreateNewOrganizationProvider,
  type = 'organization'
}) => {
  
  const menu = [
    { name: 'User Info', icon: 'user' },
    { name: 'Organization Info', icon: 'info' },
    { name: 'Providers', icon: 'briefcase' },
    { name: 'Roles', icon: 'briefcase' },
    { name: 'Users', icon: 'users' },
  ]
  const actions = {
    'Providers': [
      {
        name: `Create new provider`,
        icon: 'plus-square',
        type: 'info',
        // roles: 'isSysAdmin',
      },
    ],
    'Roles': [{ name: `Create new role`, icon: 'plus', type: 'info' }],
    'Users': [{ name: `Create new user`, icon: 'user-plus', type: 'info' }],
  };
  const [searchResults, setSearchResults] = useState()
  const handleAction = (name, value) => {
    console.log(name, value);
    let url
    switch (name) {
      case 'Update organization':
        value.general_status = 'Active';
        value.profile_image = organization.profile_image;
        onUpdateOrganization(value);
        break;
      case 'Update organization image':
        console.log(value);
        onToggleLoadingSpinner(`Updating ${organization.name} image`);
        const imageFile = value.get('file');
        // url = `profile_images/organization/${organization.id}`;
        url = 'cloud-upload';
        const newFileFullName = `org_files/${imageFile.name}`;
        // formData.append('file', file);
        value.append('bucketName', `3dbia_organization_${organization.id}`);
        value.append('fileName', newFileFullName);
        // onUpdateImage('organization', organization, value)
        let updatedOrg = { ...organization };
        axios.post(apiUrl + url, value, {}).then(res => {
          console.log(res);
          updatedOrg.profile_image = res.data.fileUrl;
          onUpdateOrganization(updatedOrg);
          onToggleLoadingSpinner();
        });
        // if (organization.profile_image) {
        //   toggleLoadingSpinner(`Updating ${organization.name} image`)
        //   axios.put(apiUrl + url, value, {
        //   }).then(res => {
        //       console.log(res)
        //       updatedOrg.profile_image = res.data.imageUrl
        //       updateOrganization(updatedOrg);
        //       toggleLoadingSpinner()
        //   })
        // } else {
        //   toggleLoadingSpinner(`Creating ${organization.name} image`)
        //   axios.post(apiUrl + url, value, {
        //   }).then(res => {
        //       console.log(res)
        //       updatedOrg.profile_image = res.data.imageUrl
        //       updateOrganization(updatedOrg);
        //       toggleLoadingSpinner()
        //   })
        // }
        break;
      case 'Update user':
        value.general_status = 'Active';
        onUpdateUser(value);
        break;
      case 'Update user image':
        onToggleLoadingSpinner(
          `Updating ${currentUser.userInfo.first_name} image`,
        );

        const file = value.get('file');
        // url = `profile_images/user/${currentUser.userInfo.id}`
        let updatedUser = { ...currentUser.userInfo };
        const fileName = `User_files/user_${updatedUser.id}/${file.name}`;
        // formData.append('file', file);
        value.append('bucketName', '3dbia_general');
        value.append('fileName', fileName);
        axios.post(apiUrl + 'cloud-upload', value, {}).then(res => {
          console.log(res);
          updatedUser.profile_image = res.data.fileUrl;
          onUpdateUser(updatedUser);
          onToggleLoadingSpinner();
        });
        break;
      case 'Create new provider':
        onToggleModal({
          title: 'Create new provider',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          data: {
            editMode: 'create',
            colWidth: 6,
          },
          formType: 'providerForm',
          confirmFunction: data => {
            onToggleAlert({
              title: `Confirm new provider`,
              body: (
                <div>
                  <div>
                    <span className="bold">Name: </span> {data.name}
                  </div>
                  {data.adminEmail && (
                    <div>
                      <span className="bold">Email: </span>{' '}
                      {data.adminEmail}
                    </div>
                  )}
                  {data.first_name && (
                    <div>
                      <span className="bold">Admin: </span>{' '}
                      {`${data.first_name} ${data.last_name}`}
                    </div>
                  )}
                  <p>
                    An activation email will be sent to {`${data.name}`}{' '}
                    administrator
                  </p>
                </div>
              ),
              confirmButton: 'Create',
              cancelButton: 'Cancel',
              // alertType: 'info',
              confirmFunction: () => {
                console.log(data);
                const fullName =
                  currentUser.userInfo.first_name +
                  ' ' +
                  currentUser.userInfo.last_name;
                data.created_by = fullName;
                data['general_status'] = 'Awaiting confirmation';

                onCreateNewOrganizationProvider(
                  data,
                  organization,
                );
              },
            });
          },
          onBlurFunction: value => {
            console.log('onBlurFunction');
            let searchResults;
            switch (value.type) {
              case 'email':
                searchResults = searchBy(
                  value.type,
                  value.value,
                  [],
                  providers,
                  organizationUsers,
                );
                console.log(searchResults);
                if (searchResults) {
                  searchResults['allocated'] = true;
                  return searchResults;
                } else {
                  findEntity('email', value.value);
                }
                break;
              case 'name':
                searchResults = searchBy(
                  value.type,
                  value.value,
                  [],
                  providers,
                  organizationUsers,
                );
                console.log(searchResults);
                if (searchResults) {
                  searchResults['allocated'] = true;
                  return searchResults;
                } else {
                  // findEntity('name', value.value);
                  // console.log('findEntityByName')
                }
                break;
              default:
                break;
            }
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
            let role = organizationRoles.find(role => role.id == data.role_id[0]);
            console.log(role);
            data['roleName'] = role.name;
            data['role_type_id'] = role.role_type_id;
            if (role.provider_id) {
              onCreateUserAndConnection(data, provider, null);
            } else if (role.organization_id) {
              // data['from_provider_id'] = provider_id
              onCreateUserAndConnection(
                data,
                null,
                organization,
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
              [organizationUsers],
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
      case 'Create new role':
        onToggleModal({
          title: `Create new role `,
          text: 'Create new role for ' + organization.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'roleForm',

          data: {
            editMode: 'Create',
            colWidth: 12,
            roleTypes: roleTypes,
          },
          confirmFunction: (data, event) => {
            console.log(data);
            const roleType = roleTypes.find(roleType => roleType.id == data.role_type_id[0])
            console.log(roleType)
            data['organization_id'] = organization.id;

            data['type'] = roleType.name;
            data['role_type_id'] = roleType.id;
            onCreateNewRole(data);
          },
        });
        break;
      default:
        break;
    }

  };

  const Component = () => {
    switch (selectedComponent) {
      case 'Organization Info':
        
        return <Basic
          item={organization}
          updateItem={data => handleAction('Update organization', data)}
          uploadImage={data => handleAction('Update organization image', data)}
          dataType="updateOrganizationForm"
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
            <Roles
              roles={[...currentUser.userOrganiztionRoles, ...currentUser.userProviderRoles ]}
              users={searchResults ? searchResults : organizationsUsersByOrg}
              type="userRoles"
              handleAction={(actionName, val) =>
                handleAction(actionName, val)
              }
            />
          </>
        )
      case 'Providers':
        return providers && providers.length ? <>
          {/* <TextSearch
              className="ml-3 mt-0 managementSearch"
              value=""
              onChange={val => handleSearch(val, providers)}
            /> */}
          <CompaniesTable
            companies={searchResults ? searchResults : providers}
            type="organization"
            // handleAction={(actionName, val) => handleAction(actionName, val)}
          />
        </> : (
          <div>There are no providers</div>
        );
        case 'Users':
          return <UserManagement />
        case 'Roles': 
          return <>
            <RolesManagement />
          </>
      default:
        return null;
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
  currentUserRole: makeSelectCurrentUserRole(),
  selectedProvider: makeSelectSelectedProvider(),
  organizationRoles: makeSelectOrganizationRoles(),
  organizationUsers: makeSelectOrganizationUsers(),
  roleTypes: makeSelectRoleTypes()
});


const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onToggleAlert: alertData => dispatch(toggleAlert(alertData)),
    onUpdateOrganization: (data) => dispatch(updateOrg(data)),
    onUpdateUser: user => dispatch(updatedUser(user)),
    onToggleLoadingSpinner: (msg) => dispatch(toggleLoadingSpinner(msg)),
    onSetSelectedComponent: componentName => dispatch(setSelectedComponent(componentName)),
    onCreateNewOrganizationProvider: (provider, organization) => dispatch(addProvider(provider, organization)),
    onCreateUserAndConnection: (newUser, provider, org) => dispatch(createUserAndConnection(newUser, provider, org)),
    onFindEntity: (type, value) => dispatch(findEntityBy(type, value)),
    onCreateNewRole: (data) => dispatch(createNewRole(data)),
    
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(OrganizationManagementModule);



