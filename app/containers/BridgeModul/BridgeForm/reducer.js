
import produce from 'immer';
import { SET_SELECTED_TAB } from '../Project/InfoTab/constants'

export const initialState = {

  updatading: false
};

/* eslint-disable default-case, no-param-reassign */
const bridgeFormReducer = (state = initialState, action) =>

  produce(state, draft => {

    switch (action.type) {


      default:
        break
    }
  // }
  });

export default bridgeFormReducer;
