/*
 * HomeReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import { PROVIDER_ORGANIZATIONS_LOADED, REGISTER_USER_RESPONSE } from '../AppData/constants';
import { LOGIN_FAIL } from '../App/constants';
// import * as actionTypes from './constants';

// The initial state of the App
export const initialState = {

  providerOrganizations: [],
  msg: ''

};

/* eslint-disable default-case, no-param-reassign */
const registrationProceessReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {

      case PROVIDER_ORGANIZATIONS_LOADED:
        // console.log(action.data)
        draft.providerOrganizations = action.data
        break;
      case REGISTER_USER_RESPONSE:
        console.log(action.data)
        draft.msg = action.data.msg
        break;
      case LOGIN_FAIL:
        console.log(action)
        draft.msg = action.data.msg
        break;
    }
  });

export default registrationProceessReducer;
