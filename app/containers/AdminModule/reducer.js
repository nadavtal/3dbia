
import produce from 'immer';
import * as actionTypes from './constants';
import { ORGANIZATION_ADDED } from '../App/constants'


export const initialState = {

};

/* eslint-disable default-case, no-param-reassign */
const adminReducer = (state = initialState, action) =>


  produce(state, draft => {

    switch (action.type) {

      // case actionTypes.ADD_ORGANIZATION:
      //   // console.log('ADD_ORGANIZATION', action.data)
      //   // draft.bridges = action.data.bridges;
        
      //   break;
      // case ORGANIZATION_ADDED:
      //   console.log('ORGANIZATION_ADDED', action)
        
        
      //   break;

      default:
        return state
    }
  // }
  });

export default adminReducer;
