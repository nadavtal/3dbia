import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import * as actions from './actions';
import request from 'utils/request';
import { showNotification, toggleModal, loadError, allDataLoaded, organizationAdded, providerAdded,
  newRoleCreated, organizationUpdated, providerUpdated, userAllocated, newRoleTypeCreated,
  providerAllocated } from 'containers/App/actions';
import { findEntityBy } from 'containers/AppData/actions'
import { getModalOpen } from '../App/selectors';
import { apiUrl } from '../App/constants';




export default function* adminSaga() {

  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount




}
