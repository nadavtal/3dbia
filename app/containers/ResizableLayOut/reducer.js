
import produce from 'immer';
import { SHOW_IN_VIEW } from 'containers/BridgeModul/constants'
import * as actionTypes  from './constants';
export const INITIAL_WIDTH = '25%'
export const WIDE_WIDTH = '74%'
export const FULL_WIDTH = '100%'
export const initialState = {
  leftViewSize: {
    width: INITIAL_WIDTH,
    height: '89vh'
  },
  rightViewSize: {
    width: WIDE_WIDTH,
    height: '89vh'
  },
  bottomViewSize: {
    height: 250,
    width: WIDE_WIDTH,
  },
  
};

/* eslint-disable default-case, no-param-reassign */
const resizableReducer = (state = initialState, action) =>

  produce(state, draft => {

    switch (action.type) {

      case actionTypes.SET_BOTTOMVIEW_SIZE: 
        draft.bottomViewSize.height = action.height
        break
      default:
        return state
    }
  // }
  });

export default resizableReducer;
