import * as actionTypes from './constants';

// import {TOGGLE_MESSAGES} from 'containers/App/constants'

/**
 * Changes the input field of the form
 *
 * @param  {string} projectId the ID of the project
 *
 * @return {object} An action object with a type of UPLOAD_PROJECT
 */
export function editBridge(bridge) {
  if (bridge.main_image && bridge.main_image.length) {
    console.log(typeof bridge.main_image);
    const file = bridge.main_image[0];
    console.log(file.name);
    bridge.main_image_name = file.name;
    bridge.main_image_type = file.type;
    bridge.main_image_size = file.size;
    // console.log(JSON.stringify(file))
    // return {
    //   type: actionTypes.EDIT_BRIDGE_MAIN_IMAGE,
    //   bridge: bridge.main_image[0],
    //   bid
    // }
  }
  return {
    type: actionTypes.EDIT_BRIDGE,
    bridge,
  };
}

export function getBridge(id, orgId) {
  return {
    type: actionTypes.GET_BRIDGE,
    id,
    orgId,
  };
}
export function deleteModel(modelId, bucketName, prefix) {
  return {
    type: actionTypes.DELETE_MODEL,
    modelId,
    bucketName,
    prefix,
  };
}
export function modelDeleted(modelId) {
  return {
    type: actionTypes.MODEL_DELETED,
    modelId,
  };
}

export function showInView(view, componentName, mode, id = null) {
  return {
    type: actionTypes.SHOW_IN_VIEW,
    view,
    componentName,
    mode,
    id,
  };
}
export function surveyMessagesLoaded(messages) {
  return {
    type: actionTypes.SURVEY_MESSAGES_LOADED,
    messages,
  };
}
export function loadSurveyData(survey) {
  return {
    type: actionTypes.LOAD_SURVEY_DATA,
    survey,
  };
}

export function surveyFilesLoaded(data) {
  return {
    type: actionTypes.SURVEY_FILES_LOADED,
    data,
  };
}

export function setSharedState(key, value) {
  return {
    type: actionTypes.SET_SHARED_STATE,
    key,
    value,
  };
}

// export function setDisplayFolder(folder) {

//   return {
//     type: actionTypes.SET_DISPLAY_FOLDER,
//     folder
//   };
// }

export function updateElements(data) {
  console.log(data);
  return {
    type: actionTypes.UPDATE_ELEMENTS,
    data,
  };
}
export function elementsUpdated(data) {
  return {
    type: actionTypes.ELEMENTS_UPDATED,
    data,
  };
}

export function updateSpan(data) {
  // console.log(data)
  return {
    type: actionTypes.UPDATE_SPAN,
    data,
  };
}
export function spanUpdated(data) {
  // console.log(data)
  return {
    type: actionTypes.SPAN_UPDATED,
    data,
  };
}

export function spanDeleted(spanId) {
  // console.log(spanId)
  return {
    type: actionTypes.SPAN_DELETED,
    spanId,
  };
}
export function saveSpans(data) {
  console.log('SAVING SPANSSSSSSSSSSS', data);
  return {
    type: actionTypes.SAVE_SPANS,
    data,
  };
}
export function spansCreated(data) {
  // console.log(data)
  return {
    type: actionTypes.SPANS_CREATED,
    data,
  };
}
export function spansUpdated(data) {
  // console.log(data)
  return {
    type: actionTypes.SPANS_UPDATED,
    data,
  };
}
export function editElement(data) {
  return {
    type: actionTypes.EDIT_ELEMENT,
    data,
  };
}

export function elementUpdated(data) {
  // console.log(data)
  return {
    type: actionTypes.ELEMENT_UPDATED,
    data,
  };
}
export function updateBridgePrimaryModelId(bid, modelId) {
  // console.log(data)
  return {
    type: actionTypes.UPDATE_BRIDGE_PRIMARY_MODEL_ID,
    bid,
    modelId,
  };
}

export function saveElements(data, userId) {
  // console.log(data)
  return {
    type: actionTypes.SAVE_ELEMENTS,
    data,
    userId,
  };
}
export function elementsSaved(data) {
  // console.log(data)
  return {
    type: actionTypes.ELEMENTS_SAVED,
    data,
  };
}

// ///////////////////////////

export function createNewBridgeModel(data) {
  return {
    type: actionTypes.CREATE_NEW_BRIDGE_MODEL,
    data,
  };
}

export function newModelCreated(model) {
  return {
    type: actionTypes.NEW_MODEL_CREATED,
    model,
  };
}

export function getSurvey(id) {
  // console.log(id)
  return {
    type: actionTypes.GET_SURVEY,
    id,
  };
}

export function bridgeLoaded(data) {
  return {
    type: actionTypes.BRIDGE_LOADED,
    data,
  };
}
// export function bridgeModelsLoaded(data) {

//   return {
//     type: actionTypes.BRIDGE_MODELS_LOADED,
//     data
//   }
// }

export function updateSurveyStatus(status, surveyId) {
  return {
    type: actionTypes.UPDATE_SURVEY_STATUS,
    status,
    surveyId,
  };
}

export function updateModel(data) {
  // console.log(componentName)
  return {
    type: actionTypes.UPDATE_MODEL,
    data,
  };
}

export function deleteBridgeSpan(spanId, userId) {
  // console.log(spanId)
  return {
    type: actionTypes.DELETE_BRIDGE_SPAN,
    spanId,
    userId,
  };
}

export function getFolderStructure(organization_id) {
  // console.log(data)
  return {
    type: actionTypes.GET_FOLDER_STRUCTURE,
    organization_id,
  };
}
export function folderStructureLoaded(data) {
  // console.log(data)
  return {
    type: actionTypes.FOLDER_STRUCTURE_LOADED,
    data,
  };
}
export function rejectPreviousTask(task) {
  // console.log(data)
  return {
    type: actionTypes.REJECT_PREVIOUS_TASK,
    task,
  };
}

export function updateBridgeDefaultView(view, bid) {
  return {
    type: actionTypes.UPDATE_BRIDGE_DEFAULT_VIEW,
    view,
    bid,
  };
}
