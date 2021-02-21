import { call, put, select, takeLatest } from 'redux-saga/effects';
import { projectsLoaded } from '../App/actions'
import * as actionTypes from './constants';
import * as actions from './actions';
import { organizationProjectCreated } from '../Organizations/Organization/actions'
import request from 'utils/request';
import { toggleModal, showNotification} from '../App/actions'
import { push } from "react-router-redux";

import * as projectsPageAcions from './actions'


import { apiUrl } from '../App/constants';



function* createNewProject(action) {
  console.log(action.project)
  // action.project.projectStatus = 'bridge basic done'
  const url = apiUrl + 'projects';
  const args = {
    method: 'POST',
    body: JSON.stringify(action.project),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    yield put(toggleModal())
    yield put(organizationProjectCreated(action.project, requestResults.insertId))
    yield put(showNotification({
      message:`Project ${action.project.name} created`,
      title: `Success`,
      icon: 'check-circle',
      text: '',
      autohide: 3000

    })
    )
    // yield put(push('/organizations/'+ action.project.organization_id + '/projects/'+ requestResults.newProjectId));
    // action.project.ID = requestResults.newProjectId;
    // if (action.project.uavOperators.length) {
    //   const projectUsers = yield updateProjectUsers(action);
    //   console.log(projectUsers)
    //   yield put(newProjectCreated(action.project));

    // } else {
    //   yield put(newProjectCreated(action.project));
    // }

  } catch (err) {
    yield put(console.log(err));
  }

}


export default function* projectsSaga() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actionTypes.CREATE_NEW_PROJECT, createNewProject);

}
