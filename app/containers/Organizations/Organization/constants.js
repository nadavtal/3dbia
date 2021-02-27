/*
 * HomeConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */


export const ORGANIZATION_LOADED = 'organization/ORGANIZATION_LOADED';
export const ORGANIZATION_PROJECT_CREATED = 'organization/ORGANIZATION_PROJECT_CREATED';
export const SET_SELECTED_COMPONENT = 'organization/SET_SELECTED_COMPONENT';
export const PROCESSES_CREATED = 'organization/PROCESSES_CREATED';
export const CREATE_NEW_SURVEYS = 'organization/CREATE_NEW_SURVEYS';
export const SURVEYS_CREATED = 'organization/SURVEYS_CREATED';
export const CREATE_NEW_BRIDGE = 'organization/CREATE_NEW_BRIDGE';
export const NEW_BRIDGE_CREATED = 'organization/NEW_BRIDGE_CREATED';
export const CREATE_PROCESSES_IN_DB = 'organization/CREATE_PROCESSES_IN_DB';
export const CREATE_TASKS_IN_DB = 'organization/CREATE_TASKS_IN_DB';
export const GET_PROCESSES_BY_PROJECT_ID = 'organization/GET_PROCESSES_BY_PROJECT_ID';
export const PROJECT_PROCESSES_LOADED = 'organization/PROJECT_PROCESSES_LOADED';
export const CREATE_SURVEY_AND_TASKS = 'organization/CREATE_SURVEY_AND_TASKS';
export const CREATE_SURVEYS_AND_TASKS = 'organization/CREATE_SURVEYS_AND_TASKS';
export const ALLOCATE_SURVEYS = 'organization/ALLOCATE_SURVEYS';
export const GET_SURVEYS_TASKS_AND_PROCESSES = 'organization/GET_SURVEYS_TASKS_AND_PROCESSES';
export const SURVEYS_TASKS_AND_PROCESSES_LOADED = 'organization/SURVEYS_TASKS_AND_PROCESSES_LOADED';
// export const BRIDGE_SELECTED = 'organization/BRIDGE_SELECTED';




