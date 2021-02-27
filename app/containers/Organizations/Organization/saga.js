import { call, put, takeEvery, takeLatest, all, take } from 'redux-saga/effects';
import * as actionTypes from './constants';
import { UPDATE_TASK } from '../../AppData/constants'
import { convertToMySqlDateFormat } from 'utils/dateTimeUtils';
import { taskUpdated } from '../../AppData/actions'
import { showNotification } from 'containers/App/actions'
import * as actions from './actions';
import request from 'utils/request';
import { loadError } from 'containers/App/actions';

import { apiUrl } from '../../App/constants';



function* createProcessesInDB(action) {
  // console.log(action);
  const url = apiUrl + 'processes/'
  try {
    const args = {

      method: 'POST',
      body: JSON.stringify(action.data),
    }
    const processes = yield call(request, url, args);
    console.log(processes)
    // yield put(actions.projectLoaded(project[0]));
  } catch (err) {
    yield put(loadError(err));
  }
}
function* createTasksInDB(action) {
  console.log(action);
  const url = apiUrl + 'tasks/'
  try {
    const args = {

      method: 'POST',
      body: JSON.stringify(action.data),
    }
    const tasks = yield call(request, url, args);
    console.log(tasks)
    // yield put(actions.projectLoaded(project[0]));
  } catch (err) {
    yield put(loadError(err));
  }
}

function* getProcessesByProjectId(action) {
  // console.log('getProcessesByProjectId')
  try {
    // Call our request helper (see 'utils/request')

    const processes = yield call(request, apiUrl + 'projects/'+ action.id +'/processes');
    // console.log(processes)
    yield put(actions.projectProcessesLoaded(processes));
  } catch (err) {
    yield put(loadError(err));
  }

}
function* getTasksByOrgIds(action) {
  // console.log('getProcessesByProjectId')
  try {

    // const surveys = yield call(
    //   request,
    //   apiUrl + 'organizations/' + action.orgId + '/surveys'
    // );

    const tasks = yield call(
      request,
      apiUrl + 'organizations/' + action.orgId + '/tasks',
    );
    // const processesTasks = yield call(
    //   request,
    //   apiUrl +
    //     'organizations/' +
    //     action.orgId +
    //     '/processes-tasks'
    // );

    // const processesTemplates = yield call(
    //   request,
    //   apiUrl + 'organizations/' + action.orgId + '/process-templates'
    // );
    yield put(actions.surveysTasksAndProcessesLoaded({
      // surveys,
      tasks,
      // processesTasks,
      // processesTemplates,
    }))
  } catch (err) {
    yield put(loadError(err));
  }

}
function* createNewSurveys(action) {
  console.log(action)
  try {

    const args = {

      method: 'POST',
      body: JSON.stringify(action.data),
    }
    const requestresults = yield call(request, apiUrl + 'surveys', args);
    console.log(requestresults)
    if (requestresults.insertId)
    yield put(actions.surveysCreated(action.data));
  } catch (err) {
    yield put(loadError(err));
  }

}
function* createSurveyAndTasks(newSurvey ,templateTasks)  {

  try {

    const args = {

      method: 'POST',
      body: JSON.stringify({
        survey: newSurvey,
        templateTasks: templateTasks
      }),
    }
    const survey = yield call(request, apiUrl + 'surveys', args);
    console.log(survey)
    if (survey.surveyResult.insertId) {
      // yield put(
      //   showNotification({
      //     message: `${survey.name} survey created`,
      //     type: `success `,
      //   }),
      // );
      newSurvey.id = survey.surveyResult.insertId
      return newSurvey
    }
    
  } catch (err) {
    yield put(loadError(err));
  }

}


function* createSurveysAndTasks(action) {
  console.log(action)
  const results = yield all(

    action.surveys.map(survey => createSurveyAndTasks(survey, action.templatetasks))
  );
  console.log(results)

  
  return results


}

function* createNewBridge(action) {
  console.log(action)
  var bridge = action.data;
  // console.log(survey)
  // action.project.projectStatus = 'bridge basic done';
  const url = apiUrl + 'bridges';
  const args = {
    method: 'POST',
    body: JSON.stringify(bridge),
  }
  
  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    yield put(actions.newBridgeCreated(bridge, requestResults.newBridgeId));
    if (modalOpen) yield put(toggleModal())
    yield put(toggleModal())

  } catch (err) {
    yield put(console.log(err));
  }

}
function* allocateSurveys(action) {
  console.log(action)
  console.log(action.surveys)
  console.log(action.templatetasks)
  try {
    const surveys = yield all(
      action.surveys.map(survey => createSurveyAndTasks(survey, action.templatetasks))
    );
    console.log('surveys', surveys)
    if (surveys.length) {
      yield put(actions.surveysCreated(action.surveys));
      yield put(
        showNotification({
          message: `${surveys.length} created`,
          type: `success `,
        }),
      );

    }

  } catch (err) {
    yield put(loadError(err));
  }
  // const args = {

  //   method: 'POST',
  //   body: JSON.stringify({
  //     surveys: action.surveys,
  //     templateTasks: action.templatetasks
  //   }),
  // }

  // const newSurveysResults = yield call(request, apiUrl + 'surveys', args);
  // console.log(newSurveysResults)
  // }
  // const results = yield all(
  //   action.surveys.map(survey => {
      // const args = {

      //   method: 'POST',
      //   body: JSON.stringify({
      //     survey: survey,
      //     templateTasks: action.templateTasks
      //   })
      // }
  //     return call(request, apiUrl + 'surveys', args);
  //     // console.log(survey)
  //   })
  // );
  // const tasks = action.surveys.map(survey => call(request, apiUrl + 'surveys', {
  //   method: 'POST',
  //   body: JSON.stringify({
  //     survey: survey,
  //     templateTasks: action.templateTasks
  //   })
  // }))
  // console.log(tasks)
  // const results = yield all(tasks)
  // console.log(results)
}
export default function* organizationsSaga() {

  
  yield takeLatest(actionTypes.CREATE_PROCESSES_IN_DB, createProcessesInDB);
  yield takeLatest(actionTypes.GET_PROCESSES_BY_PROJECT_ID, getProcessesByProjectId);
  yield takeLatest(actionTypes.CREATE_TASKS_IN_DB, createTasksInDB);
  yield takeLatest(actionTypes.CREATE_NEW_SURVEYS, createNewSurveys);
  yield takeLatest(actionTypes.CREATE_SURVEYS_AND_TASKS, createSurveysAndTasks);
  yield takeLatest(actionTypes.ALLOCATE_SURVEYS, allocateSurveys);
  yield takeEvery(actionTypes.CREATE_SURVEY_AND_TASKS, createSurveyAndTasks);
  yield takeLatest(actionTypes.CREATE_NEW_BRIDGE, createNewBridge);
  yield takeLatest(actionTypes.GET_SURVEYS_TASKS_AND_PROCESSES, getTasksByOrgIds);
}
