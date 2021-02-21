
import produce from 'immer';
import * as actionTypes from './constants'
import { EDIT_BRIDGE } from 'containers/BridgeModul/constants';
import { BRIDGE_UPDATED } from 'containers/App/constants';
export const initialState = {
  selectedTab: null,
  isUpdating: false
};

/* eslint-disable default-case, no-param-reassign */
const infoTabReducer = (state = initialState, action) =>

  produce(state, draft => {

    switch (action.type) {

      case actionTypes.SET_SELECTED_TAB: 
        // console.log(action)
        draft.selectedTab = action.tab
        break
      case EDIT_BRIDGE: 
      // console.log('EDIT_BRIDGE')
        draft.isUpdating = true
        break
      case BRIDGE_UPDATED: 
      // console.log('BRIDGE_UPDATED')
        draft.isUpdating = false
        break
      default:
        return state
    }
  // }
  });

export default infoTabReducer;

