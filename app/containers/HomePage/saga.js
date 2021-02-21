/**
 * Gets the repositories of the user from Github
 */

import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import { push } from "react-router-redux";
import request from 'utils/request';
import { makeSelectUsername } from 'containers/HomePage/selectors';
import { apiUrl, SEND_CONFIRMATION } from '../App/constants';

/**
 * Github repos request/response handler
 */
export function* getRepos() {
  // Select username from store
  const username = yield select(makeSelectUsername());
  const requestURL = `https://api.github.com/users/${username}/repos?type=all&sort=updated`;

  try {
    // Call our request helper (see 'utils/request')
    const repos = yield call(request, requestURL);
    yield put(reposLoaded(repos, username));
  } catch (err) {
    yield put(repoLoadingError(err));
  }
}

// console.log = function() {}

// function redirectByRole(roles, user) {
//   for (const roleType of roles) {
//     // console.log(roleType.roletypeId)
//     switch (roleType.roletypeId) {
//       case 1:
//         yield put(push('/admin/'));
//         break;
//       case 2:
//         yield put(push('/organizations/'+ userOrganizationRoles[0].organization_id));
//         break;
//       case 3:
//         yield put(push('/providers/'+ userProviderRoles[0].provider_id));
//         break;

//       default:
//         yield put(push('/users/'+ user.id));
//       break;
//     }
//   }
// }




/**
 * Root saga manages watcher lifecycle
 */
export default function* homepageData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount


  


}
