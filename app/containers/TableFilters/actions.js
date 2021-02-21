import * as actionTypes from './constants';


/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function onHandleResults(data) {
  // console.log('user')
  return {
    type: actionTypes.HANDLE_RESULTS,
    data,
  };
}




