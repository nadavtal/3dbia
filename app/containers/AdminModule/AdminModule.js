import React, {useState, memo, useEffect, useMemo} from "react";
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, makeSelectError, makeSelectUsers, makeSelectCurrentUser,
  makeSelectOrganizations, makeSelectProviders, makeSelectProjects,  makeSelectRoles,
  makeSelectRoleTypes, makeSelectprocessTemplatesTasks,makeSelectProcesses, makeSelectTasks,
  makeSelectNewOrg, makeSelectOrganizationsAllUsers, makeSelectProvidersUsers, makeSelectOrganizationProviders,
  getCurrentUserFullName
  } from '../App/selectors';
import { updateProvider,
  addOrganization,
  updateOrg,
  addProvider,
  getAllData,
  allocateUserToOrg,
  allocateUserToProv,
  createNewRole,
  // allocateUser,
  createRoleType,
  // allocateProviderToOrg,
  registerNewOrgUser,
  registerNewProvUser,
  findEntityBy,
  createUserAndConnection,
  createUserConnection,
  updateUserConnection
  } from 'containers/AppData/actions';
import { menus } from '../../menu-templates';
import PopperMenu from '../../components/PopperMenu/PopperMenu';
import TableFilters from '../TableFilters/TableFilters';
import { CSSTransition } from 'react-transition-group';
import Status from 'components/Status';
import Processes from '../Processes/Processes';
import Calender from '../Calender/Calender';
import AccordionTable from '../AccordionTable/AccordionTable';
import IconButtonToolTip from '../../components/IconButtonToolTip/IconButtonToolTip';
import DataTable from '../../components/DataTable/DataTable';
import { convertToMySqlDateFormat } from 'utils/dateTimeUtils';
import { updateTask, getOrganizationbyId, getUser, getProviderOrganizations } from '../AppData/actions';
import ManagementSection from "containers/Management/ManagementSection";
import TextSearch from '../../components/TextSearch/TextSearch'
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import Form from '../Forms/Form';
import Select from '../../components/Select/Select'
import * as actions from './actions';
import Projects from '../Projects/Projects';
import UserRow from '../../components/UserRow/UserRow';
import CompanyRow from '../../components/CompanyRow';
import SideMenu from '../../components/SideMenu/SideMenu';
import TableHeader from '../../components/TableHeader';
import DateField from '../../components/DateField/DateField';
import {  MDBTabPane,
  MDBTabContent,
  MDBPopover,
  MDBPopoverHeader,
  MDBPopoverBody,
  MDBBtn,
  MDBIcon,
  MDBAlert,
  MDBBreadcrumb,
  MDBBreadcrumbItem,  
  } from "mdbreact";
import ToolBar from '../../components/ToolBar/ToolBar';
import Extended from '../../components/Extended/Extended';
import Basic from '../../components/Basic/Basic';
import Providers from '../Providers/Providers'
import UsersPage from '../Users/index';
import RolesDropDown from '../../components/RolesDropDown/RolesDropDown';
import * as utils from "utils/dataUtils";
import { toggleModal, toggleAlert } from '../App/actions';
import { getProviderbyId, logout } from '../AppData/actions';
import { createNewProject } from '../Projects/actions';
import styled from 'styled-components';

