import * as actionTypes from './constants'

export function setSelectedTab(selectedTab) {

  return {
    type: actionTypes.SET_SELECTED_TAB,
    selectedTab
  };
}