import produce from 'immer';
import { BRIDGE_SELECTED } from 'containers/App/constants';
import { LOAD_SURVEY_DATA, SURVEY_FILES_LOADED, SURVEY_MODELS_LOADED } from 'containers/BridgeModul/constants'
import * as actionTypes from './constants';
export const initialState = {
  mode: '',
  nodes: null,
  zoomElement: null,
  destroy: true,
  notification: 'Building 3d map',
  loading: true,
  // boundingSphere: null,
};
/* eslint-disable default-case, no-param-reassign */
const hasTileSet = models => {
  let hasTile = false;
  for (let index = 0; index < models.length; index++) {
    const model = models[index];
    if (model.type == 'model') {
      hasTile = true;
      break;
    }
  }
  return hasTile;
};
const resiumReducer = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case actionTypes.UPDATE_RESIUM_MODE:
        // console.log(action)
        draft.mode = state.mode === action.data ? '' : action.data;
        break;
      case actionTypes.SET_CESIUM_NOTIFICATION:
        // console.log(action)
        draft.notification = action.notification;
        draft.loading = action.loading;

        break;
      case actionTypes.ZOOM_TO_ELEMENT:
        console.log(action);
        draft.zoomElement = action.objectId;

        break;
      case actionTypes.DESTROY_CESIUM:
        draft.destroy = !state.destroy;
        break;
      case LOAD_SURVEY_DATA:
        draft.notification = 'Loading survey data';
        break;
      case SURVEY_MODELS_LOADED:
        console.log('SURVEY_MODELS_LOADED', action)
        // if (hasTileSet(action.models)) {
        //   draft.notification = 'Building 3d mesh'
        // } else {
        //   draft.notification = 'Ready'
        // }
        draft.notification = 'Loading images'
        // draft.notification = hasTileSet(action.data.models) ? 'Building 3d mesh' : 'Ready';
        break;
      case SURVEY_FILES_LOADED:
        console.log('SURVEY_FILES_LOADED', action)
        draft.notification = 'Ready'
        draft.loading = false
        break;
      case BRIDGE_SELECTED:
        if (!action.bid) {
          draft.node = '';
          draft.nodes = null;
          draft.zoomElement = null;
        }
        break;
        // case(actionTypes.ELEMENT_SELECTED):
        // console.log(state)
        //  const boundingSphere = state.bridgeNodes.filter(node => node.object_id == action.data)[0].boundingSphere
        //   console.log(boundingSphere)

        break;
      // case(actionTypes.ELEMENTS_SELECTED):
      // console.log('ELEMENTS_SELECTED')
        // return {
        //   ...state,
        //   selectNodesMode: true
        // }

      default:
        return { ...state };
    }
    // }
  });

export default resiumReducer;