import reducer from './reducer';
import saga from './saga';
import { selectOrganization } from "../Organizations/Organization/selectors";
import TableRowWrapper from "../../components/TableRow";
// import DataBase from "../Tasks copy";
import DataBaseModule from "containers/DataBaseModule/DataBaseModule";
// import { selectOrganization } from "../../Organizations/Organization/selectors";
const key = "admin";
const menu = menus['admin'];
const AdminModule = (props) => {
  
  // localStorage.removeItem('currentUser')
  useInjectSaga({ key, saga });
  useInjectReducer({ key, reducer });
  const [activeItemClassicTabs3, setActiveItemClassicTabs3] = useState('Organizations');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedOrganization, setSelectedOrganization] = useState(null);
  const [selectedProvider, setSelectedProvider] = useState(null);

  useEffect(() => {
    props.getAllData()
  }, []);
  useEffect(() => {
    
    // createUserRoles()
  }, [props.organizations]);
  useEffect(() => {
    
    if (props.newOrg) {
      // handleNewOrganization(props.newOrg)
      
    }
  }, [props.newOrg]);

  console.log('AdminModuleProps', props)
  const createUserRoles = () => {
    console.log('createUserRoles')
    let userRoles = []
    props.users.forEach(user => {
      // console.log(user)
      console.log(getAllRolesByUser(user))
      
    });
  }
  // const userRoles = useMemo(() => createUserRoles(), props.users, props.organizationsUsers, props.providersUsers);
  // console.log(userRoles)
  const toggleClassicTabs3 = (tab) => {
    console.log(activeItemClassicTabs3, tab)
    if (activeItemClassicTabs3 !== tab) {
    setActiveItemClassicTabs3(tab)
    localStorage.setItem('activeItemClassicTabs3', tab)
    }
  }

  const getAllRolesByUser = (user) => {
    let roles = []
    const orgRoles = props.organizationsUsers.filter(orgUser => orgUser.user_id === user.id);
    roles = [...orgRoles]
    const providerRoles = props.providersUsers.filter(providerUser => providerUser.user_id === user.id);
    roles = [...orgRoles, ...providerRoles]
    return roles
  }
  const handleNewOrganization = newOrg => {
    console.log('newOrg', newOrg)
    if(newOrg.users && newOrg.users.length) {
        
      props.onToggleModal({
        title: 'A user has been found with this email adrress',
        text: `Do you want to allocate ${newOrg.users[0].first_name} ${newOrg.users[0].last_name} 
          to ${newOrg.org.name} admin?`,
        confirmButton: 'Allocate',
        cancelButton: 'Cancel',
        
        confirmFunction: () => props.createUserConnection(newOrg.users[0], newOrg.org, 2, "Organization admin")
      })
    } else {
        props.onToggleModal({
          title: 'No user has been found with this email adrress',
          text: `Create a new user for ${newOrg.org.name} admin?`,
          
          formType: 'registerUserForm',
          data: {
            editMode: 'create',
            colWidth: 12,
            
          },
          cancelButton: 'Cancel',
          
          confirmFunction: (data) => {
            data['role_id'] = 2
            props.createNewOrganizationUser(data, newOrg.org)
          }
        })
    }
  }

  const createProject = (data) => {
    data.organization_id = props.match.params.id;
    props.onCreateNewProject(data)
  }

  const linkToOrgPage = (id) => {
    console.log(props.history)
    props.history.push("../organizations/"+id);
  }

  // const allocateUsers = (data) => {
  //   console.log(data, props.provider.id)
  //   const newProviderUser = {
  //     user_id: data.user_id,
  //     provider_id: props.provider.id,
  //     remarks: data.remarks,
  //     status: 'active'
  //   }
  //   console.log(newProviderUser)
  //   props.onAllocateUser(newProviderUser)
  // }

  const changeTaskPercentage = (task, value) => {
    console.log('changeTaskPercentage',  value)
    if(value) {
      task.completed = parseInt(value);
      task.due_date = convertToMySqlDateFormat(task.due_date);
      task.last_update = convertToMySqlDateFormat(new Date)
      // console.log(task.due_date)
      // console.log(convertToMySqlDateFormat(task.due_date))
      // updateTask.due_date = convertToMySqlDateFormat(updateTask.due_date)
      // updateTask.last_update = convertToMySqlDateFormat(new Date)

      // console.log(task);
      props.onUpdateTask(task)

    }

  }
  const changeTaskDate = (task, value) => {
    console.log('changeTaskDate', value)
    if(value) {

      task.due_date = convertToMySqlDateFormat(value);
      task.last_update = convertToMySqlDateFormat(new Date)

      console.log(task);
      props.onUpdateTask(task)
    }

  }

  const toggleModal = (modalType) => {
    switch (modalType) {
      case 'allocateUsers':
        props.onToggleModal({
          title: 'Add User',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'allocateUserForm',
          users: props.users,
          // options: {
          //   buttonText: 'Add users',
          //   options: [props.users],
          // },
          confirmFunction: (data) => console.log(data)
        });
        break
    }

  }
  const toggleAlert = (alertType) => {

    switch (alertType) {
      case 'delete':
        props.onToggleAlert({
          title: 'Are you sure',
          text: 'blah blah blah blah',
          confirmButton: 'Delete',
          cancelButton: 'Cancel',
          
          confirmFunction: () => console.log('delete')
        });
        break
    
    }

  }
  const linkToBridgePage = (bridgeId, orgId) => {
    // console.log(orgId, bridgeId)
    console.log(props.history)
    props.history.push('../organizations/' + orgId + "/bridges/"+bridgeId);
  }
  const linkToProviderPage = (provider_id) => {
    console.log(provider_id)
    console.log(props.history)
    props.history.push('./'+provider_id);
  }

  const changeWorkSpace = (orgId) => {

    localStorage.setItem('orgId', orgId)
    setSelectedOrganization(orgId);
    setSelectedbridge(null)
  }

   
  const handleMenuClick = (name) => {
    console.log(name)
    toggleClassicTabs3(name)
    switch (name) {
      case 'Switch work space':
          props.history.push('/')
        break;
      
     
      case 'Sign out':
        props.onToggleAlert({
          title: `Are you sure you want to sign out?`,
          // text: `${user.first_name} ${user.last_name} is allready allocated as ${role.name}`,
          confirmButton: 'Sign out',
          cancelButton: 'Cancel',
          alertType: 'danger',
          confirmFunction: () => {
            
            props.onLogout();
            props.history.push('/');
          }
        });
        break;
        
        break;
      default:
        break;
    }
  }

  let actions = {
    'Messages': {
      generalActions: [
        { name: `Create new user`, icon: 'user-plus', type: 'info'},        
        { name: `Create new role type`, icon: 'user-md', type: 'info'},        
      ],
      ifSelectedActions:  [
        { name: `Allocate user`, icon: 'user-tie', type: 'info'},
        { name: `Edit user`, icon: 'edit', type: 'info'},
        { name: `Delete user`, icon: 'trash', type: 'error'},
      ]
    },
    'Manage users & roles': {
      generalActions: [
        { name: `Create new user`, icon: 'user-plus', type: 'info'},        
        { name: `Create new role type`, icon: 'user-md', type: 'info'},        
      ],
      ifSelectedActions:  [
        { name: `Allocate user`, icon: 'user-tie', type: 'info'},
        { name: `Edit user`, icon: 'edit', type: 'info'},
        { name: `Delete user`, icon: 'trash', type: 'error'},
      ]
    },
    'Organizations': {
      generalActions: [
        { name: `Create new organization`, icon: 'plus', type: 'info'},
      ],
      ifSelectedActions:  [
        
        { name: `Create new organization role`, icon: 'user-tie', type: 'info'},
        { name: `Edit organization`, icon: 'edit', type: 'info'},        
        // { name: `Allocate user to organization`, icon: 'user-plus', type: 'info'},
        { name: `Allocate organization to provider`, icon: 'plus-square', type: 'info'},
        { name: `Delete organization`, icon: 'trash', type: 'error'},
      ]
    },
    'Providers': {
      generalActions: [
        { name: `Create new provider`, icon: 'plus', type: 'info'},
                
      ],
      ifSelectedActions:  [
        { name: `Create new user`, icon: 'user-tie', type: 'info'},
        { name: `Create new provider role`, icon: 'user-tie', type: 'info'},
        { name: `Edit provider`, icon: 'edit', type: 'info'},
        { name: `Allocate user to provider`, icon: 'user-plus', type: 'info'},
        { name: `Allocate user to organization`, icon: 'user-plus', type: 'info'},
        { name: `Allocate provider to organization`, icon: 'plus-square', type: 'info'},
        { name: `Delete provider`, icon: 'trash', type: 'error'},
      ]
    },
    'Role actions': [
        { name: `Switch roles`, icon: 'random', type: 'info', selectOptionsType: 'role'},
        { name: `Change status`, icon: 'sync', type: 'info', selectOptionsType: 'status'},
        { name: `Update role`, icon: 'sync', type: 'info'},
        { name: `Delete role`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
    ],
    'Provider actions': [
        { name: `Change status`, icon: 'sync', type: 'info', selectOptionsType: 'status'},
        { name: `Edit provider`, icon: 'sync', type: 'info'},
        { name: `Delete provider`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
        { name: `Send message`, icon: 'envelope', type: 'success', confirmationMessageType: 'success', confirmationMessage: 'Enter message '},
    ],
  };
  const handleAction = (name, val) => {
    console.log('handleAction', name, val)
    switch (name) {
      case 'Create new organization':
        props.onToggleModal({
          title: 'Create new organization',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          data: {
            editMode: 'create',
          },
          colWidth: 6,
          formType:'organizationForm',
          confirmFunction: (data) => {
            console.log(data)
            data['general_status'] = 'Awaiting confirmation'
            props.addOrganization(data)
          },
          onBlurFunction: (value) => {
            console.log('onBlurFunction', value)
            let searchResults
            switch (value.type) {
              case 'email':
                  searchResults = utils.searchBy(
                  'email', 
                  value.value, 
                  props.organizations,
                  props.providers,
                  props.users,
                  )
                // console.log(searchResults)
                if (searchResults) return searchResults
                // else {
                //   props.findEntityBy(value.value)
    
                // }
                break;
              case 'name':
                  searchResults = utils.searchBy(
                  'name', 
                  value.value, 
                  props.organizations,
                  props.providers,
                  []
                  )
                // console.log(searchResults)
                if (searchResults) return searchResults
                // else {
                //   props.findEntityBy(value.value)
    
                // }
                break;
            
              default:
                break;
            }

          }
        });
        break;
      case 'Edit organization':
        props.onToggleModal({
          title: 'Edit organization',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          data: {
            editMode: 'edit',
            item: selectedOrganization
          },
          formType:'organizationForm',
          confirmFunction: (data) => {
            props.updateOrg(data)
          }
        });
        break;
      case 'Delete organization':
        props.onToggleAlert({
          title: `Delete ${selectedOrganization.name}`,
          text: `Are you sure you want to permenantly delete ${selectedOrganization.name}?`,
          confirmButton: 'Delete',
          alertType: 'danger',          
          confirmFunction: () => console.log('deleteeeeeee')
        });
        break;
      case 'Create new provider':
        props.onToggleModal({
          title: 'Create new provider',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          data: {
            editMode: 'create'
          },
          formType:'providerForm',
          confirmFunction: (data) => {
            props.addProvider(data, selectedOrganization)
          },
          onBlurFunction: (value) => {
            console.log('onBlurFunction', 'NEED TO BE HANDLED', value)
            // const foundProviders = props.providers.find(prov => prov.email === value);
            // const foundUsers = props.organizationUsers.find(user => user.email === value);
            // console.log('foundProviders', foundProviders)
            // console.log('foundUsers', foundUsers)
            // if (foundProviders) {
            //   return {
            //     msg: 'This email is allready in your providers '
            //   }
            // } else if (foundUsers) {
            //   return {
            //     msg: 'This email is allready in your users'
            //   }
            // } else {
            //   props.findEntityBy(value)

            // }
            // return found
          },
        });
        break;
      case 'Edit provider':
        props.onToggleModal({
          title: 'Edit provider',
          text: '',
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          data: {
            editMode: 'edit',
            item: selectedProvider
          },
          formType:'providerForm',
          confirmFunction: (data) => {
            props.updateProvider(data)
          }
        });
        break;
      case 'Delete provider':
        props.onToggleAlert({
          title: `Delete ${selectedProvider.name}?`,
          text: `Are you sure you want to permenantly delete ${selectedProvider.name}?`,
          confirmButton: 'Delete',
          alertType: 'danger',          
          confirmFunction: () => console.log('deleteeeeeee')
        });
          break;
        case 'Create new user':
          props.onToggleModal({
            title: 'Create new user',
            text: '',
            // confirmButton: 'Create',
            cancelButton: 'Cancel',
            data: {
              editMode: 'create',
              colWidth: 12,
              roles: getOrgRoles(selectedOrganization.id),
            },
            formType: 'registerUserForm',
            confirmFunction: data => {
              console.log(data)
              props.createNewOrganizationUser(data, selectedOrganization);
            },
          });
          break;
      case 'Delete user':
        props.onToggleAlert({
          title: `Delete ${selectedUser.first_name} ${selectedUser.last_name}?`,
          text: `This will delete ${selectedUser.first_name} ${selectedUser.last_name} from all related stuff`,
          confirmButton: 'Delete',
          alertType: 'danger',          
          confirmFunction: () => console.log('deleteeeeeee')
        });
          break;
      case 'Edit user':
        props.onToggleModal({
          title: `Edit ${selectedUser.first_name} ${selectedUser.last_name}`,
          cancelButton: 'Cancel',
          formType: 'userForm',
          
          data: {
            editMode: 'edit',
            item: selectedUser
          },
          confirmFunction: (data, event) => console.log(data),
        });
        break;
      case 'Allocate user':
        props.onToggleModal({
          title: `Allocate ${selectedUser.first_name}`,
          text:
            'Choose organization/provider and role to allocate '+ selectedUser.first_name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'userAllocationForm',
          
          data: {
            organizations: props.organizations,
            roles: props.roles,
            providers: props.providers,
            editMode: 'Allocate',
            colWidth: 12,
          },
          confirmFunction: (data, event) => prepareUserAllocation(data, data.target),
        });
        break;
      case 'Allocate user to organization':
        console.log(getOrgProviders(selectedOrganization.id))
        const orgProviders = getOrgProviders(selectedOrganization.id);
        console.log('orgProviders- Allocate user to organization' , orgProviders)
        const allProvidersUsers = utils.getAllProvidersUsers(orgProviders, props.providersUsers, props.users);
        console.log(allProvidersUsers)
        props.onToggleModal({
          title: `Allocate user to ${selectedOrganization.name}`,
          text:
            'Choose user and role to allocate to '+ selectedOrganization.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'organizaionUserAllocationForm',
          
          data: {
            providerUsers: allProvidersUsers,
            providers: orgProviders,
            roles: getOrgRoles(selectedOrganization.id),
            editMode: 'Allocate',
            colWidth: 12,
          },
          confirmFunction: (data, event) => prepareUserAllocation(data, 'organization'),
        });
        break;
      case 'Allocate provider to organization':
        const providerOrgs = getProviderOrganizations(selectedProvider.id);
        const unAllocatedOrgs = getUnAllocatedProviders(
          providerOrgs,
          props.organizations,
        );
        props.onToggleModal({
          title: `Allocate ${selectedProvider.name} to organization`,
          text:
            'Choose organization to allocate to '+ selectedProvider.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'providerOrganizationAllocationForm',
          
          data: {
            organizations: unAllocatedOrgs,
            editMode: 'Allocate',
            colWidth: 12,
          },
          confirmFunction: data => prepareProviderAllocation(data, 'organization'),
        });
        break
      case 'Allocate organization to provider':
        // console.log(selectedProvider)
        // const providerOrganizations = getProviderOrganizations(selectedProvider.id);
        // const unAllocatedOrganizations = getUnAllocatedProviders(
        //   providerOrganizations,
        //   props.organizations,
        // );
        props.onToggleModal({
          title: `Allocate ${selectedOrganization.name} to provider`,
          text:
            'Choose provider to allocate to '+ selectedOrganization.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'organizationProviderAllocationForm',
          
          data: {
            providers: props.providers,
            editMode: 'Allocate',
            colWidth: 12,
          },
          confirmFunction: data => prepareProviderAllocation(data, 'provider'),
        });
        break
      case 'Create new role':
        props.onToggleModal({
          title: `Create new role `,
          text:
            'Create new role for '+ selectedOrganization.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'roleForm',
          
          data: {
            editMode: 'Create',
            colWidth: 12,
            roleTypes: props.roleTypes
          },
          confirmFunction: (data, event) => prepareNewRole(data, 'organization'),
        });
        break;
      case 'Create new provider role':
        props.onToggleModal({
          title: `Create new role `,
          text:
            'Create new role for '+ selectedProvider.name,
          // confirmButton: 'Create',
          cancelButton: 'Cancel',
          formType: 'roleForm',
          
          data: {
            editMode: 'Create',
            colWidth: 12,
            roleTypes: props.roleTypes
          },
          confirmFunction: (data, event) => prepareNewRole(data, 'provider'),
        });
        break;
      case 'Allocate user to provider':
          
          props.onToggleModal({
            title: `Allocate user to ${selectedProvider.name}`,
            text:
              'Choose user and role to allocate to '+ selectedProvider.name,
            // confirmButton: 'Create',
            cancelButton: 'Cancel',
            formType: 'providerUserAllocationForm',
            
            data: {
              users: props.users,
              roles: getProviderRoles(selectedProvider.id),
              editMode: 'Allocate',
              colWidth: 12,
            },
            confirmFunction: (data, event) => prepareUserAllocation(data, 'provider'),
          });
          break;
      case 'Create new role type':
          
          props.onToggleModal({
            title: `Create new role type`,
            
            cancelButton: 'Cancel',
            formType: 'roleTypeForm',
            
            data: {
              editMode: 'Create',
              colWidth: 12,
            },
            confirmFunction: (data, event) => props.createRoleType(data),
          });
          break;
      case 'Edit dataBase':
          
          props.onToggleModal({
            title: `edit DataBase for ${val.name}` ,
            text: '',
            // confirmButton: 'Create',
            cancelButton: 'Close',
            body : <DataBaseModule org={val}/>,
            // body : <DataBase org={val}/>,
            // confirmButton: 'Switch roles',
            confirmFunction: () => {
              onToggleModal()
              // history.push('/')
            }
          })
          break;
      
      default:
        break;
    }
  }

  const prepareUserAllocation = (data, allocateTo) => {
    console.log(data, allocateTo)
    const user = data.user_id ? utils.getUserById(data.user_id, props.users) : selectedUser;
    const roleName = utils.getRoleById(data.role_id, props.roles).name;
    switch (allocateTo) {
      case 'organization':
        const org = data.organization_id ? utils.getOrganizationbyId(data.organization_id, props.Organizations) : selectedOrganization;
        props.allocateUserToOrg(user, org, data.role_id, roleName, data.remarks, data.provider_id) ;
        break;
      case 'provider':
        const provider = data.provider_id ? getProviderById(data.provider_id) : selectedProvider;      
        
        props.allocateUserToProv(user, provider, data.role_id, roleName, data.remarks)
        break;
    
      default:
        break;
    }
   
  }
  const prepareProviderAllocation = (data, allocateTo) => {
    console.log(data, allocateTo)
    const org = data.organization_id ? utils.getOrganizationbyId(data.organization_id, props.Organizations) : selectedOrganization;
    const provider = data.provider_id ? getProviderById(data.provider_id) : selectedProvider;
    props.allocateProviderToOrg({org, provider, remarks: data.remarks} ) ;

    // switch (allocateTo) {
    //   case 'organization':
    //     break;
    //   case 'provider':
       
    //     props.allocateProviderToProv(provider, data.remarks)
    //     break;
    
    //   default:
    //     break;
    // }
   
  }
  const prepareNewRole = (data, type) => {
    let newRole = {
      ...data,      
      type: props.roleTypes.find(roleType => roleType.id === data.type).name
    };
    if (type == 'provider') newRole.provider_id = selectedProvider.id
    else if (type == 'organization') newRole.organization_id = selectedOrganization.id
    props.createNewRole(newRole)
  }

  const getProviderById = (id) => {
    return props.providers.find(prov => prov.id === id)
  }

  const getOrgRoles = (orgId) => {

    return props.roles.filter(role => role.organization_id === orgId)
  }
  const getOrgProviders = (orgId) => {
    let providers = []
    const providersConnections = props.organizationProviders.filter(item => item.organization_id === orgId);
    providersConnections.map(connection => providers.push(props.providers.find(prov => prov.id == connection.provider_id)))
    return providers
  }
  const getProviderOrganizations = (provId) => {
    let organizations = []

    const providersConnections = props.organizationProviders.filter(item => item.provider_id === provId);

    providersConnections.map(connection => organizations.push(props.organizations.find(org => org.id == connection.organization_id)))
    return organizations
  }
  const getUnAllocatedProviders = (allocatedOrgs, allOrganizations) => {
    const unAllocated = allOrganizations.filter(org => !allocatedOrgs.includes(org));
    return unAllocated
  }
  const getProviderRoles = (prvoId) => {
    // console.log('getProviderRoles', props.roles)
    return props.roles.filter(role => role.provider_id === prvoId)
  }

  const getAllUsersByOrg = (org) => {

    return props.organizationsUsers.filter(user => user.organization_id === org.id)
  }


  const onSelectUser = (user) => {
    selectedUser == user ? setSelectedUser() : setSelectedUser(user)
  }
  const onSelectOrg = (org) => {
    selectedOrganization == org ? setSelectedOrganization() : setSelectedOrganization(org) 
  }
  const onSelectPovider = (prov) => {
    selectedProvider == prov ? setSelectedProvider() : setSelectedProvider(prov)
  }
  const Toggled = ({children}) => <div className="toggled">{children}</div>
  
  const RoleWrapper = styled.div`
    font-size: .8rem;    
    border-bottom: 1px solid lightgrey;
    align-items: center;
    &:hover {
      // color: #6cc0e5;
    }
  `;

  const RoleRow = ({role}) => {
    
    const employerOrg = role.organization_id ? utils.getOrganizationbyId(role.organization_id, props.organizations) : null;
    const employerProv = role.provider_id ? getProviderById(role.provider_id):  null;
    const roleDetails = role.role_id ? utils.getRoleById(role.role_id, props.roles) : 'No role';
    actions['Role actions'].map(action => {
      let selectedOptions
      if (action.selectOptionsType) {
        switch (action.selectOptionsType) {
          case 'role':
            // selectedOptions = role.organization_id ? getOrgRoles(role.organization_id) : getProviderRoles(role.provider_id);
            selectedOptions = role.organization_id ? getOrgRoles(role.organization_id) : null;
            console.log(selectedOptions)
            break;
          case 'status':
            selectedOptions = [
              // {id: 1, name: 'created'},
              // {id: 2, name: 'confirmed'},
              // {id: 3, name: 'active'},
              // {id: 4, name: 'in active'},
            ]
            break;
        
          default:
            break;
        }
        action.options = selectedOptions
      }
      // console.log(action)
    })    
    // console.log(actions['Role actions'])
    return <RoleWrapper className="row  text-center py-1">
      <div className="col-1">
        {employerOrg && employerOrg.name}
      </div>
      <div className="col-1">
        {employerProv && employerProv.name}
      </div>
      <div className="col-2">
        {roleDetails.name}
      </div>
      <div className="col-3">
        {roleDetails.description}
      </div>
      <div className="col-2">
        {role.remarks ? role.remarks : 'No remarks'}
      </div>
      <div className="col-1">
        <DateField date={role.date_created}/>
      </div>
      <div className="col-1">
        {role.status}
      </div>
      <div className="col-1">
        <PopperMenu 
          actions={actions['Role actions']}
          // selectedUser={selectedUser}
          bgColor={'blue'}
          handleAction={(actionName, val) => handleAction(actionName, val)}
          />
    
      </div>
    </RoleWrapper>
  }

  const UserRoles = ({roles}) => {
    return <div className="toggled">
      <TableHeader className="row  text-center py-1">
        <div className="col-1">
          Organization
        </div>
        <div className="col-1">
          Provider
        </div>
        <div className="col-2">
          Role name
        </div>
        <div className="col-3">
          description
        </div>
        <div className="col-2">
          Remarks
        </div>
        <div className="col-1">
          Created at
        </div>
        <div className="col-1">
          Status
        </div>
        <div className="col-1">
          
        </div>
    </TableHeader>
    {roles.map((role, index) => <RoleRow
      className="" 
      key={index} 
      role={role}/>)

     }
     </div>
  }

  const Actions = ({
    actions, 
    iconColor, 
    className,
    onAction
  }) => {
    
    return <div className={`text-right d-flex p-2 ${className}`}>
      {actions && actions.map(action => <IconButtonToolTip
        key={action.name}
        iconName={action.icon}
        toolTipType={action.type}
        toolTipPosition="left"
        toolTipEffect="float"
        toolTipText={action.name}
        className={`mx-3 text-${iconColor}`}
        onClickFunction={() => onAction ? onAction(action.name) : handleAction(action.name)}
      />)}
    </div>
  }

  const PageHeader = ({text, isSelected}) => {
    return (
      <div className="row text-center py-1 green-gradient">
        <div className="col-4">
          <div className="float-left">
          
          </div>
        </div>
        <div className="col-4 text-center text-white pt-2">{text.toUpperCase()}</div>
        <div className="col-4 text-right">
          <div className="float-right">
        
           
            {actions[activeItemClassicTabs3] && <Actions 
              actions={actions[activeItemClassicTabs3].generalActions}
              iconColor='white'
            />}
          </div>
        </div>
      
      </div>
    );
  }

  const SectionHeader = ({sectioName, isSelected}) => {
    
    return (
      <div className="row text-center py-1 #ffebee red lighten-5">
        <div className="col-4">
          <h5 className="bold align-items-center mt-2">
            {sectioName} 
          </h5>
        </div>
        <div className="col-4 text-center text-white pt-2">{}</div>
        <div className="col-4 text-right">
          <div className="float-right">     
          
            {isSelected && actions[activeItemClassicTabs3] && <Actions 
              actions={actions[activeItemClassicTabs3].ifSelectedActions}
              iconColor='black'
            />}
          </div>
        </div>
      
      </div>
    );
  }

  const ManageUsers = () => {
    const isSelected = selectedUser !== null && selectedUser !== undefined
    return <>
            <PageHeader text={'manage users & roles'}
              isSelected={isSelected}
              />
              <SectionHeader 
                sectioName="USERS"
                isSelected={isSelected}/>
              
                      
              <TableHeader className="row text-center py-1">
                <div className="col-1">
                  ID
                </div>
                <div className="col-2">
                  Name
                </div>
                <div className="col-3">
                  Email
                </div>
                <div className="col-2">
                  Phone
                </div>
                <div className="col-2">
                  Remarks
                </div>
                <div className="col-1">
                  Created at
                </div>
                <div className="col-1">
                  Status
                </div>
            </TableHeader>
              {props.users.map(user => {
                let userRoles = getAllRolesByUser(user)
                // console.log(userRoles)
                return <UserRow key={user.id} 
                  user={user}
                  roles={props.roles} 
                  checked={selectedUser ? selectedUser.id === user.id : false}
                  onClick={() => onSelectUser(user)}>
                    {userRoles.length ? 
                      <CSSTransition
                        in={selectedUser ? selectedUser.id === user.id : false}
                        timeout={{
                          appear: 0,
                          enter: 0,
                          exit: 300,
                        }}
                        classNames="toggleAnimation"
                        unmountOnExit
                        // onEnter={() => console.log(false)}
                        // onExited={() => console.log(true)}
                        appear
                      > 
                        <Toggled >                
                         
                          <UserRoles roles={userRoles}/>
                        </Toggled>
                        

                      </CSSTransition>
                       : ''} 
                </UserRow>
              })}
    </>
  }

  
  const ManageOrganizations = () => {
    const [selectedComponent, setSelectedComponent] = useState(
      localStorage.getItem('selectedComponent') ? 
      localStorage.getItem('selectedComponent') :
       'General roles')
    const isSelected = selectedOrganization !== null && selectedOrganization !== undefined;
    const actions = [
      // { name: `Switch roles`, icon: 'random', type: 'info', selectOptionsType: 'role'},
      // { name: `Change status`, icon: 'sync', type: 'info', selectOptionsType: 'status'},
      { name: `Edit organization`, icon: 'edit', type: 'info'},
      { name: `Edit dataBase`, icon: 'eye', type: 'info'},
      // { name: `Remove provider`, icon: 'trash', type: 'error', confirmationMessageType: 'danger', confirmationMessage: 'Are you sure you want to delete '},
    ]
    return <>
            <PageHeader text={'manage organizations, users & roles'}
              isSelected={isSelected}
            />              
            
              <TableHeader className="row py-1">
            
                <div className="col-1">
                  Name
                </div>
                <div className="col-1">
                  Contact name
                </div>
                <div className="col-3">
                  Remarks
                </div>
                <div className="col-2">
                  Email
                </div>
                <div className="col-2">
                  Phone
                </div>
                <div className="col-2">
                  Status
                </div>
                <div className="col-1">
                  Actions
                </div>
            </TableHeader>
              {props.organizations.map(org => {
                // console.log('orgProviders', org)
                let orgUsers = getAllUsersByOrg(org);
                const orgRoles = getOrgRoles(org.id);
                const orgProviders = getOrgProviders(org.id);
                // console.log('orgProviders', orgProviders)
                const allProvidersUsers = utils.getAllProvidersUsers(orgProviders, props.providersUsers, props.users);
                const inProp = selectedOrganization ? selectedOrganization.id === org.id : false

                return <TableRowWrapper className="row no-gutters tableRow py-1 p-3"
                key={org.id}>
                <div className="col-1">{`${org.name}`}</div>
                <div className="col-1">{`${org.contact_name}`}</div>
                <div className="col-3">{org.remarks}</div>
                <div className="col-2">{org.region}</div>
                <div className="col-2">{org.phone}</div>
                <div className="col-2">
                  <Status statusName={org.status ? org.status : org.general_status} />
                  {/* {editMode ? (
                    <Select
                      value={org.status}
                      className="fullWidth"
                      options={connectionStatuses}
                      onChange={val => handleAction('Change status', val)}
                    />
                  ) : (
                    
                    <Status statusName={org.status ? org.status : org.general_status} />
                  )} */}
                </div>
                <div className="col-1">
                  <Actions
                    actions={actions}
                    onAction={actionName => handleAction(actionName, org)}
                  />
                </div>
              </TableRowWrapper>
                // <div>
                //   <CompanyRow
                //     key={org.id}
                //     company={org}
                //     checked={inProp}
                //     onClick={() => onSelectOrg(org)}
                //     />
  
                //   <CSSTransition
                //     in={inProp}
                //     timeout={{
                //       appear: 0,
                //       enter: 0,
                //       exit: 300,
                //     }}
                //     classNames="toggleAnimation"
                //     unmountOnExit
                //     // onEnter={() => console.log(false)}
                //     // onExited={() => console.log(true)}
                //     appear
                //   >
                //     <Toggled>
                //       <ManagementSection
                //         handleAction={actionName =>
                //           handleAction(actionName)
                //         }
                //         users={orgUsers}
                //         company={org}
                //         organizationUsers={
                //           orgUsers
                //         }
                //         roles={
                //           orgRoles
                //         }
                //         providers={orgProviders}
                        
                //         type="organization"
                //       />

                //     </Toggled>
                //   </CSSTransition>
                     
                 
               

                // </div>
              })}
    </>
  }

  const ManageProviders = () => {
    const [selectedComponent, setSelectedComponent] = useState(
      localStorage.getItem('selectedComponent') ? 
      localStorage.getItem('selectedComponent') :
       'General roles')
    const isSelected= selectedProvider !== null && selectedProvider !== undefined;
    return <>
            <PageHeader text={'manage providers users'}
              isSelected={isSelected}
            />              
              <TableHeader className="row text-center py-1">
                <div className="col-1">
                  ID
                </div>
                <div className="col-2">
                  Name
                </div>
                <div className="col-3">
                  Email
                </div>
                <div className="col-2">
                  Phone
                </div>
                <div className="col-2">
                  Remarks
                </div>
                <div className="col-1">
                  Contact name
                </div>
                <div className="col-1">
                  Created at
                </div>
            </TableHeader>
              {props.providers.map(prov => {
                const providerOrganizations = getProviderOrganizations(prov.id);
                const unAllocatedProviders = getUnAllocatedProviders(providerOrganizations, props.organizations)
                const provRoles = getProviderRoles(prov.id);
                // console.log('provGereralRoles', provGereralRoles)
                const provOrganizationUsers = utils.getOrganizationUsersByProvider(prov.id, props.organizationsUsers);
                // console.log('provOrganizationUsers', provOrganizationUsers)
             
                const provUsers = utils.getAllUsersByProvider(props.providersUsers, prov)
                // .map(
                //   userConnection => utils.getUserById(userConnection.user_id, props.users)
                //   )
          
                return (
                  <CompanyRow
                    key={prov.id}
                    company={prov}
                    checked={
                      selectedProvider
                        ? selectedProvider.id === prov.id
                        : false
                    }
                    onClick={() => onSelectPovider(prov)}
                  >
         
                      <CSSTransition
                        in={
                          selectedProvider
                            ? selectedProvider.id === prov.id
                            : false
                        }
                        timeout={{
                          appear: 0,
                          enter: 0,
                          exit: 300,
                        }}
                        classNames="toggleAnimation"
                        unmountOnExit
                        // onEnter={() => console.log(false)}
                        // onExited={() => console.log(true)}
                        appear
                      >
                        <Toggled>
                          <ManagementSection
                            handleAction={actionName =>
                              handleAction(actionName)
                            }
                            users={provUsers}
                            company={prov}
                            organizationUsers={provOrganizationUsers}
                            roles={provRoles}
                            organizations={providerOrganizations}
                            
                            type="provider"
                          />
                          
                        </Toggled> 
                      </CSSTransition>
                   
                  </CompanyRow>
                );
              })}
    </>
  }

  console.log(props.organizations)
  if (props.organizations.length) {

    return (

      <div className="">
          <SideMenu
            menu={menu}
            // onProviderClick={(provider_id) => linkToProviderPage(provider_id)}
            // onOrganizationClick={(orgId) => changeWorkSpace(orgId)}
            />
          
          
        <div className="classic-tabs">
          {/* <MDBBreadcrumb>
            <MDBBreadcrumbItem active>{activeItemClassicTabs3}</MDBBreadcrumbItem>
          </MDBBreadcrumb>      */}
          <MDBTabContent className="pageContent" activeItem={activeItemClassicTabs3}>
            <TextSearch value=""
              onChange={val => utils.searchAll(val, props.users)}/>
            <MDBTabPane tabId={props.currentUser.userInfo.first_name}>
              <Basic
                item={props.currentUser.userInfo}
                updateItem={(data) => props.updateProvider(data, props.provider.id)}
                dataType="provider"
                />
            </MDBTabPane>
              <MDBTabPane tabId="Bridges">
                
              </MDBTabPane>
              <MDBTabPane tabId="Messages">
           
              </MDBTabPane>
              <MDBTabPane tabId="Schedule">
                <Calender />
  
              </MDBTabPane>
           
              <MDBTabPane tabId="Manage users & roles">
                <br />
                {/* <ManageUsers /> */}
  
              </MDBTabPane>
              <MDBTabPane tabId="Manage projects">
                
              </MDBTabPane>
              <MDBTabPane tabId="Manage processes">
  
              {/* <MDBSwitch
                  checked={showProviderProcesses}
                  onChange={() => setsShowProviderProcesses(!showProviderProcesses)}
                  labelLeft=""
                  labelRight={`Show ${showProviderProcesses ? 'process templates' : 'all processes'}`}
                  />
                {showProviderProcesses?
                <AccordionTable
                    data={props.projectsProcesses.filter(process => process.organization_id == selectedOrganization)}
                    rows={props.tasks}
                    dataType="processes"
                    // bridges={props.bridges}
                    changePercentage={(task, value) => changeTaskPercentage(task, value)}
                    changeDate={(task, value) => changeTaskDate(task, value)}
                    />
                :
                <Processes
                  provider={props.provider}
                  />} */}
  
              </MDBTabPane>
              <MDBTabPane tabId="Organizations">
                <br />
                <ManageOrganizations />
                {/* <TableFilters
                  dataType={'organizationsTable'}
                  data={props.organizations}
                  checkBoxFunction={(item) => console.log(item)}
                  isChecked={(item) => {return false}}
                  // providers={this.props.providers}
                  tableName={'Organizations'}
                  onRowClick={(id) => linkToOrgPage(id)}
                /> */}
  
              </MDBTabPane>
            
              <MDBTabPane tabId="Providers">
                <br />
                <ManageProviders />
                {/* <TableFilters
                  dataType={'providersTable'}
                  data={props.providers}
                  checkBoxFunction={(item) => console.log(item)}
                  isChecked={(item) => {return false}}
                  // providers={this.props.providers}
                  tableName={'Providers'}
                  onRowClick={(id) => linkToProviderPage(id)}
                /> */}
  
              </MDBTabPane>
              <MDBTabPane tabId="Settings">
              </MDBTabPane>
            
              <MDBTabPane tabId="Settings">
                <br />
                <TableFilters
                  dataType={'organizationsTable'}
                  data={props.organizations}
                  checkBoxFunction={(item) => console.log(item)}
                  isChecked={(item) => {return false}}
                  // providers={this.props.providers}
                  tableName={'Organizations'}
                  onRowClick={(id) => linkToOrgPage(id)}
                />
  
                  </MDBTabPane>
            
            </MDBTabContent>
            
        </div>
        <br></br>
  
  
      </div>
      );
  } else {
    return <div>LOADING</div>
  }

}

const mapStateToProps = createStructuredSelector({
  users: makeSelectUsers(),
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
  organizations: makeSelectOrganizations(),
  providers: makeSelectProviders(),
  projects: makeSelectProjects(),
  roleTypes: makeSelectRoleTypes(),
  roles: makeSelectRoles(),
  processTemplatesTasks: makeSelectprocessTemplatesTasks(),
  processes: makeSelectProcesses(),
  tasks: makeSelectTasks(),
  newOrg: makeSelectNewOrg(),
  organizationsUsers: makeSelectOrganizationsAllUsers(),
  providersUsers: makeSelectProvidersUsers(),
  organizationProviders: makeSelectOrganizationProviders(),
    
});

// const mapStateToProps = (state) => {
//   console.log(state)
//   return {
//     currentUser: state.global.currentUser,
//     currentUser: state.global.currentUser,
//   }
// }
const mapDispatchToProps = (dispatch) => {
  return {
    onToggleModal: (modalData) => {dispatch(toggleModal(modalData))},
    onToggleAlert: data => dispatch(toggleAlert(data)),
    onCreateNewProject: data => {dispatch(createNewProject(data))},
    getProvider: (id) => dispatch(getProviderbyId(id)),
    // onAllocateUser: (newProviderUser) => dispatch(allocateUser(newProviderUser)),
    updateProvider: (data, id) => dispatch(updateProvider(data,id)),
    onUpdateTask: (task) => dispatch(updateTask(task)),
    addOrganization: (data) => dispatch(addOrganization(data)),
    updateOrg: (data) => dispatch(updateOrg(data)),
    addProvider: (provider, org) => dispatch(addProvider(provider, org)),
    onLogout: () => dispatch(logout()),
    getAllData: () => dispatch(getAllData()),
    allocateUserToOrg: (user, org, role_id, roleName, remarks, provider_id) => dispatch(allocateUserToOrg({user, org, role_id, roleName, remarks, provider_id})),
    allocateUserToProv: (user, provider, role_id, roleName, remarks) => dispatch(allocateUserToProv(user, provider, role_id, roleName, remarks)),
    createNewRole: (data) => dispatch(createNewRole(data)),
    // allocateUser: (data) => dispatch(allocateUser(data)),
    createRoleType: (data) => dispatch(createRoleType(data)),
    onCreateUserAndConnection: (newUser, provider, org) => dispatch(createUserAndConnection(newUser, provider, org)),
    onCreateUserConnection: (userConnectionData) => dispatch(createUserConnection(userConnectionData)),
    onUpdateUserConnection: (users) => dispatch(updateUserConnection(users)),
       
    // allocateProviderToOrg: (data) => dispatch(allocateProviderToOrg(data)),
    createNewOrganizationUser: (newUser, organization) =>
      dispatch(registerNewOrgUser(newUser, organization)),
    findEntityBy: email => dispatch(findEntityBy(email)),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo,
)(AdminModule);



