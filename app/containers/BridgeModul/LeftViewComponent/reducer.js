
import produce from 'immer';
import * as actionTypes from './constants'
import { SHOW_IN_VIEW } from '../constants'
export const initialState = {
  componentName: 'calibration',
  selectedTab: 'Info'
};

/* eslint-disable default-case, no-param-reassign */
const leftViewReducer = (state = initialState, action) =>

  produce(state, draft => {

    switch (action.type) {
      case SHOW_IN_VIEW:
        // console.log(action)
        if (action.view == 'leftView' && draft.componentName !== action.componentName) draft.componentName = action.componentName
        break
      case actionTypes.SET_SELECTED_TAB: 
        draft.selectedTab = action.selectedTab;
        break
      default:
        return state
    }
  // }
  });

export default leftViewReducer;
