import * as actionTypes  from './constants';




export function updloadProject(projectId) {

  return {
    type: actionTypes.UPLOAD_PROJECT,
    projectId,
  };
}

export function createNewProject(project, event) {

  return {
    type: actionTypes.CREATE_NEW_PROJECT,
    project,
    event
  };
}




