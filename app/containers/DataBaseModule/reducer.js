
import produce from 'immer';
import * as actionTypes from './constants';

export const initialState = {
  data: null,
  
};

/* eslint-disable default-case, no-param-reassign */
const dataBaseModuleReducer = (state = initialState, action) =>

  produce(state, draft => {

    switch (action.type) {
      case actionTypes.GET_TABLE:
        // console.log(action) 
        draft.data = null;       
      // draft.currentTaskOrder = action.data.currentTaskOrder;  
        break  
      case actionTypes.TABLE_LOADED:
        // console.log(action) 
        draft.data = action.data;       
      // draft.currentTaskOrder = action.data.currentTaskOrder;  
        break 
      // case actionTypes.ADD_ROW:
      //   console.log(action) 
      //   draft.data = null;       
      // // draft.currentTaskOrder = action.data.currentTaskOrder;  
      //  break 
      case actionTypes.ROW_ADDED:
        // console.log(action) 
        let udpatedData = [...state.data] 
        let newItem = {...state.data[0]}
        Object.keys(newItem).forEach(key => {
          newItem[key] = ''
        })  
        newItem.id = action.newId   
        newItem.organization_id = action.orgId   
        udpatedData.push(newItem)
        draft.data = udpatedData
        // draft.currentTaskOrder = action.data.currentTaskOrder;  
        break  
      case actionTypes.ROWS_DELETED:
        draft.data = state.data.filter(item => !action.ids.includes(item.id))
        break
      default:
        return state;
    }
  // }
  });

export default dataBaseModuleReducer;
