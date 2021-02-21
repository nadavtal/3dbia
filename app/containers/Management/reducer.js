
import produce from 'immer';
import { CREATE_MESSAGE } from './constants';

// The initial state of the App
export const initialState = {
  conponentName:'Roles'
};

/* eslint-disable default-case, no-param-reassign */
const messagesReducer = (state = initialState, action) =>
  produce(state, draft => {
    // console.log(state)
    switch (action.type) {
      case SET_COMPONENT:
        draft.conponentName = action.conponentName;
      break;
      default: return state


    }
  });

export default messagesReducer;
