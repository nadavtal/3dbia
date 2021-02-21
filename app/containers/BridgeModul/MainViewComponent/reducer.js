
import produce from 'immer';
import { SHOW_IN_VIEW, NEW_MODEL_CREATED } from '../constants'

export const initialState = {
  componentName: 'Resium'
};

/* eslint-disable default-case, no-param-reassign */
const mainViewReducer = (state = initialState, action) =>

  produce(state, draft => {

    switch (action.type) {
      case SHOW_IN_VIEW:
        // console.log(action)
        if (action.view == 'main' && draft.componentName !== action.componentName) draft.componentName = action.componentName
        break
      case NEW_MODEL_CREATED:
        // console.log(action)
        draft.componentName = 'Resium'
        break
      default:
        return draft
    }
  // }
  });

export default mainViewReducer;
