import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';

export function* addRoleSaga(action) {
  // yield localStorage.removeItem('token');
  // yield localStorage.removeItem('expirationDate');
  // yield localStorage.removeItem('userId');
  yield console.log(action)
  // yield put({
  //   type: actionTypes.ADD_ROLE
  // })

}

export function* addPermissionSaga(action) {

  yield console.log(action)
  // yield put({
  //   type: actionTypes.ADD_ROLE
  // })

}


export default function* rolesData() {
  // Watches for LOAD_REPOS actions and calls getRepos when one comes in.
  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actionTypes.ADD_ROLE, addRoleSaga);
  yield takeLatest(actionTypes.ADD_PERMISSION, addPermissionSaga);
}
