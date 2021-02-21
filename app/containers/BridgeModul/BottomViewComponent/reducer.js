
import produce from 'immer';
import { SHOW_IN_VIEW } from '../constants'

export const initialState = {
  componentName: 'projectData',
  showBottomView: false
};

/* eslint-disable default-case, no-param-reassign */
const bottomViewReducer = (state = initialState, action) =>

  produce(state, draft => {

    switch (action.type) {
      case SHOW_IN_VIEW:
        // console.log(action)
        if (action.view == 'bottomView') {          
          draft.componentName = action.componentName
          if (!action.componentName) draft.showBottomView = false
          else draft.showBottomView = true
        } 
        break
      default:
        return draft
    }
  // }
  });

export default bottomViewReducer;
