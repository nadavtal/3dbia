import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import * as actions from './actions';
import request from '../../utils/request';
import { apiUrl } from '../App/constants';
import {loadError, toggleModal, showNotification, bridgeUpdated} from '../App/actions';
import { elementUpdated, spanUpdated, spanDeleted } from '../BridgeModul/actions'
import { getModalOpen } from '../App/selectors'


function* getSurvey(action) {

  try {
    // Call our request helper (see 'utils/request')
    const survey = yield call(request, apiUrl + 'surveys/' + action.id);
    // console.log(survey);

    // yield put(actions.surveyLoaded(survey[0]));
  } catch (err) {
    yield put(loadError(err));
  }

}

function* getBridge(action) {
  // console.log(action)
  try {
    // Call our request helper (see 'utils/request')
    const bridgeResponse = yield call(request, apiUrl + 'bridges/' + action.id);
    console.log('bridgeResponse', bridgeResponse)
    const bridge = bridgeResponse.basicBridgeInfo[0]
    const folderStructure = bridgeResponse.folderFile && bridgeResponse.folderFile.split(',')
    const bridgeDetails = yield call(request, apiUrl + 'bridges/' + action.id + '/details');
    // console.log(bridgeDetails)
    // const models = yield call(request, apiUrl + 'bridges-models/' + action.id);
    const model = bridge.primary_model_id 
      ? yield call(request, apiUrl + 'bridges/' + action.id + '/model/' + bridge.primary_model_id)
      : null;
     // console.log(models)
    const processes = yield call(request, apiUrl + 'bridges/' + action.id + '/processes');
    // console.log(processes)
    const tasks = yield call(request, apiUrl + 'bridges/' + action.id + '/tasks');
    // console.log(tasks)
    const spans = yield call(request, apiUrl + 'bridges/' + action.id + '/spans');
    // console.log(spans)
    const elements = yield call(request, apiUrl + 'bridges/' + action.id + '/elements');    
    // console.log(elements)
    const surveys = yield call(request, apiUrl + 'bridges/' + action.id + '/surveys');    
    // console.log(surveys)
    const customFieldsTemplate = yield call(request, apiUrl + 'organizations/' + bridge.organization_id + '/custom-fields-templates/tbl_bridge_list');
    const bridgeInfo = {
      bridge: bridge,
      folderStructure: folderStructure,
      bridgeDetails: bridgeDetails[0],
      model: model ? model[0] : null,
      processes,
      tasks,
      spans,
      elements,
      surveys,
      customFieldsTemplate
    }

    yield put(actions.bridgeLoaded(bridgeInfo));
  } catch (err) {
    throw err
    yield put(loadError(err));
  }
}

function* loadSurveyData(action) {

  const survey = action.survey
  try {
    // console.log(action)
    // Call our request helper (see 'utils/request')
    // const url = apiUrl + 'surveys/' + action.surveyId + '/bid/' + action.bid + '/files'
    const url = apiUrl + `surveys/${survey.id}/org/${survey.organization_id}/bid/${survey.bid}/files`
    const surveyFiles = yield call(request, url);
    console.log('surveyFiles', surveyFiles)
    const surveyMessages = yield call(request, apiUrl + 'messages/survey/'+survey.id)
    const surveyModels = yield call(request, apiUrl + 'surveys/' + survey.id + '/models')
    const surveyFilesShort = getFilesImportantData(surveyFiles)
    
    yield put(actions.surveyFilesLoaded({files: surveyFilesShort, models: surveyModels}));
    yield put(actions.surveyMessagesLoaded(surveyMessages));
  } catch (err) {

    yield put(loadError(err));
  }
}

function* getFolderStructure(action) {
  try {
    console.log(action)
    // Call our request helper (see 'utils/request')
    const folder_structure = yield call(request, apiUrl + 'folder_structure/'+action.organization_id);
    // console.log(folder_structure);

    yield put(actions.folderStructureLoaded(folder_structure));
  } catch (err) {
    yield put(loadError(err));
  }
}

export const getFilesImportantData = files => {
  console.log(files)
  const images = files.smallImages.map(file => {
    // console.log(file.name)
    const fullImage = files.fullImages.find(
      fullImagefile => file.name.includes(fullImagefile.name.split(".")[0])
      )
      
    // console.log(fullImage)
    return {
      name: file.name,
      mediaLink: file.metadata.mediaLink,
      size: file.metadata.size,
      updated: file.metadata.updated,
      fullImageName: fullImage ? fullImage.name : null,
      fullImageLink: fullImage ? fullImage.metadata.mediaLink : null,
    };
  })
  const glbModels = files.glbModels.map(model => {
    return {
      name: model.name,
      mediaLink: model.metadata.mediaLink,
      size: model.metadata.size,
      updated: model.metadata.updated,
    }
  })
  const tiles = files.tiles.map(tile => {
    return {
      name: tile.name,
      mediaLink: tile.metadata.mediaLink,
      size: tile.metadata.size,
      updated: tile.metadata.updated,
    }
  })
  return {
    images,
    glbModels,
    tiles
  }
}

