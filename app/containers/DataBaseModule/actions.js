import * as actionTypes  from './constants';



/**
 * Changes the input field of the form
 *
 * @param  {string} projectId the ID of the project
 *
 * @return {object} An action object with a type of UPLOAD_PROJECT
 */
export function getTable(tableName, orgId) {
  // console.log('Provider')
  return {
    type: actionTypes.GET_TABLE,
    tableName,
    orgId
  };
}

export function tableLoaded(data) {
 
  return {
    type: actionTypes.TABLE_LOADED,
    data,
  };
}
export function addRow(tableName, orgId, key, value) {
 
  return {
    type: actionTypes.ADD_ROW,
    tableName,
    orgId,
    key, 
    value
  };
}
export function deletsRows(tableName, ids) {
 
  return {
    type: actionTypes.DELETE_ROWS,
    tableName,
    ids
  };
}
export function rowsDeleted(ids) {
 
  return {
    type: actionTypes.ROWS_DELETED,
    ids
  };
}
export function rowAdded(newId, orgId) {
 
  return {
    type: actionTypes.ROW_ADDED,
    newId,
    orgId
  };
}
export function saveField(tableName, id, key, value) {
 
  return {
    type: actionTypes.SAVE_FIELD,
    tableName,
    id,
    key,
    value
  };
}