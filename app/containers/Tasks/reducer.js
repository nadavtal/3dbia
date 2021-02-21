
import produce from 'immer';
import * as actionTypes from './constants';
import { addProviderToRoles, getRoleById } from 'utils/dataUtils';
import {UPDATE_TASKS} from 'containers/AppData/constants';
import {TASKS_UPDATED} from 'containers/App/constants';
export const initialState = {
  bridgeIds: [],
  currentTaskOrder: null
};

/* eslint-disable default-case, no-param-reassign */
const tasksReducer = (state = initialState, action) =>


  produce(state, draft => {

    switch (action.type) {

      case UPDATE_TASKS:
        console.log(action) 
        draft.bridgeIds = action.data.bridgeIds;       
        // draft.currentTaskOrder = action.data.currentTaskOrder;  
        break     
      case TASKS_UPDATED:
        console.log(action) 
        draft.currentTaskOrder = action.data.currentTaskOrder
        break
      default:
        return state
    }
  // }
  });

export default tasksReducer;
