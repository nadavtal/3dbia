/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import { loadError,toggleModal, sendEmail } from 'containers/App/actions';
import { push } from "react-router-redux";
import request from 'utils/request';
import { userConfirmed } from './actions';
import { apiUrl } from '../App/constants';

function* sendConfirmation(action) {
  console.log(action)
  let url
  switch (action.confirmationType) {
    case "organizationUserAllocation":
      url = apiUrl + 'organization-users/confirmation'
      break;
    case "newUserConfirmation":
      url = apiUrl + 'users/confirmation'
      break;
  
    default:
      break;
  }
  
  const args = {
    method: 'POST',
    body: JSON.stringify({token: action.token}),
  }

  try {
    // Call our request helper (see 'utils/request')
    const requestResults = yield call(request, url, args);
    console.log(requestResults);
    yield put(userConfirmed())
    // yield put(push('/organizations/'+requestResults.insertId));
  } catch (err) {
    console.log(err)
    yield put(loadError(err));
  }

}



/**
 * Root saga manages watcher lifecycle
 */
export default function* homepageData() {

  yield takeLatest(actionTypes.SEND_CONFIRMATION, sendConfirmation);


}
