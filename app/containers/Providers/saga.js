import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import request from 'utils/request';
import { loadError, providersLoaded } from 'containers/App/actions';
import { providerLoaded } from './actions'
import { apiUrl } from '../App/constants';




export default function* providersSaga() {

  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount


}
