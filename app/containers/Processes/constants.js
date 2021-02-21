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

export const CREATE_PROCESS_TASK = 'boilerplate/processTemplate/CREATE_PROCESS_TASK';
export const UPDATE_PROCESS_TASK = 'boilerplate/processTemplate/UPDATE_PROCESS_TASK';
export const UPDATE_PROCESS_TASKS = 'boilerplate/processTemplate/UPDATE_PROCESS_TASKS';
export const DELETE_PROCESS_TASK = 'boilerplate/processTemplate/DELETE_PROCESS_TASK';
export const UPDATE_PROCESS_BY_PROCESS_NAME = 'boilerplate/processTemplate/UPDATE_PROCESS_BY_PROCESS_NAME';




