import { call, put, select, takeLatest } from 'redux-saga/effects';
import * as actionTypes from './constants';
import * as actions from './actions';
import request from 'utils/request';
import { loadError } from 'containers/App/actions';
import { showNotification, toggleModal } from 'containers/App/actions'
import { apiUrl } from 'containers/App/constants';

function* getTable(action) {
  console.log(action)

  try {

    const tableData = yield call(request, apiUrl + 'database/' + action.tableName + '/' + action.orgId);
    console.log(tableData)
    yield put(actions.tableLoaded(tableData));

  } catch (err) {
    console.log('ERRORRRRRRRR', err)
    yield put(loadError(err));
  }
}

function* saveField(action) {
  console.log(action)
  
  try {
    const url = apiUrl + 'database/' + action.tableName
    const args = {      
      method: 'PUT',
      body: JSON.stringify({id: action.id, key: action.key, value: action.value})
    }
    const result = yield call(request, url, args);
    console.log(result)
    // yield put(actions.projectLoaded(project[0]));
  } catch (err) {
    yield put(console.log(err));
  }

}
function* addRow(action) {
  console.log(action)
  
  try {
    const url = apiUrl + 'database/' + action.tableName + '/' + action.orgId
    const args = {      
      method: 'POST',
      body: JSON.stringify({key: action.key, value: action.value})
    }
    const result = yield call(request, url, args);
    console.log(result)
    yield put(actions.rowAdded(result.insertId, action.orgId));
  } catch (err) {
    yield put(console.log(err));
  }

}
function* deleteRows(action) {
  console.log(action)
  
  try {
    const url = apiUrl + 'delete/database/' + action.tableName
    const args = {
      method: 'POST',
      body: JSON.stringify({ids: action.ids}),
    };
    const result = yield call(request, url, args);
    console.log(result)
    yield put(actions.rowsDeleted(action.ids));
  } catch (err) {
    yield put(console.log(err));
  }

}

export default function* providerSaga() {

  // By using `takeLatest` only the result of the latest API call is applied.
  // It returns task descriptor (just like fork) so we can continue execution
  // It will be cancelled automatically on component unmount
  yield takeLatest(actionTypes.GET_TABLE, getTable);
  yield takeLatest(actionTypes.SAVE_FIELD, saveField);
  yield takeLatest(actionTypes.ADD_ROW, addRow);
  yield takeLatest(actionTypes.DELETE_ROWS, deleteRows);

}
