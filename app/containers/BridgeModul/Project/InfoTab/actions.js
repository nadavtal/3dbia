import * as actionTypes from './constants'
export function setSelectedTab(tab) {

    return {
      type: actionTypes.SET_SELECTED_TAB,
      tab
    };
  }