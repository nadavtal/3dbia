/*
 * UserReducer
 *
 * The reducer takes care of our data. Using actions, we can
 * update our application state. To add a new action,
 * add it to the switch statement in the reducer function
 *
 */

import produce from 'immer';
import * as actionTypes from './constants';

// The initial state of the App
export const initialState = {

  user: {},

};

/* eslint-disable default-case, no-param-reassign */
const userReducer = (state = initialState, action) =>
  produce(state, draft => {

    switch (action.type) {

      case actionTypes.GET_USER:

        console.log('GET_USER')
        break;
      default:
      return draft
    }
  });

export default userReducer;
