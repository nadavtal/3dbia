/*
 * AppConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const LOAD_REPOS = 'App/LOAD_REPOS';
export const LOAD_ERROR = 'App/LOAD_ERROR';
export const LOAD_REPOS_SUCCESS = 'App/LOAD_REPOS_SUCCESS';
export const LOAD_USERS_ERROR = 'App/LOAD_USERS_ERROR';
export const MENU_ITEM_CLICKED = 'App/MENU_ITEM_CLICKED';

export const LOGIN_FAIL = 'App/LOGIN_FAIL';
export const TOGGLE_QUICK_PANEL = 'App/TOGGLE_QUICK_PANEL';
export const BRIDGE_SELECTED = 'App/BRIDGE_SELECTED';
export const BRIDGE_UPDATED = 'App/BRIDGE_UPDATED';
export const TASK_UPDATED = 'App/TASK_UPDATED';
export const TASKS_UPDATED = 'App/TASKS_UPDATED';
export const LOAD_USER_SUCCESS = 'App/LOAD_USER_SUCCESS';
export const TOGGLE_MODAL = 'App/TOGGLE_MODAL';
export const SHOW_NOTIFICATION = 'App/SHOW_NOTIFICATION';
export const CLOSE_NOTIFICATION = 'App/CLOSE_NOTIFICATION';
export const TOGGLE_APP_MESSAGES = 'App/TOGGLE_APP_MESSAGES';
export const KEY_PRESSED = 'App/KEY_PRESSED';
export const USERS_LOADED = 'App/USERS_LOADED';
export const PROJECTS_LOADED = 'App/PROJECTS_LOADED';
export const NEW_PROJECT_CREATED = 'App/NEW_PROJECT_CREATED';
export const ROLES_LOADED = 'App/ROLES_LOADED';
export const TOGGLE_ALERT = 'App/TOGGLE_ALERT';
export const SEND_EMAIL = 'App/SEND_EMAIL';
export const ORGANIZATION_ADDED = 'App/ORGANIZATION_ADDED';
export const ALL_DATA_LOADED = 'App/ALL_DATA_LOADED';
export const APP_DATA_LOADED = 'App/APP_DATA_LOADED';
export const PROVIDERS_LOADED = 'App/PROVIDERS_LOADED';
export const ORGANIZATIONS_LOADED = 'App/ORGANIZATIONS_LOADED';
export const PROCESS_TEMPLATE_LOADED = 'App/PROCESS_TEMPLATE_LOADED';
export const NEW_PROCESS_TEMPLATE_TASK_CREATED = 'App/NEW_PROCESS_TEMPLATE_TASK_CREATED';
export const PROCESS_TEMPLATE_TASK_DELETED = 'App/PROCESS_TEMPLATE_TASK_DELETED';
export const PROCESS_TASK_UPDATED = 'App/PROCESS_TASK_UPDATED';
export const ORG_REGISTERED = 'App/ORG_REGISTERED';
export const PROVIDER_ADDED = 'App/PROVIDER_ADDED';
export const NEW_ROLE_CREATED = 'App/NEW_ROLE_CREATED';
export const ORGANIZATION_UPDATED = 'App/ORGANIZATION_UPDATED';
export const USER_ALLOCATED = 'App/USER_ALLOCATED';
export const ROLE_TYPE_CREATED = 'App/ROLE_TYPE_CREATED';
export const PROVIDER_UPDATED = 'App/PROVIDER_UPDATED';
export const PROVIDER_ALLOCATED = 'App/PROVIDER_ALLOCATED';
export const FOUND_RESULTS = 'App/FOUND_RESULTS';
export const ORG_USER_UPDATED = 'App/ORG_USER_UPDATED';
export const ROLE_UPDATED = 'App/ROLE_UPDATED';
export const PROV_ORG_CONNECTION_UPDATED = 'App/PROV_ORG_CONNECTION_UPDATED';
export const PROV_USER_UPDATED = 'App/PROV_USER_UPDATED';
export const USER_UPDATED = 'App/USER_UPDATED';
export const ROLE_SELECTED = 'App/ROLE_SELECTED';
export const TOGGLE_LOADING = 'App/TOGGLE_LOADING';
export const USER_ROLES_UPDATED = 'App/USER_ROLES_UPDATED';
export const MESSAGE_CREATED = 'App/MESSAGE_CREATED';
export const TOGGLE_CHAT = 'App/TOGGLE_CHAT';


export const apiUrl = 'http://localhost:3000/api/v1/';
