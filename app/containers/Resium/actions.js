import * as actionTypes  from './constants';



export function updateResiumMode(data) {
  
  return {
    type: actionTypes.UPDATE_RESIUM_MODE,
    data: data
  };
}

export function elementSelected(data, selectSingle) {
  // console.log(data)
  
  return {
    type: actionTypes.ELEMENT_SELECTED,
    data,
    selectSingle
  };
}
export function elementsSelected(data, selectSingle) {
  console.log(data, selectSingle)
  return {
    type: actionTypes.ELEMENTS_SELECTED,
    data,
    selectSingle
  };
}
export function receiveAction(actionType, data) {
  console.log(actionType, data)
  switch (actionType) {
    case 'selectModel':
      return {
        type: actionTypes.MODEL_SELECTED,
        data,
    
      };
      break;
  
    default:
      break;
  }

}

export function onRightMenuOptionClick(action, data) {
  // console.log(data)
  return {
    type: actionTypes.ON_RIGHT_MENU_OPTION_CLICK,
    action,
    data
  };
}
export function modelLoaded(nodes, model) {
  
  return {
    type: actionTypes.MODEL_LOADED,
    nodes,
    model
  };
}
export function zoomToElement(objectId) {
  
  return {
    type: actionTypes.ZOOM_TO_ELEMENT,
    objectId
  };
}
export function destroyCesium() {
  
  return {
    type: actionTypes.DESTROY_CESIUM,
  };
}
export function setCesiumNotification(notification, loading) {
  
  return {
    type: actionTypes.SET_CESIUM_NOTIFICATION,
    notification,
    loading
  };
}



