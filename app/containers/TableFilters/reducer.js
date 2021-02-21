/*
 * HomeReducer
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
  // showFilter: true,
  displayedData: [],
  table: {}
};

/* eslint-disable default-case, no-param-reassign */
const TableFiltersReducer = (state = initialState, action) =>


  produce(state, draft => {

    switch (action.type) {

      case actionTypes.HANDLE_RESULTS:
        console.log('HANDLE_RESULTS', action)
        draft.displayedData = action.data
        break;



      default:
        return {...state}
    }
  // }
  });

export default TableFiltersReducer;