function* updateBridgePrimaryModelId(action) {

  try {
    const bridgeUrl = apiUrl + `bridges/${action.bid}/model/${action.modelId}`
    console.log('bridgeUrl', bridgeUrl)
    const updateArgs = {
      method: 'PUT',
      // body: model.id,
    };
    const updatedBridge = yield call(request, bridgeUrl, updateArgs);

  } catch (err) {
    throw err
  }
        
}
function* createNewBridgeModel(action) {
  console.log(action)
  var model = action.data;
  // console.log(model)
  const modalOpen = yield select(getModalOpen);
  // action.project.projectStatus = 'model basic done';
  const url = apiUrl + 'bridges-models';
  const args = {
    method: 'POST',
    body: JSON.stringify(model),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    
    if (modalOpen) yield put(toggleModal())
    if (requestResults.insertId) {
      model.id = requestResults.insertId

      yield put(showNotification({
        message: `${model.name} created`,
        type: 'success'
  
       })
      )
      yield put(actions.newModelCreated(model));
      // if (model.type == 'cad') {
      //   const bridgeUrl = apiUrl + `bridges/${model.bid}/model/${model.id}`
      //   console.log('bridgeUrl', bridgeUrl)
      //   const updateArgs = {
      //     method: 'PUT',
      //     // body: model.id,
      //   }
      //   const updatedBridge = yield call(request, bridgeUrl, updateArgs);
      //   console.log('updatedBridge', updatedBridge)
      // }

    }



  } catch (err) {
    yield put(loadError(err));
    yield put(showNotification({
      message: `Error in creating model`,
      type: 'error'

    })
    )
  }

}

function* editBridge(action) {
  console.log('UPDATING bridge ', action)
  let bridge = action.bridge;

  const url = apiUrl + 'bridges/'+bridge.bid;
  const args = {
    method: 'PUT',
    body: JSON.stringify(bridge),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    if (requestResults.affectedRows == 1) {
      yield put(showNotification({
        message: `${bridge.name} updated`,
        type: `success `,
      })
      )
      yield put(bridgeUpdated(bridge));

    }

  } catch (err) {
    yield put(loadError(err));
  }

}
function* updateModel(action) {
  console.log('UPDATING model ', action)
  let model = action.data;

  const url = apiUrl + 'bridges-models/'+action.bid;
  const args = {
    method: 'PUT',
    body: JSON.stringify(model),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    yield put(showNotification({
      message: `${model.name} updated`,
      type: `success `,

    })
    )
    // yield put(getprocessTemplatesTasks());

  } catch (err) {
    yield put(loadError(err));
  }

}


function* updateSpan(action) {
  console.log('UPDATING span ', action)
  let span = action.data;

  const url = apiUrl + 'bridges-spans/'+action.data.id;
  const args = {
    method: 'PUT',
    body: JSON.stringify(span),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    // console.log(requestResults);

    yield put(showNotification({
      message:`Span ${action.data.id} updated`,
      type: `success`,

    })
    )
    yield put(spanUpdated(span));

  } catch (err) {
    yield put(loadError(err));
  }

}

function* editElement(action) {
  console.log('UPDATING element ', action.data)
  // const element = {...action.data};
  const modalOpen = yield select(getModalOpen);
  const url = apiUrl + 'bridges-elements/'+action.data.object_id;
  const args = {
    method: 'PUT',
    body: JSON.stringify(action.data),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    if (modalOpen) yield put(toggleModal())
    yield put(elementUpdated(action.data));

  } catch (err) {
    yield put(loadError(err));
  }

}
function* updateElements(action) {
  console.log('UPDATING elements ', action)
  let elements = action.data;
  const modalOpen = yield select(getModalOpen);
  const url = apiUrl + 'bridges-elements';
  const args = {
    method: 'PUT',
    body: JSON.stringify(elements),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults)
    if (modalOpen) yield put(toggleModal())
    yield put(actions.elementsUpdated(elements));
    yield put(showNotification({
      message:`${elements.length} elements updated`,
      type: `success`,
    })
    )
 

  } catch (err) {
    yield put(loadError(err));
  }

}


function* updateProjectSurveys(action) {
  // console.log(action.survey.BID, action.survey.ID);
  const url = apiUrl + 'project-surveys';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.survey),
  }

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    console.log(result);
    // const projectUsers =
    // yield put(actions.projectLoaded(project[0]));
  } catch (err) {
    yield put(console.log(err));
  }
}


