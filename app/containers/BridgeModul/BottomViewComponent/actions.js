import * as actionTypes from './constants'

export function saveBridgeFormElement(element, bid) {

  return {
    type: actionTypes.SAVE_BRIDGEFORM_ELEMENT,
    element,
    bid
  };
}