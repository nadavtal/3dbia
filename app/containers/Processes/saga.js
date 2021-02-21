import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants'
import request from 'utils/request';
import { loadError, newProcessTemplateTaskCreated, processTaskDeleted, processTaskUpdated, toggleModal, showNotification } from 'containers/App/actions';
import { getprocessTemplatesTasks } from 'containers/AppData/actions'
import { apiUrl } from '../App/constants';
import { makeSelectModalOpen, getModalOpen } from 'containers/App/selectors'


function* createProcessTask(action) {
  console.log('CREATE', action)
  var task = action.data;
  // console.log(survey)
  // action.project.projectStatus = 'task basic done';
  const url = apiUrl + 'process-template-tasks';
  const args = {
    method: 'POST',
    body: JSON.stringify(task),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    task.id = requestResults.newProcessTaskId
    yield put(newProcessTemplateTaskCreated(task));

  } catch (err) {
    yield put(loadError(err));
  }

}

function* getProcessTasksByOrgName(action) {

  try {
    // Call our request helper (see 'utils/request')
    const processes = yield call(request, apiUrl + 'process-template-tasks/' + action.name);
    yield put(newProcessTemplateTaskCreated(task));

  } catch (err) {
    yield put(loadError(err));
  }
}
function* updateProcessTask(action) {
  console.log('UPDATING ', action)
  var task = action.data;
  const modalOpen = yield select(getModalOpen);

  // console.log(modalOpen)
  // action.project.projectStatus = 'task basic done';
  const url = apiUrl + 'process-template-tasks/'+action.data.id;
  const args = {
    method: 'PUT',
    body: JSON.stringify(task),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);

    yield put(processTaskUpdated(task));
    if (modalOpen) yield put(toggleModal())
    yield put(showNotification({
      message:`Task updated`,
      title: `Success`,
      icon: 'check-circle',
      text: '',
      autohide: 3000

    })
    )
  } catch (err) {
    // console.log(err)
    yield put(loadError(err));
  }

}
function* deleteProcessTask(action) {
  console.log('DELETING PROCESS TASK: ', action.id)

  // console.log(survey)
  // action.project.projectStatus = 'task basic done';
  const url = apiUrl + 'process-template-tasks/'+action.id;
  const args = {
    method: 'DELETE',

  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);

    yield put(processTaskDeleted(requestResults.deletedTaskId));

  } catch (err) {
    yield put(loadError(err));
  }

}
function* updateProcessTasks(action) {
  console.log('UPDATING PROCESS TASKS ', action)
  var tasks = action.data;
  // console.log(tasks)
  // action.project.projectStatus = 'task basic done';
  const url = apiUrl + 'process-template-tasks/';
  const args = {
    method: 'PUT',
    body: JSON.stringify(tasks),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);

    yield put(getprocessTemplatesTasks());

  } catch (err) {
    yield put(loadError(err));
  }

}
// function* updateProcessByProcessName(action) {
//   console.log('UPDATING PROCESS BY PROCESS NAME ', action)

//   const url = apiUrl + 'process-template-tasks/';
//   const args = {
//     method: 'PUT',
//     body: JSON.stringify(tasks),
//   }

//   try {
//     // Call our request helper (see 'utils/request')
//     const requestResults = yield call(request, url, args);
//     console.log(requestResults);

//     // yield put(newProjectCreated(action.project));

//   } catch (err) {
//     yield put(loadError(err));
//   }

// }



export default function* processesSaga() {

  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actionTypes.CREATE_PROCESS_TASK, createProcessTask);
  yield takeLatest(actionTypes.UPDATE_PROCESS_TASK, updateProcessTask);
  yield takeLatest(actionTypes.UPDATE_PROCESS_TASKS, updateProcessTasks);
  yield takeLatest(actionTypes.DELETE_PROCESS_TASK, deleteProcessTask);
  // yield takeLatest(actionTypes.GET_PROCESS_TASKS_BY_ORG_NAME, getProcessTasksByOrgName);
  // yield takeLatest(actionTypes.UPDATE_PROCESS_BY_PROCESS_NAME, updateProcessByProcessName);



}
