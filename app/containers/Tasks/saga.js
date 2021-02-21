import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import * as actions from './actions';
import request from 'utils/request';
import { loadError } from 'containers/App/actions';
import { showNotification, toggleModal } from 'containers/App/actions'
import { apiUrl } from 'containers/App/constants';



export default function* providerSaga() {

  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount


}
