import React, { useState, useMemo, useEffect, memo } from 'react';
import PageHeader from 'components/PageHeader/PageHeader';
import Roles from 'components/Roles';
import CompaniesTable from '../../components/CompaniesTable';
import TextSearch from '../../components/TextSearch/TextSearch'
import TableRowWrapper from "components/TableRow";
import {
  getRoleById,
  getUserById,
  getProviderById,
  getOrgById,
  searchAll
} from '../../utils/dataUtils';
import Basic from 'components/Basic/Basic';
import Menu from './Menu'
import Body from './Body'
import StyledTableHeader from '../../components/StyledTableHeader';
import action from '../Process/Action';
import Layout from 'containers/Management/Layout';
import { setComponentName } from './actions';
let menuItems  = {
  provider: [
    { name: 'Roles', icon: 'briefcase' },
    { name: 'Users', icon: 'users' },
    { name: 'Users - roles', icon: 'users-cog' },
  ],
  organization: [
    { name: 'Roles' },
    { name: 'In-house users' },
    { name: 'Providers' },
    { name: 'Providers users' },
  ],
  generalOrg: [
    { name: 'User Info' },
    { name: 'Organization Info', roleTypes: [2, 3]},
    { name: 'Providers', roleTypes: [2, 3] },

  ],
  generalProvider: [
    { name: 'User Info' },
    { name: 'Provider Info', roleTypes: [2, 3] },
    { name: 'Organizations', roleTypes: [2, 3] },

  ]
};
const ManagementModule = ({
  handleAction,
  currentUser,
  currentUserRole,
  users,
  roles,
  providers,
  company,
  organizations,
  organizationUsers,
  organizationsRoles,
  providersRoles,
  type,
  title,
}) => {
  const menu = useMemo(() => menuItems[type], type)
  const [selectedComponent, setSelectedComponent] = useState(menu[0].name);
  // useEffect(() => {
  //   console.log('SETTING UP SELECTED COMPONENT')
  //   setSelectedComponent(menuItems[type][0].name)

  // }, [type])
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
  let allRoles = [];
  console.log('organizationsRoles', organizationsRoles)
  if (type === 'provider') allRoles = [...roles, ...organizationsRoles];
  if (type === 'organization') allRoles = roles;

  const handleChecked = (userRole) => {
    // console.log(userRole)
  }
  const SelectedComponent = () => {
    const [searchResults, setSearchResults] = useState()
    
    useEffect(() => {
      setSearchResults(null)
      return () => {
        setSearchResults(null)
      }
    }, [selectedComponent])

  
  const handleSearch = (val, data) => {
      if (val == '') {
        setSearchResults(null)
      } else {
        setSearchResults(searchAll(val, data))
      }
    }
    switch (selectedComponent) {
      case 'Roles': 
        if (allRoles && allRoles.length) return <>
          
          {/* <TextSearch
            className="ml-3 mt-0 managementSearch"
            value=""
            onChange={val => handleSearch(val, allRoles)}
          /> */}
          <Roles
            roles={searchResults ? searchResults : allRoles}
            type="roles"
            handleAction={(actionName, val) =>
              handleAction(actionName, val)
            }
          />
        </>
        else return <div>There are no Organization roles</div>

      case 'Organization-roles':

        return organizationsRoles && organizationsRoles.length ? (
          <>
            {/* <TextSearch
              className="ml-3 mt-0 managementSearch"
              value=""
              onChange={val => handleSearch(val, organizationsRoles)}
            /> */}
            <Roles
              roles={searchResults ? searchResults : organizationsRoles}
              type="roles"
              handleAction={(actionName, val) =>
                handleAction(actionName, val)
              }
            />
          </>
        ) : (
          <div>There are no Organization roles</div>
        );
      case 'Provider roles':
        return providersRoles && providersRoles.length ? <>
          {/* <TextSearch
              className="ml-3 mt-0 managementSearch"
              value=""
              onChange={val => handleSearch(val, providersRoles)}
            /> */}
          <Roles
            roles={searchResults ? searchResults : providersRoles}
            type="roles"
            handleAction={(actionName, val) => handleAction(actionName, val)}
          />
        </> : (
          <div>There are no Provider roles</div>
        );

      case 'In-house users':
        let inhouseUsers = users.filter(user => user.from_provider_id == null);
        // inhouseUsers.map(user => {

        // })
        return inhouseUsers && inhouseUsers.length ? <>
          {/* <TextSearch
              className="ml-3 mt-0 managementSearch"
              value=""
              onChange={val => handleSearch(val, inhouseUsers)}
            /> */}
          <Roles
            roles={roles}
            users={searchResults ? searchResults : inhouseUsers}
            type="inhouseUsers"
            handleAction={(actionName, val) => handleAction(actionName, val)}
          />
        </> : (
          <div>There are no in house users</div>
        );
      case 'Users':
        if (users.length) {
          return (
            <>
              {/* <TextSearch
                className="ml-3 mt-0 managementSearch"
                value=""
                onChange={val => handleSearch(val, users)}
              /> */}
              <Roles
                roles={allRoles}
                users={searchResults ? searchResults : users}
                type={type === 'provider' ? 'users' : 'providerUsers'}
                handleAction={(actionName, val) =>
                  handleAction(actionName, val)
                }
                handleChecked={userRole => handleChecked(userRole)}
              />
            </>
          );
        } else {
          return <div>There are no user allocated</div>
        }

      case 'Providers users':
 
        let providerUsers = users.filter(
          user => user.from_provider_id !== null,
        );
        
        if (providerUsers.length) {
          providerUsers.map(user => {
            if (user.from_provider_id) {
              const provider = getProviderById(user.from_provider_id, providers);
              user['companyName'] = provider.name;

            } 
          });
          return <>
            {/* <TextSearch
              className="ml-3 mt-0 managementSearch"
              value=""
              onChange={val => handleSearch(val, providerUsers)}
            /> */}
            <Roles
                // roles={providerUsers}
                users={searchResults ? searchResults : providerUsers}
                type="providerUsers"
                handleAction={(actionName, val) => handleAction(actionName, val)}
              />
          </>
        } else {
          return <div>There are no user allocated</div>
        }
      case 'Users - roles':
        const organizationUsersRoleIds = organizationUsers.map(user => user.role_id)
        const inhouseProviderUsers = users.filter(user => !organizationUsersRoleIds.includes(user.role_id))
        let allUsersRoles = [...organizationUsers, ...inhouseProviderUsers]
        // console.log(allUsersRoles)
        if (allUsersRoles.length) {
          allUsersRoles.map(user => {
            if (user.organization_id && organizations && organizations.length) {
              const org = getOrgById(user.organization_id, organizations);
           
              user['companyName'] = org.name;
            } else user['companyName'] = 'In-House'
          });
          return <>
            {/* <TextSearch
              className="ml-3 mt-0 managementSearch"
              value=""
              onChange={val => handleSearch(val, allUsersRoles)}
            /> */}
            <Roles
              roles={allRoles}
              users={searchResults ? searchResults : allUsersRoles}
              type="organizationUsers"
              handleAction={(actionName, val) => handleAction(actionName, val)}
              handleChecked={(userRole) => handleChecked(userRole)}
            />  
          </>          
        } else return <div>There are no user allocated</div>;
        
      case 'Organization-users':
        console.log('organizationUsers', organizationUsers);
        console.log('organizations', organizations);
        if (organizationUsers.length) {
          organizationUsers.map(user => {
            // console.log(user)
            if (organizations && organizations.length) {
              const org = getOrgById(user.organization_id, organizations);
              // console.log(org);
              user['companyName'] = org.name;
            }
          });
          // // console.log(organizationUsers)
          return <>
            {/* <TextSearch
              className="ml-3 mt-0 managementSearch"
              value=""
              onChange={val => handleSearch(val, organizationUsers)}
            /> */}
          <Roles
            roles={roles}
            users={searchResults ? searchResults : organizationUsers}
            type="organizationUsers"
            handleAction={(actionName, val) => handleAction(actionName, val)}
          />  
          </>          
        } else return <div>There are no user allocated</div>;

      case 'Providers':
        // console.log(providers)
        return providers && providers.length ? <>
          {/* <TextSearch
              className="ml-3 mt-0 managementSearch"
              value=""
              onChange={val => handleSearch(val, providers)}
            /> */}
          <CompaniesTable
            companies={searchResults ? searchResults : providers}
            type="providers"
            // handleAction={(actionName, val) => handleAction(actionName, val)}
          />
        </> : (
          <div>There are no providers</div>
        );
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
      case 'Provider Info':
        
        return <Basic
          item={company}
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
              roles={[...currentUser.userOrganiztionRoles, ...currentUser.userProviderRoles ]}
              users={searchResults ? searchResults : organizationUsers}
              type="userRoles"
              handleAction={(actionName, val) =>
                handleAction(actionName, val)
              }
            />
          </>
        );
      case 'Organization Info':
        return (
          <Basic
            item={company}
            updateItem={data => handleAction('Update organization', data)}
            uploadImage={data => handleAction('Update organization image', data)}
            dataType="updateOrganizationForm"
            // url={`profile_images/organization/${company.id}`}
          />
        );
      default:
        return  <div>No menu item selected</div>
    }
  };
  console.log('selectedComponent', selectedComponent)
   return (
    <Layout
      bodyTitle={selectedComponent}
      menuTitle="Menu"
      menu={
        <Menu
          menu={menu}
          handleClick={item => setSelectedComponent(item)}
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
      component={<SelectedComponent />}
    />

    // <div className="row">
    //   <div className="col-2 border-right border-dark text-left ">
    //     {menuItems[type].map(item => {

    //       if (item.roleTypes) {
    //         if (item.roleTypes.includes(currentUserRole.role_type_id)) {
    //           return (
    //             <h6
    //               key={item.name}
    //               className={`py-3 pl-3 ${
    //                 selectedComponent === item.name
    //                   ? 'active border-bottom-turkize'
    //                   : 'faded border-bottom border-light'
    //               }`}
    //               onClick={() => {
    //                 localStorage.setItem('selectedComponent', item.name);
    //                 setSelectedComponent(item.name);
    //               }}
    //             >
    //               {item.name}
    //             </h6>
    //             )
    //           }

    //       } else return (
    //         <h6
    //           key={item.name}
    //           className={`py-3 pl-3 ${
    //             selectedComponent === item.name
    //               ? 'active border-bottom-turkize'
    //               : 'faded border-bottom border-light'
    //           }`}
    //           onClick={() => {
    //             localStorage.setItem('selectedComponent', item.name);
    //             setSelectedComponent(item.name);
    //           }}
    //         >
    //           {item.name}
    //         </h6>
    //       )
    //     })}
    //   </div>
    //   <div className="col-10">
    //     <PageHeader
    //       text={selectedComponent}
    //       className="row text-center py-1"
    //       iconColor="black"
    //       actions={actions[selectedComponent]}
    //       handleAction={(actionName, val) => handleAction(actionName, val)}
    //     />
    //     <SelectedComponent componentName={selectedComponent} />
    //   </div>
    // </div>
  );
};

export default memo(ManagementModule);
