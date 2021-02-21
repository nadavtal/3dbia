
import * as actionTypes from './constants';
import { browserHistory } from 'react-router'
import { useDispatch } from 'react-redux'
/**
 * Load the repositories, this action starts the request saga
 *
 * @return {object} An action object with a type of LOAD_REPOS
 */
export function authStart() {
  
  return {
    type: actionTypes.AUTH_START,
    
  };
}
export function authSuccess(data) {
  
  return {
    type: actionTypes.AUTH_SUCCESS,
    data
  };
}
export function authFail(error) {
  
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
}
export function auth(data) {
  console.log(data)
  return authStart();
}