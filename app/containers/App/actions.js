
import * as actionTypes from './constants';
import { browserHistory } from 'react-router'

/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */


/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function menuItemClicked(menuItem) {
  return {
    type: actionTypes.MENU_ITEM_CLICKED,
    menuItem
  };
}

export function taskUpdated(data) {

  return {
    type: actionTypes.TASK_UPDATED,
    data,

  };
}
export function userRolesUpdated(users) {

  return {
    type: actionTypes.USER_ROLES_UPDATED,
    users,

  };
}
export function toggleChat(showChat) {

  return {
    type: actionTypes.TOGGLE_CHAT,
    showChat,

  };
}
export function bridgeUpdated(bridge) {

  return {
    type: actionTypes.BRIDGE_UPDATED,
    bridge,

  };
}
export function tasksUpdated(data) {

  return {
    type: actionTypes.TASKS_UPDATED,
    data,

  };
}
/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function reposLoaded(repos, username) {
  return {
    type: actionTypes.LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

/**
 * Dispatched when the repositories are loaded by the request saga
 *
 * @param  {array} repos The repository data
 * @param  {string} username The current username
 *
 * @return {object}      An action object with a type of LOAD_REPOS_SUCCESS passing the repos
 */
export function userLoaded(userData) {
  // browserHistory.push('/organizations')
  console.log(browserHistory)
  return {
    type: actionTypes.LOAD_USER_SUCCESS,
    userData,
  };
}


/**
 * Dispatched when loading the repositories fails
 *
 * @param  {object} error The error
 *
 * @return {object}       An action object with a type of LOAD_USERS_ERROR passing the error
 */
export function repoLoadingError(error) {
  return {
    type: actionTypes.LOAD_USERS_ERROR,
    error,
  };
}
export function foundResults(data) {
  return {
    type: actionTypes.FOUND_RESULTS,
    data,
  };
}
export function loadError(error) {
  console.log(error)
  return {
    type: actionTypes.LOAD_ERROR,
    error,
  };
}
export function toggleLoadingSpinner(msg) {
 
  return {
    type: actionTypes.TOGGLE_LOADING,
    msg,
  };
}
export function messageCreated(msg) {
 
  return {
    type: actionTypes.MESSAGE_CREATED,
    msg,
  };
}

export function toggleQuickPanel(quickPanelBody) {
 
  return {
    type: actionTypes.TOGGLE_QUICK_PANEL,
    quickPanelBody
  };
}
export function toggleModal(modalData) {
 
  return {
    type: actionTypes.TOGGLE_MODAL,
    modalData: modalData
  };
}
export function toggleAlert(data) {
  
  return {
    type: actionTypes.TOGGLE_ALERT,
    data: data
  };
}
export function roleSelected(role) {
  
  return {
    type: actionTypes.ROLE_SELECTED,
    role
  };
}

export function showNotification(data) {
  // console.log(data)
  return {
    type: actionTypes.SHOW_NOTIFICATION,
    data: data
  };
}



export function usersLoaded(data) {

  return {
    type: actionTypes.USERS_LOADED,
    data

  };
}
export function loginFail(data) {
  console.log('alskjalskjslkjs')
  return {
    type: actionTypes.LOGIN_FAIL,
    data

  };
}
export function projectsLoaded(data) {

  return {
    type: actionTypes.PROJECTS_LOADED,
    data

  };
}

export function newProjectCreated(project) {

  return {
    type: actionTypes.NEW_PROJECT_CREATED,
    project
  };
}
export function closeNotification(project) {

  return {
    type: actionTypes.CLOSE_NOTIFICATION,
  };
}

export function rolesLoaded(roles) {

  return {
    type: actionTypes.ROLES_LOADED,
    roles: roles
  };
}

export function appDataLoaded(data) {

  return {
    type: actionTypes.APP_DATA_LOADED,
    data
  };
}
export function providersLoaded(data) {

  return {
    type: actionTypes.PROVIDERS_LOADED,
    data: data
  };
}
export function organizationsLoaded(data) {

  return {
    type: actionTypes.ORGANIZATIONS_LOADED,
    data: data
  };
}

export function newProcessTemplateTaskCreated(data) {

  return {
    type: actionTypes.NEW_PROCESS_TEMPLATE_TASK_CREATED,
    data,
  };
}
export function processTemplatesTasksLoaded(data) {
  // console.log('Provider')
  return {
    type: actionTypes.PROCESS_TEMPLATE_LOADED,
    data,
  };
}
export function processTaskDeleted(id) {
  // console.log(id)
  return {
    type: actionTypes.PROCESS_TEMPLATE_TASK_DELETED,
    id,
  };
}
export function processTaskUpdated(data) {
  // console.log(data)
  return {
    type: actionTypes.PROCESS_TASK_UPDATED,
    data
  };
}
export function orgRegistered(data) {
  // console.log(data)
  return {
    type: actionTypes.ORG_REGISTERED,
    data
  };
}
export function keyPressed(data) {
  console.log(data)
  return {
    type: actionTypes.KEY_PRESSED,
    data
  };
}
export function sendEmail(data) {
  console.log(data)
  return {
    type: actionTypes.SEND_EMAIL,
    data
  };
}

export function allDataLoaded(data) {
  
  return {
    type: actionTypes.ALL_DATA_LOADED,
    data
  };
}

export function organizationAdded(org, users) {
  return {
    type: actionTypes.ORGANIZATION_ADDED,
    org,
    users
  };
}
export function organizationUpdated(org, users) {
  return {
    type: actionTypes.ORGANIZATION_UPDATED,
    org,
    users
  };
}
export function providerUpdated(data) {
  return {
    type: actionTypes.PROVIDER_UPDATED,
    data
  };
}

export function providerAdded(provider, users) {
  return {
    type: actionTypes.PROVIDER_ADDED,
    provider,
    users
  };
}
export function newRoleCreated(newRole) {

  return {
    type: actionTypes.NEW_ROLE_CREATED,
    newRole
  };
}
export function userAllocated(data) {
  
  return {
    type: actionTypes.USER_ALLOCATED,
    data
  };
}
export function newRoleTypeCreated(data) {
  
  return {
    type: actionTypes.ROLE_TYPE_CREATED,
    data
  };
}
export function providerAllocated(data) {
  
  return {
    type: actionTypes.PROVIDER_ALLOCATED,
    data
  };
}

export function organizationUserUpdated(data) {
  
  return {
    type: actionTypes.ORG_USER_UPDATED,
    data
  };
}
export function providerOrganizationConnectionUpdated(data) {
  
  return {
    type: actionTypes.PROV_ORG_CONNECTION_UPDATED,
    data
  };
}
export function providerUserUpdated(data) {
  
  return {
    type: actionTypes.PROV_USER_UPDATED,
    data
  };
}
export function userUpdated(data) {
  
  return {
    type: actionTypes.USER_UPDATED,
    data
  };
}
export function roleUpdated(data) {
  
  return {
    type: actionTypes.ROLE_UPDATED,
    data
  };
}

export function bridgeSelected(bid) {

    return {
      type: actionTypes.BRIDGE_SELECTED,
      bid,
    };
  }

