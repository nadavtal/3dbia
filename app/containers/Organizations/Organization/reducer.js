
import produce from 'immer';
import * as actionTypes from './constants';

import { USER_ALLOCATED, ORG_USER_UPDATED, PROVIDER_ALLOCATED, NEW_ROLE_CREATED, 
  PROV_ORG_CONNECTION_UPDATED, ORGANIZATION_UPDATED, MENU_ITEM_CLICKED, BRIDGE_SELECTED,
  USER_ROLES_UPDATED, ROLE_UPDATED, BRIDGE_UPDATED, TASK_UPDATED } from 'containers/App/constants';
  import { LOGOUT } from 'containers/AppData/constants';
import { addProviderToRoles, getRoleById } from 'utils/dataUtils';
export const initialState = {
  organization: null,
  bridges: [],
  surveys: [],
  processes: [],
  processesTemplates: [],
  processesTasks: [],
  providers: [],
  messages: [],
  bridgeTypes: [],
  tasks: [],
  organizationUsers: [],
  organizationRoles: [],
  providersRoles:[],
  selectedComponent: 'User Info',
  selectedProvider: null,
  selectedBridgeId: null,
};
 
/* eslint-disable default-case, no-param-reassign */
const organizationReducer = (state = initialState, action) =>


  produce(state, draft => {

    switch (action.type) {
      case MENU_ITEM_CLICKED:

        switch (action.menuItem) {
          case 'Info':
            draft.selectedComponent = 'User Info'
            break;
          case 'Manage Users':
            draft.selectedComponent = 'Roles'
            break;
        
          default:
            break;
        }
      break
      case actionTypes.ORGANIZATION_LOADED:

        addProviderToRoles(action.data.providersRoles, action.data.providers)
        addProviderToRoles(action.data.organizationUsers, action.data.providers)
        draft.organization = action.data.organization[0];
        draft.organizationUsers = action.data.organizationUsers;
        draft.organizationRoles = action.data.organizationRoles;
        draft.bridges = action.data.bridges;
        draft.surveys = action.data.surveys;
        draft.processesTemplates = action.data.processesTemplates;
        draft.providers = action.data.providers;
        draft.processesTasks = action.data.processesTasks;
        draft.bridgeTypes = action.data.bridgeTypes;
        draft.tasks = action.data.tasks;
        draft.providersRoles = action.data.providersRoles;
        break;
      case LOGOUT:
        draft.organization = null;
        draft.organizationUsers = [];
        draft.organizationRoles = [];
        draft.bridges = [];
        draft.surveys = [];
        draft.processesTemplates = [];
        draft.providers = [];
        draft.processesTasks = [];
        draft.bridgeTypes = [];
        draft.tasks = [];
        draft.providersRoles = [];
        break;
      case actionTypes.ORGANIZATION_PROJECT_CREATED:

        let newProject = action.project;
        newProject.id = action.id;
        console.log(newProject)
        draft.projects = [...state.projects, newProject];

        break;
      case USER_ROLES_UPDATED:

          let newOrganizationUsers = [...state.organizationUsers];
          action.users.forEach(newUserRole => {
            newOrganizationUsers = newOrganizationUsers.filter(user => user.id !== newUserRole.id)
            newOrganizationUsers.push(newUserRole) 
          })
                  
          draft.organizationUsers = newOrganizationUsers
          
          break;
      case BRIDGE_SELECTED:
        console.log('BRIDGE_SELECTED', action)
        draft.selectedBridgeId = action.bid;
        break
      case BRIDGE_UPDATED:

        let updatedBridges = state.bridges.filter(br => br.bid !== action.bridge.bid)
        updatedBridges.push(action.bridge)
        draft.bridges = updatedBridges
        break
      case actionTypes.SET_SELECTED_COMPONENT:
          console.log('SET_SELECTED_COMPONENT', action)
          draft.selectedComponent = action.componentName;
          break
      // case actionTypes.BRIDGE_SELECTED:
    
      //   draft.selectedBridgeId = action.bid;
      //   break
      case ROLE_UPDATED:

        if (action.data.organization_id) {
          const updatedRoles = state.organizationRoles.filter(role => role.id !== action.data.id)
          updatedRoles.push(action.data)
          console.log(updatedRoles)
          draft.organizationRoles = updatedRoles;
        } else {
          const updatedRoles = state.providersRoles.filter(role => role.id !== action.data.id)
          updatedRoles.push(action.data)
          console.log(updatedRoles)
          draft.providersRoles = updatedRoles;
        }
        
        
        break;
      case actionTypes.PROJECT_PROCESSES_LOADED:


        draft.processes = data;

        break;
      case actionTypes.SURVEYS_CREATED:

        draft.surveys = [...state.surveys, ...action.data];

        break;
      case USER_ALLOCATED:

        if (action.data.role_id && !action.data.roleName) {
          // console.log([...state.organizationRoles, ...state.providersRoles])
          // console.log(state.organizationRoles, state.providersRoles)
          const role = getRoleById(action.data.role_id, state.organizationRoles)
          // console.log(role)
          action.data['roleName'] = role.name;
          // action.data['description'] = role.description;
  
        }
        if (!action.data.date_created) {
          action.data['date_created'] = Date.now();
        }
        const updatedOrgUsers = [...state.organizationUsers, action.data]

        draft.organizationUsers = updatedOrgUsers;

        break;
      case actionTypes.PROCESSES_CREATED:


        draft.processes = [...state.processes, ...action.data];

        break;
      case actionTypes.NEW_BRIDGE_CREATED:
        let newBridge = action.data;
        newBridge.id = action.id;
        console.log(newBridge)
        draft.bridges = [...state.bridges, newBridge];

        break;
      case ORG_USER_UPDATED:
        console.log('ORG_USER_UPDATED', action.data)
        console.log(state.organizationUsers);
        let orgUsers = [...state.organizationUsers];
        const userToUpdate = orgUsers.find(orgUser => orgUser.user_id == action.data.user_id && orgUser.role_id == action.data.old_role_id) 
        console.log(userToUpdate);
        userToUpdate.role_id = action.data.new_role_id;
        userToUpdate.status = action.data.new_status;
        draft.organizationUsers = orgUsers
        break;
      case TASK_UPDATED:
        console.log('TASK_UPDATED', action)
        let updatedTask = action.data;
        let updatedTasks = [...state.tasks]
        updatedTasks = updatedTasks.filter((task => task.id !== updatedTask.id));
        console.log(updatedTasks)
        console.log(updatedTask)
        updatedTasks.push(updatedTask);
        console.log(updatedTasks)
        draft.tasks = updatedTasks
        break;

      case PROVIDER_ALLOCATED:
        console.log('PROVIDER_ALLOCATED', action.data)

        draft.providers = [...state.providers, {...action.data.provider, ...action.data.connection }]
        
        
        break;
      case NEW_ROLE_CREATED:
        console.log('NEW_ROLE_CREATED', action)
        if (action.newRole.organization_id)
        draft.organizationRoles = [...state.organizationRoles, action.newRole];
        
        break;
      case ORGANIZATION_UPDATED:
        console.log(action)
        
        draft.organization = action.org;
        
        break;
      case PROV_ORG_CONNECTION_UPDATED:
        console.log('PROV_ORG_CONNECTION_UPDATED', action.data);
        console.log(state.organizations);
        const updatedState = [...state.providers];
        let updatedConnection = updatedState.find(
          connection => connection.organization_id === action.data.organization_id 
          && 
          connection.provider_id === action.data.provider_id)
        // draft.providerRoles = [...state.providerRoles, action.newRole];
        updatedConnection.organization_id = action.data.organization_id;
        updatedConnection.provider_id = action.data.provider_id;
        updatedConnection.status = action.data.new_status;
        updatedConnection.remarks = action.data.remarks;
        updatedConnection.provider_code = action.data.provider_code;
        console.log(updatedConnection);
        console.log(updatedState);
        draft.providers = updatedState
        break;
      default:
        return state
    }
  // }
  });

export default organizationReducer;