function* updateProjectUsers(action) {
  // console.log(action.project);
  const url = apiUrl + 'project-users';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.project),
  }

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    // console.log(result);
    // const projectUsers =
    // yield put(actions.projectLoaded(project[0]));
  } catch (err) {
    yield put(console.log(err));
  }
}
function* saveBridgeSpans(action) {
  console.log(action);
  const url = apiUrl + 'bridges/'+action.data[0].bid + '/spans';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.data),
  }

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    console.log(result);
    // if (result.created) yield put(actions.spansCreated(result.created))
    // if (result.updated) yield put(actions.spansUpdated(result.updated))
    if (result) yield put(actions.spansUpdated(result))
  } catch (err) {
    yield put(console.log(err));
  }
}


// function* saveBridgeFormElement(action) {
//   console.log(action);
//   const url = apiUrl + 'bridges/'+action.bid;
//   const args = {
//     method: 'PUT',
//     body: JSON.stringify(action.element),
//   }

//   try {
//     // Call our request helper (see 'utils/request')
//     const result = yield call(request, url, args);
//     console.log(result);
//     // const projectUsers =
//     // yield put(actions.bridgeElementsCreated(action.data));
//   } catch (err) {
//     yield put(console.log(err));
//   }
// }
function* updateSurveyStatus(action) {
  console.log(action);
  const url = apiUrl + 'surveys/'+action.surveyId + '/status/' + action.status ;
  const args = {
    method: 'PUT',
    // body: action.status,
  }

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    console.log(result);
    // const projectUsers =
    // yield put(actions.bridgeElementsCreated(action.data));
  } catch (err) {
    yield put(console.log(err));
  }
}
function* deleteBridgeSpan(action) {
  console.log(action);
  const url = apiUrl + 'spans/'+action.spanId + '/' + action.userId;
  const args = {
    method: 'DELETE',
  }

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    console.log(result);
    if (result.deletedSpan.affectedRows == 1) {
      yield put(spanDeleted(action.spanId))
      yield put(showNotification({
        message:`Span deleted`,
        type: `info`,
  
      })
      )
    }
    // const projectUsers =
    // yield put(actions.bridgeElementsCreated(action.data));
  } catch (err) {
    yield put(console.log(err));
  }
}
function* saveElements(action) {
  console.log(action);
  const url = apiUrl + 'bridges-elements/createUpdateDelete/' + action.userId;
  const args = {
    method: 'POST',
    body: JSON.stringify(action.data)
  }

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    console.log(result);

    // const projectUsers =
    yield put(actions.elementsSaved(action.data));
  } catch (err) {
    yield put(console.log(err));
  }
}
function* updateBridgeDefaultView(action) {
  console.log(action);
  const url = apiUrl + 'bridges/' + action.bid + '/defaultView';
  const args = {
    method: 'PUT',
    body: JSON.stringify(action.view)
  }

  try {
    // Call our request helper (see 'utils/request')
    const result = yield call(request, url, args);
    console.log(result);


  } catch (err) {
    yield put(console.log(err));
  }
}


export default function* projectSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount


  yield takeLatest(actionTypes.GET_BRIDGE, getBridge);
  yield takeLatest(actionTypes.LOAD_SURVEY_DATA, loadSurveyData);
  yield takeLatest(actionTypes.UPDATE_SPAN, updateSpan);
  yield takeLatest(actionTypes.EDIT_ELEMENT, editElement);
  yield takeLatest(actionTypes.UPDATE_SPAN, updateSpan);
  yield takeLatest(actionTypes.UPDATE_ELEMENTS, updateElements);
  yield takeLatest(actionTypes.SAVE_ELEMENTS, saveElements);
  yield takeLatest(actionTypes.SAVE_SPANS, saveBridgeSpans);
  yield takeLatest(actionTypes.UPDATE_MODEL, updateModel);
  yield takeLatest(actionTypes.DELETE_BRIDGE_SPAN, deleteBridgeSpan);  
  yield takeLatest(actionTypes.CREATE_NEW_BRIDGE_MODEL, createNewBridgeModel);
  yield takeLatest(actionTypes.EDIT_BRIDGE, editBridge);
  yield takeLatest(actionTypes.UPDATE_BRIDGE_PRIMARY_MODEL_ID, updateBridgePrimaryModelId);
  yield takeLatest(actionTypes.UPDATE_SURVEY_STATUS, updateSurveyStatus);
  yield takeLatest(actionTypes.UPDATE_BRIDGE_DEFAULT_VIEW, updateBridgeDefaultView);

  yield takeLatest(actionTypes.GET_SURVEY, getSurvey);
  // yield takeLatest(actionTypes.CREATE_NEW_PROCESS, createNewProcess);
  // yield takeLatest(actionTypes.GET_FOLDER_STRUCTURE, getFolderStructure);
  // yield takeLatest(actionTypes.REJECT_PREVIOUS_TASK, rejectPreviousTask);
  // yield takeLatest(actionTypes.SAVE_BRIDGEFORM_ELEMENT, saveBridgeFormElement);


  // yield takeLatest(actionTypes.NEW_PROJECT_CREATED, newProjectCreated);
}
