
import produce from 'immer';
import * as actionTypes from './constants'

export const initialState = {
  selectedTab: null,
  focusedElement: null

};

/* eslint-disable default-case, no-param-reassign */
const spansTab = (state = initialState, action) =>

  produce(state, draft => {

    switch (action.type) {

      case actionTypes.SET_SELECTED_TAB: 

        draft.selectedTab = action.tab
        break
      case actionTypes.FOCUS_ELEMENT: 
   
        draft.focusedElement = action.element
        break
      default:
        return state
    }
  // }
  });

export default spansTab;

