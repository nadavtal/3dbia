import * as actionTypes from './constants';

/**
 * Changes the input field of the form
 *
 * @param  {string} username The new text of the input field
 *
 * @return {object} An action object with a type of CHANGE_USERNAME
 */

export function sendConfirmation(confirmationType, token) {
    
    return {
      type: actionTypes.SEND_CONFIRMATION,
      confirmationType,
      token,
    };
  };
export function userConfirmed() {
    
    return {
      type: actionTypes.USER_CONFIRMED,
      
    };
  };



