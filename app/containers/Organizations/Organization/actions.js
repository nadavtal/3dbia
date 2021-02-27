import * as actionTypes from './constants';


/**
 * Changes the input field of the form
 *
 * @param  {string} Organizationname The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_OrganizationNAME
 */
// export function getOrganizationbyId(id) {
//   console.log(id)
//   return {
//     type: actionTypes.GET_ORGANIZATION_BY_ID,
//     id,
//   };
// }
export function organizationLoaded(data) {
  // console.log('organization')
  return {
    type: actionTypes.ORGANIZATION_LOADED,
    data,
  };
}
// export function bridgeSelected(bid) {

//     return {
//       type: actionTypes.BRIDGE_SELECTED,
//       bid,
//     };
//   }
export function setSelectedComponent(componentName) {

    return {
      type: actionTypes.SET_SELECTED_COMPONENT,
      componentName,
    };
  }
export function getTasksByOrgId(orgId) {

    return {
      type: actionTypes.GET_SURVEYS_TASKS_AND_PROCESSES,
      orgId,
    };
  }
export function surveysTasksAndProcessesLoaded(data) {

    return {
      type: actionTypes.SURVEYS_TASKS_AND_PROCESSES_LOADED,
      data,
    };
  }

export function processesCreated(data) {
  // console.log('organization')
  return {
    type: actionTypes.PROCESSES_CREATED,
    data,
  };
}
export function createProcessesInDB(data) {
  // console.log('organization')
  return {
    type: actionTypes.CREATE_PROCESSES_IN_DB,
    data,
  };
}
export function createTasksInDB(data) {
  // console.log('organization')
  return {
    type: actionTypes.CREATE_TASKS_IN_DB,
    data,
  };
}

export function organizationProjectCreated(project, id) {

  return {
    type: actionTypes.ORGANIZATION_PROJECT_CREATED,
    project,
    id
  };
}
export function getProcessesByProjectId(id) {

  return {
    type: actionTypes.GET_PROCESSES_BY_PROJECT_ID,
    id
  };
}




export function projectProcessesLoaded(data) {

  return {
    type: actionTypes.PROJECT_PROCESSES_LOADED,
    data,

  };
}
export function createNewSurveys(data) {

  return {
    type: actionTypes.CREATE_NEW_SURVEYS,
    data,

  };
}
export function createSurveyAndTasks(survey, templateTasks) {
  // console.log(survey, templateTasks)
  return {
    type: actionTypes.CREATE_SURVEY_AND_TASKS,
    survey,
    templateTasks
  };
}
export function createSurveysAndTasks(surveys, process, templatetasks) {
  // console.log(survey, templateTasks)
  return {
    type: actionTypes.CREATE_SURVEYS_AND_TASKS,
    surveys, process, templatetasks
  };
}
export function allocateSurveys(surveys, process, templatetasks) {
  
  return {
    type: actionTypes.ALLOCATE_SURVEYS,
    surveys, process, templatetasks
  };
}
export function surveysCreated(data) {

  return {
    type: actionTypes.SURVEYS_CREATED,
    data,

  };
}
export function createNewBridge(data) {

  return {
    type: actionTypes.CREATE_NEW_BRIDGE,
    data
  };
}
export function newBridgeCreated(data) {

  return {
    type: actionTypes.NEW_BRIDGE_CREATED,
    data
  };
}





