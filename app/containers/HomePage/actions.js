import * as actionTypes from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */
export function changeUsername(username) {
  return {
    type: actionTypes.CHANGE_USERNAME,
    username,
  };
};


export function changeFormMode(mode) {
  console.log(mode)
  return {
    type: actionTypes.CHANGE_FORM_MODE,
    mode,
  };
}
