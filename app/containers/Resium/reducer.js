
import produce from 'immer';
import * as actionTypes from './constants';
import { BRIDGE_SELECTED } from 'containers/App/constants'
export const initialState = {
         mode: '',
         nodes: null,
         zoomElement: null,
         destroy: true
         // boundingSphere: null,
       };
/* eslint-disable default-case, no-param-reassign */
const resiumReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case(actionTypes.UPDATE_RESIUM_MODE):
        // console.log(action)
        draft.mode = state.mode === action.data ? '' : action.data;
        break
      case(actionTypes.ZOOM_TO_ELEMENT):
        console.log(action)
        draft.zoomElement = action.objectId;
        break
      case(actionTypes.DESTROY_CESIUM):
        
        draft.destroy = !state.destroy;
        break
      case(BRIDGE_SELECTED):
       
        if (!action.bid) {
          draft.node = ''
          draft.nodes = null
          draft.zoomElement = null
        }
        break
      // case(actionTypes.ELEMENT_SELECTED):
      // console.log(state)
      //  const boundingSphere = state.bridgeNodes.filter(node => node.object_id == action.data)[0].boundingSphere
      //   console.log(boundingSphere)


        break
      // case(actionTypes.ELEMENTS_SELECTED):
      // console.log('ELEMENTS_SELECTED')
        // return {
        //   ...state,
        //   selectNodesMode: true
        // }

      default:
        return {...state}
    }
  // }
  });

export default resiumReducer;
