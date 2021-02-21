import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import * as actions from './actions';
import request from 'utils/request';
import { apiUrl } from 'containers/App/constants';
import {loadError, toggleModal, showNotification} from 'containers/App/actions';



function* saveBridgeFormElement(action) {
  console.log(action);
  const url = apiUrl + 'bridges/'+action.bid;
  const args = {
    method: 'PUT',
    body: JSON.stringify(action.element),
  }

  try {

    const result = yield call(request, url, args);
    console.log(result);

  } catch (err) {
    yield put(console.log(err));
  }
}


export default function* bridgeFormSaga() {
  yield takeLatest(actionTypes.SAVE_BRIDGEFORM_ELEMENT, saveBridgeFormElement);
}
