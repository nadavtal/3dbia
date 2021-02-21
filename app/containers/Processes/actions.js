import * as actionTypes from './constants';


/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function createProcessTask(data) {
  // console.log('user')
  return {
    type: actionTypes.CREATE_PROCESS_TASK,
    data,
  };
}
export function updateProcessTask(data) {
  // console.log('user')
  return {
    type: actionTypes.UPDATE_PROCESS_TASK,
    data,

  };
}
export function updateProcessTasks(data) {
  // console.log('user')
  return {
    type: actionTypes.UPDATE_PROCESS_TASKS,
    data,

  };
}
export function deleteProcessTask(id) {
  // console.log('user')
  return {
    type: actionTypes.DELETE_PROCESS_TASK,
    id,

  };
}
export function updateProcessByProcessName(processName, updatedProcessData) {
  // console.log('user')
  return {
    type: actionTypes.UPDATE_PROCESS_BY_PROCESS_NAME,
    processName,
    updatedProcessData
  };
}





