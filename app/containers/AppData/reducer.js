
import produce from 'immer';
import * as actionTypes from './constants';

// The initial state of the App
// import { initialState } from 'containers/App/reducer'
export const initialState = {

};
/* eslint-disable default-case, no-param-reassign */
const appDataReducer = (state = initialState, action) =>
  produce(state, draft => {
    // console.log(state)
    switch (action.type) {

      default:
        return {...state}
    }
  // }
  });

export default appDataReducer;
