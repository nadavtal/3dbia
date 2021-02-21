
import produce from 'immer';
import * as actionTypes from './constants'

// The initial state of the App
export const initialState = {
  selectedUsers: []
};

/* eslint-disable default-case, no-param-reassign */
const userManagementModule = (state = initialState, action) =>
  produce(state, draft => {
    // console.log(state)
    switch (action.type) {
      case actionTypes.SET_SELECTED_USERS:
        draft.selectedUsers = action.data;
      break;
      default: return state


    }
  });

export default userManagementModule;
